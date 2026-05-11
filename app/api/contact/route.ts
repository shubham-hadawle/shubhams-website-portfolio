import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type Payload = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  website?: string; // honeypot
};

const MAX_LENGTHS = {
  name: 120,
  email: 200,
  subject: 200,
  message: 5000,
};

function isString(v: unknown, max: number): v is string {
  return typeof v === "string" && v.length > 0 && v.length <= max;
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const recentSubmissions = new Map<string, number>();
const RATE_LIMIT_MS = 30_000;

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot — silently succeed for bots so they think they got through.
  if (body.website && body.website.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  if (
    !isString(body.name, MAX_LENGTHS.name) ||
    !isString(body.email, MAX_LENGTHS.email) ||
    !isString(body.message, MAX_LENGTHS.message)
  ) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  const now = Date.now();
  const last = recentSubmissions.get(ip);
  if (last && now - last < RATE_LIMIT_MS) {
    return NextResponse.json(
      { error: "Please wait a moment before sending another message." },
      { status: 429 }
    );
  }
  recentSubmissions.set(ip, now);

  const TO = process.env.CONTACT_TO_EMAIL ?? "rockercandy14@gmail.com";
  const HOST = process.env.SMTP_HOST;
  const PORT = Number(process.env.SMTP_PORT ?? 587);
  const USER = process.env.SMTP_USER;
  const PASS = process.env.SMTP_PASSWORD;

  if (!HOST || !USER || !PASS) {
    console.warn(
      "[contact] SMTP not configured. Set SMTP_HOST / SMTP_USER / SMTP_PASSWORD in your environment."
    );
    return NextResponse.json(
      {
        error:
          "Email service not configured. Set SMTP_* env vars (see .env.example).",
      },
      { status: 503 }
    );
  }

  const transporter = nodemailer.createTransport({
    host: HOST,
    port: PORT,
    secure: PORT === 465,
    auth: { user: USER, pass: PASS },
  });

  const subject = isString(body.subject, MAX_LENGTHS.subject)
    ? body.subject
    : "New portfolio contact";

  const safe = {
    name: escapeHtml(body.name),
    email: escapeHtml(body.email),
    subject: escapeHtml(subject),
    message: escapeHtml(body.message).replace(/\n/g, "<br/>"),
  };

  const html = `
    <!doctype html>
    <html>
      <body style="font-family: ui-sans-serif, system-ui, sans-serif; background:#0a0a0c; color:#e6e6e6; padding:24px;">
        <div style="max-width:560px; margin:auto; background:#111114; border:1px solid #222; border-radius:14px; padding:24px;">
          <p style="font-family: ui-monospace, SFMono-Regular, monospace; font-size:11px; letter-spacing:0.16em; text-transform:uppercase; color:#888; margin:0 0 8px;">
            New message · shubham-hadawle.dev
          </p>
          <h1 style="font-size:18px; margin:0 0 16px;">${safe.subject}</h1>
          <p style="margin:0 0 4px; color:#bbb;"><strong style="color:#fff;">From:</strong> ${safe.name} &lt;${safe.email}&gt;</p>
          <hr style="border:none; border-top:1px solid #222; margin:16px 0;" />
          <div style="line-height:1.6; color:#ddd;">${safe.message}</div>
        </div>
      </body>
    </html>`;

  const text = `New message from ${body.name} <${body.email}>\n\nSubject: ${subject}\n\n${body.message}`;

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${USER}>`,
      to: TO,
      replyTo: body.email,
      subject: `[Portfolio] ${subject}`,
      text,
      html,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] send failed", err);
    return NextResponse.json(
      { error: "Failed to send. Please email me directly." },
      { status: 500 }
    );
  }
}
