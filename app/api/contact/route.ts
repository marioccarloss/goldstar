import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL;
const CONTACT_FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "no-reply@your-domain.com";

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

export async function POST(req: NextRequest) {
  try {
    if (!resend || !CONTACT_TO_EMAIL) {
      return NextResponse.json(
        { error: "Server not configured: missing RESEND_API_KEY or CONTACT_TO_EMAIL" },
        { status: 500 }
      );
    }

    const contentType = req.headers.get("content-type") || "";
    let body: any = {};

    if (contentType.includes("application/json")) {
      body = await req.json();
    } else if (contentType.includes("application/x-www-form-urlencoded")) {
      const form = await req.formData();
      body = Object.fromEntries(form.entries());
    } else {
      try {
        body = await req.json();
      } catch {
        return NextResponse.json({ error: "Unsupported content type" }, { status: 415 });
      }
    }

    const { name = "", email = "", phone = "", message = "", website = "" } = body;

    // Honeypot
    if (website && String(website).trim() !== "") {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    if (!name || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const subject = `New contact message from ${name}`;
    const text = [
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      "",
      "Message:",
      message || "(no message)",
    ]
      .filter(Boolean)
      .join("\n");

    const html = `
      <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; line-height:1.6;">
        <h2 style="margin:0 0 12px 0;">New contact message</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ""}
        <hr style="border:none;border-top:1px solid #eee;margin:16px 0;" />
        <p style="white-space:pre-wrap;">${escapeHtml(message || "(no message)")}</p>
      </div>
    `;

    const { error } = await resend.emails.send({
      from: CONTACT_FROM_EMAIL!,
      to: CONTACT_TO_EMAIL!,
      subject,
      text,
      html,
      reply_to: email,
    } as any);

    if (error) {
      console.error("Resend error", error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("/api/contact error", err);
    return NextResponse.json({ error: "Unexpected server error" }, { status: 500 });
  }
}

function escapeHtml(input: string) {
  return String(input)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
