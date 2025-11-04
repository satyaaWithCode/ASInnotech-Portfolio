// // app/api/contact/route.js
// import { NextResponse } from "next/server";
// import { MongoClient } from "mongodb";
// import nodemailer from "nodemailer";

// const MONGO_URI = process.env.MONGODB_URI;
// const MONGO_DB = process.env.MONGODB_DB || "as_innotech_db";

// let cachedClient = null;
// async function getClient() {
//   if (cachedClient) return cachedClient;
//   const client = new MongoClient(MONGO_URI, { maxPoolSize: 10 });
//   await client.connect();
//   cachedClient = client;
//   return client;
// }

// export async function POST(req) {
//   try {
//     const body = await req.json();
//     const { name, email, message } = body;

//     if (!email || !message) {
//       return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
//     }

//     // save to DB
//     const client = await getClient();
//     const db = client.db(MONGO_DB);
//     const doc = {
//       name: name || "Guest",
//       email,
//       message,
//       createdAt: new Date(),
//       status: "new",
//     };
//     await db.collection("contacts").insertOne(doc);

//     // send notification email
//     const transporter = nodemailer.createTransport({
//       host: process.env.SMTP_HOST,
//       port: Number(process.env.SMTP_PORT || 465),
//       secure: Number(process.env.SMTP_PORT || 465) === 465,
//       auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASS,
//       },
//     });

//     const html = `
//       <div style="font-family:system-ui,Segoe UI,Roboto,Helvetica,Arial; color:#0b2230">
//         <h3>New website contact</h3>
//         <p><strong>Name:</strong> ${doc.name}</p>
//         <p><strong>Email:</strong> ${doc.email}</p>
//         <p><strong>Message:</strong></p>
//         <div style="padding:8px;border-left:3px solid #0fb6d2;background:#f7fafcff">
//           ${doc.message.replace(/\n/g, "<br/>")}
//         </div>
//         <p style="color:#6b7280;font-size:12px;margin-top:8px;">Received: ${doc.createdAt.toISOString()}</p>
//       </div>
//     `;

//     await transporter.sendMail({
//       from: `"${process.env.FROM_NAME || "AS Innotech"}" <${process.env.SMTP_USER}>`,
//       to: process.env.OFFICE_EMAIL,
//       subject: `Website contact — ${doc.name}`,
//       html,
//       text: `${doc.name} <${doc.email}> wrote:\n\n${doc.message}`,
//     });

//     return NextResponse.json({ ok: true });
//   } catch (err) {
//     console.error("Contact API error:", err);
//     return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
//   }
// }





// app/api/contact/route.js
import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import sgMail from "@sendgrid/mail";

const MONGO_URI = process.env.MONGODB_URI;
const MONGO_DB = process.env.MONGODB_DB || "as_innotech_db";

