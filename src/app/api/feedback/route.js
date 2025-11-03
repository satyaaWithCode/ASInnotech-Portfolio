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






// // app/api/feedback/route.js
// import { NextResponse } from "next/server";
// import { MongoClient } from "mongodb";
// import sgMail from "@sendgrid/mail";

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

// // initialize SendGrid
// if (process.env.SENDGRID_API_KEY) {
//   sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// }

// export async function POST(req) {
//   try {
//     const body = await req.json();
//     const { name, email, rating, message } = body;

//     if (!message && (rating === undefined || rating === null)) {
//       return NextResponse.json(
//         { ok: false, error: "Please provide feedback message or rating." },
//         { status: 400 }
//       );
//     }

//     const client = await getClient();
//     const db = client.db(MONGO_DB);

//     const doc = {
//       name: name || "Anonymous",
//       email: email || null,
//       rating: rating !== undefined && rating !== null ? Number(rating) : null,
//       message: message || "",
//       createdAt: new Date(),
//       status: "new",
//     };

//     await db.collection("feedbacks").insertOne(doc);

//     // only send if SendGrid configured and OFFICE_EMAIL present
//     if (!process.env.SENDGRID_API_KEY || !process.env.OFFICE_EMAIL) {
//       console.warn("SendGrid or OFFICE_EMAIL not configured; skipping email send.");
//       return NextResponse.json({ ok: true, note: "Saved, email skipped" });
//     }

//     const html = `
//       <div style="font-family:system-ui,Segoe UI,Roboto,Helvetica,Arial;color:#0b2230;">
//         <h3>New Feedback Received</h3>
//         <p><strong>Name:</strong> ${doc.name}</p>
//         <p><strong>Email:</strong> ${doc.email || "—"}</p>
//         <p><strong>Rating:</strong> ${doc.rating || "—"}</p>
//         <p><strong>Message:</strong></p>
//         <div style="padding:8px;border-left:3px solid #0fb6d2;background:#f7fafc">
//           ${(doc.message || "").replace(/\n/g, "<br/>")}
//         </div>
//         <p style="color:#6b7280;font-size:12px;margin-top:8px;">Received: ${doc.createdAt.toISOString()}</p>
//       </div>
//     `;

//     const msg = {
//       to: process.env.OFFICE_EMAIL,
//       from: {
//         email: process.env.SENDGRID_FROM || process.env.SMTP_USER,
//         name: process.env.FROM_NAME || "AS Innotech",
//       },
//       replyTo: doc.email || undefined,
//       subject: `New Feedback — ${doc.name}`,
//       text: `${doc.name} (${doc.email || "no-email"}) rated ${doc.rating}\n\n${doc.message}`,
//       html,
//     };

//     try {
//       await sgMail.send(msg);
//     } catch (sendErr) {
//       console.error("SendGrid feedback send error:", sendErr?.response?.body || sendErr);
//       // Return success for DB save but include warning — you can change to error if desired.
//       return NextResponse.json({ ok: true, warning: "Saved but email failed" });
//     }

//     return NextResponse.json({ ok: true });
//   } catch (err) {
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

// initialize SendGrid
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

    const doc = {
      name: name || "Anonymous",
      email: email || null,
      rating: rating !== undefined && rating !== null ? Number(rating) : null,
      message: message || "",
      createdAt: new Date(),
      status: "new",
    };

    await db.collection("feedbacks").insertOne(doc);

    // only send if SendGrid configured and OFFICE_EMAIL present
    if (!process.env.SENDGRID_API_KEY || !process.env.OFFICE_EMAIL) {
      console.warn("SendGrid or OFFICE_EMAIL not configured; skipping email send.");
      return NextResponse.json({ ok: true, note: "Saved, email skipped" });
    }

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

    const msg = {
      to: process.env.OFFICE_EMAIL,
      from: {
        email: process.env.SENDGRID_FROM || process.env.SMTP_USER,
        name: process.env.FROM_NAME || "AS Innotech",
      },
      replyTo: doc.email || undefined,
      subject: `New Feedback — ${doc.name}`,
      text: `${doc.name} (${doc.email || "no-email"}) rated ${doc.rating}\n\n${doc.message}`,
      html,
    };

    try {
      await sgMail.send(msg);
    } catch (sendErr) {
      console.error("SendGrid feedback send error:", sendErr?.response?.body || sendErr);
      // Return success for DB save but include warning
      return NextResponse.json({ ok: true, warning: "Saved but email failed" });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Feedback API error:", err);
    const message = err?.message || "Server error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

// small utility to escape user content for HTML
function escapeHtml(str) {
  if (!str && str !== 0) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
