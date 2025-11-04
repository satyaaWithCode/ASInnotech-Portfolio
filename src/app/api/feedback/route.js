// // app/api/feedback/route.js
// import { NextResponse } from "next/server";
// import { MongoClient } from "mongodb";
// import nodemailer from "nodemailer";

// const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_DB_URL;
// const MONGO_DB = process.env.MONGODB_DB || "as_innotech_db";

// let cachedClient = null;
// async function getClient() {
//   if (cachedClient) return cachedClient;
//   if (!MONGO_URI) throw new Error("MONGO_URI is not defined");
//   const client = new MongoClient(MONGO_URI, { maxPoolSize: 10 });
//   await client.connect();
//   cachedClient = client;
//   return client;
// }

// export async function POST(req) {
//   try {
//     const body = await req.json();
//     const { name, email, rating, message } = body;

//     if (!message && !rating) {
//       return NextResponse.json({ ok: false, error: "Please provide feedback message or rating." }, { status: 400 });
//     }

//     const client = await getClient();
//     const db = client.db(MONGO_DB);

//     const doc = {
//       name: name || "Anonymous",
//       email: email || null,
//       rating: Number(rating) || null,
//       message: message || "",
//       createdAt: new Date(),
//       status: "new",
//     };

//     await db.collection("feedbacks").insertOne(doc);

//     // send notification email to office
//     if (process.env.SMTP_USER && process.env.SMTP_PASS && process.env.OFFICE_EMAIL) {
//       const transporter = nodemailer.createTransport({
//         host: process.env.SMTP_HOST || "smtp.gmail.com",
//         port: Number(process.env.SMTP_PORT || 465),
//         secure: Number(process.env.SMTP_PORT || 465) === 465,
//         auth: {
//           user: process.env.SMTP_USER,
//           pass: process.env.SMTP_PASS,
//         },
//       });

//       const html = `
//         <div style="font-family:system-ui,Segoe UI,Roboto,Helvetica,Arial;color:#0b2230;">
//           <h3>New Feedback Received</h3>
//           <p><strong>Name:</strong> ${doc.name}</p>
//           <p><strong>Email:</strong> ${doc.email || "—"}</p>
//           <p><strong>Rating:</strong> ${doc.rating || "—"}</p>
//           <p><strong>Message:</strong></p>
//           <div style="padding:8px;border-left:3px solid #0fb6d2;background:#f7fafc">
//             ${(doc.message || "").replace(/\n/g, "<br/>")}
//           </div>
//           <p style="color:#6b7280;font-size:12px;margin-top:8px;">Received: ${doc.createdAt.toISOString()}</p>
//         </div>
//       `;

//       await transporter.sendMail({
//         from: `"${process.env.FROM_NAME || "AS Innotech"}" <${process.env.SMTP_USER}>`,
//         to: process.env.OFFICE_EMAIL,
//         subject: `New Feedback — ${doc.name}`,
//         html,
//         text: `${doc.name} (${doc.email || "no-email"}) rated ${doc.rating}\n\n${doc.message}`,
//       });
//     }

//     return NextResponse.json({ ok: true });
//   } catch (err) {
//     // Log server error to terminal for debugging
//     console.error("Feedback API error:", err);
//     const message = err?.message || "Server error";
//     return NextResponse.json({ ok: false, error: message }, { status: 500 });
//   }
// }







// app/api/feedback/route.js
import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import sgMail from "@sendgrid/mail";