let cachedClient = null;
async function getClient() {
  if (cachedClient) return cachedClient;
  if (!MONGO_URI) throw new Error("MONGO_URI is not defined");
  const client = new MongoClient(MONGO_URI, { maxPoolSize: 10 });
  await client.connect();
  cachedClient = client;
  return client;
}

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, phone, message } = body;

    if (!email || !message) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const client = await getClient();
    const db = client.db(MONGO_DB);

    // create document and store in DB
    const doc = {
      name: name || "Guest",
      email,
      phone: phone || null,
      message,
      message_preview: String(message || "").replace(/\s+/g, " ").trim().slice(0, 120),
      createdAt: new Date(),
      status: "new",
      sentStatus: "pending",
      sg_message_id: null,
    };

    const insertRes = await db.collection("contacts").insertOne(doc);
    const insertedId = insertRes.insertedId;
    doc._id = insertedId;

    // plain & html bodies
    const plain = `${doc.name} <${doc.email}>${doc.phone ? " | phone: " + doc.phone : ""} wrote:\n\n${doc.message}\n\nReceived: ${doc.createdAt.toISOString()}`;

    const html = `<!doctype html>
<html>
  <body style="font-family: Arial, Helvetica, sans-serif; color: #0b2230; background: #ffffff; margin:0; padding:16px;">
    <table role="presentation" width="100%" style="max-width:600px; margin:0 auto; border-collapse:collapse;">
      <tr>
        <td style="padding:8px 0;">
          <h2 style="margin:0 0 8px 0; font-size:20px;">New website contact</h2>
          <p style="margin:0 0 6px;"><strong>Name:</strong> ${escapeHtml(doc.name)}</p>
          <p style="margin:0 0 6px;"><strong>Email:</strong> ${escapeHtml(doc.email)}</p>
          ${doc.phone ? `<p style="margin:0 0 6px;"><strong>Phone:</strong> ${escapeHtml(doc.phone)}</p>` : ""}
          <p style="margin:8px 0 6px;"><strong>Message:</strong></p>
          <div style="padding:12px; border-left:3px solid #0fb6d2; background:#f7fafc; color:#0b2230;">
            ${escapeHtml(doc.message).replace(/\n/g, "<br/>")}
          </div>
          <p style="color:#6b7280; font-size:12px; margin-top:12px;">Received: ${doc.createdAt.toISOString()}</p>
        </td>
      </tr>
    </table>
  </body>
</html>`;

    if (!process.env.SENDGRID_API_KEY) {
      console.error("SENDGRID_API_KEY is not configured.");
      await db.collection("contacts").updateOne(
        { _id: insertedId },
        { $set: { sentStatus: "skipped", sentAt: new Date() } }
      );
      return NextResponse.json(
        { ok: false, error: "Email provider not configured" },
        { status: 500 }
      );
    }

    // subject includes preview so list view shows it
    const safeName = (doc.name || "guest").toString().slice(0, 64);
    const safeEmail = (doc.email || "").toString().slice(0, 128);
    const subject = `Website contact — ${safeName} (${safeEmail})${doc.phone ? " — " + doc.phone : ""} — "${doc.message_preview}"`;

    const msg = {
      to: process.env.OFFICE_EMAIL,
      from: {
        email: process.env.SENDGRID_FROM || process.env.SMTP_USER,
        name: process.env.FROM_NAME || "AS Innotech",
      },
      replyTo: doc.email,
      subject,
      text: plain,
      html,
      custom_args: {
        client_email: doc.email,
        client_name: doc.name,
        client_phone: doc.phone || "",
        contact_id: insertedId.toString(),
        message_preview: doc.message_preview,
        source: "website-contact",
      },
      headers: {
        "X-Client-Email": doc.email,
        "X-Client-Name": doc.name,
        "X-Client-Phone": doc.phone || "",
        "X-Contact-Id": insertedId.toString(),
        "X-Message-Preview": doc.message_preview,
      },
    };

    // send via SendGrid and capture response
    let sgMessageId = null;
    try {
      const res = await sgMail.send(msg);
      console.log("SendGrid send response (raw):", res);
      const arr = Array.isArray(res) ? res : [res];
      const headers = arr[0]?.headers || {};
      sgMessageId =
        headers["x-message-id"] ||
        headers["X-Message-Id"] ||
        headers["x-msg-id"] ||
        null;
      if (!sgMessageId && arr[0]?.body && typeof arr[0].body === "object") {
        sgMessageId = arr[0].body["sg_message_id"] || null;
      }
    } catch (sendErr) {
      console.error("SendGrid send error:", sendErr?.response?.body || sendErr);
      await db.collection("contacts").updateOne(
        { _id: insertedId },
        {
          $set: { sentStatus: "failed", sendError: String(sendErr), updatedAt: new Date() },
        }
      );
      return NextResponse.json(
        { ok: false, error: "Failed to send email" },
        { status: 500 }
      );
    }

    // update DB with send metadata
    await db.collection("contacts").updateOne(
      { _id: insertedId },
      {
        $set: {
          sentStatus: "sent",
          sg_message_id: sgMessageId,
          deliveredAt: new Date(),
          updatedAt: new Date(),
        },
      }
    );

    return NextResponse.json({ ok: true, id: insertedId.toString(), sg_message_id: sgMessageId });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 }
    );
  }
}

function escapeHtml(str) {
  if (!str && str !== 0) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
