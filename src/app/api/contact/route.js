// app/api/contact/route.js
import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import nodemailer from "nodemailer";

const MONGO_URI = process.env.MONGODB_URI;
const MONGO_DB = process.env.MONGODB_DB || "as_innotech_db";

let cachedClient = null;
async function getClient() {
  if (cachedClient) return cachedClient;
  const client = new MongoClient(MONGO_URI, { maxPoolSize: 10 });
  await client.connect();
  cachedClient = client;
  return client;
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!email || !message) {
      return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
    }

    // save to DB
    const client = await getClient();
    const db = client.db(MONGO_DB);
    const doc = {
      name: name || "Guest",
      email,
      message,
      createdAt: new Date(),
      status: "new",
    };
    await db.collection("contacts").insertOne(doc);

    // send notification email
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 465),
      secure: Number(process.env.SMTP_PORT || 465) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const html = `
      <div style="font-family:system-ui,Segoe UI,Roboto,Helvetica,Arial; color:#0b2230">
        <h3>New website contact</h3>
        <p><strong>Name:</strong> ${doc.name}</p>
        <p><strong>Email:</strong> ${doc.email}</p>
        <p><strong>Message:</strong></p>
        <div style="padding:8px;border-left:3px solid #0fb6d2;background:#f7fafcff">
          ${doc.message.replace(/\n/g, "<br/>")}
        </div>
        <p style="color:#6b7280;font-size:12px;margin-top:8px;">Received: ${doc.createdAt.toISOString()}</p>
      </div>
    `;

    await transporter.sendMail({
      from: `"${process.env.FROM_NAME || "AS Innotech"}" <${process.env.SMTP_USER}>`,
      to: process.env.OFFICE_EMAIL,
      subject: `Website contact — ${doc.name}`,
      html,
      text: `${doc.name} <${doc.email}> wrote:\n\n${doc.message}`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