const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_DB_URL;
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
    const { name, email, rating, message } = body;

    if (!message && (rating === undefined || rating === null)) {
      return NextResponse.json(
        { ok: false, error: "Please provide feedback message or rating." },
        { status: 400 }
      );
    }

    const client = await getClient();
    const db = client.db(MONGO_DB);

    // create doc first to get an _id to reference
    const doc = {
      name: name || "Anonymous",
      email: email || null,
      rating: rating !== undefined && rating !== null ? Number(rating) : null,
      message: message || "",
      createdAt: new Date(),
      status: "new",
      sentStatus: "pending",
      sg_message_id: null,
    };

    const insertRes = await db.collection("feedbacks").insertOne(doc);
    const insertedId = insertRes.insertedId;
    doc._id = insertedId;

    // preview for subject / headers (trim & sanitize)
    const messagePreview = String(doc.message || "").replace(/\s+/g, " ").trim().slice(0, 120);

    // plain & html bodies
    const plain = `${doc.name} <${doc.email || "no-email"}> rated ${doc.rating}\n\n${doc.message}\n\nReceived: ${doc.createdAt.toISOString()}`;
    const html = `<!doctype html>
<html>
  <body style="font-family: Arial, Helvetica, sans-serif; color: #0b2230; background: #ffffff; margin:0; padding:16px;">
    <table role="presentation" width="100%" style="max-width:600px; margin:0 auto; border-collapse:collapse;">
      <tr>
        <td style="padding:8px 0;">
          <h2 style="margin:0 0 8px 0; font-size:20px;">New Feedback Received</h2>
          <p style="margin:0 0 6px;"><strong>Name:</strong> ${escapeHtml(doc.name)}</p>
          <p style="margin:0 0 6px;"><strong>Email:</strong> ${escapeHtml(doc.email || "—")}</p>
          <p style="margin:0 0 6px;"><strong>Rating:</strong> ${escapeHtml(doc.rating === null ? "—" : doc.rating)}</p>
          <p style="margin:8px 0 6px;"><strong>Message:</strong></p>
          <div style="padding:12px; border-left:3px solid #0fb6d2; background:#f7fafc; color:#0b2230;">
            ${escapeHtml(doc.message || "").replace(/\n/g, "<br/>")}
          </div>
          <p style="color:#6b7280; font-size:12px; margin-top:12px;">Received: ${doc.createdAt.toISOString()}</p>
        </td>
      </tr>
    </table>
  </body>
</html>`;

    // If SendGrid not configured, mark skipped and return success for DB save
    if (!process.env.SENDGRID_API_KEY || !process.env.OFFICE_EMAIL) {
      console.warn("SendGrid or OFFICE_EMAIL not configured; skipping email send.");
      await db.collection("feedbacks").updateOne(
        { _id: insertedId },
        { $set: { sentStatus: "skipped", updatedAt: new Date() } }
      );
      return NextResponse.json({ ok: true, id: insertedId.toString(), note: "Saved, email skipped" });
    }

    // safe subject with preview so list view shows the message
    const safeName = (doc.name || "anon").toString().slice(0, 64);
    const safeEmail = (doc.email || "").toString().slice(0, 128);
    const subject = `New Feedback — ${safeName} (${safeEmail}) — "${messagePreview}"`;

    const msg = {
      to: process.env.OFFICE_EMAIL,
      from: {
        email: process.env.SENDGRID_FROM || process.env.SMTP_USER,
        name: process.env.FROM_NAME || "AS Innotech",
      },
      replyTo: doc.email || undefined,
      subject,
      text: plain,
      html,
      custom_args: {
        client_email: doc.email || "no-email",
        client_name: doc.name,
        feedback_id: insertedId.toString(),
        message_preview: messagePreview,
        source: "website-feedback",
      },
      headers: {
        "X-Client-Email": doc.email || "no-email",
        "X-Client-Name": doc.name || "Anonymous",
        "X-Feedback-Id": insertedId.toString(),
        "X-Message-Preview": messagePreview,
      },
    };

    // send and capture sg response; update DB accordingly
    let sgMessageId = null;
    try {
      const res = await sgMail.send(msg);
      console.log("SendGrid feedback send response (raw):", res);
      const arr = Array.isArray(res) ? res : [res];
      const headers = arr[0]?.headers || {};
      sgMessageId =
        headers["x-message-id"] ||
        headers["X-Message-Id"] ||
        headers["X-Message-Id".toLowerCase()] ||
        null;
      if (!sgMessageId && arr[0]?.body && typeof arr[0].body === "object") {
        sgMessageId = arr[0].body["sg_message_id"] || null;
      }
      // update DB with sent metadata
      await db.collection("feedbacks").updateOne(
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
    } catch (sendErr) {
      console.error("SendGrid feedback send error:", sendErr?.response?.body || sendErr);
      await db.collection("feedbacks").updateOne(
        { _id: insertedId },
        { $set: { sentStatus: "failed", sendError: String(sendErr), updatedAt: new Date() } }
      );
      // still return ok:true because DB save succeeded — but include warning
      return NextResponse.json({ ok: true, id: insertedId.toString(), warning: "Saved but email failed" });
    }

    return NextResponse.json({ ok: true, id: insertedId.toString(), sg_message_id: sgMessageId });
  } catch (err) {
    console.error("Feedback API error:", err);
    const message = err?.message || "Server error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
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
