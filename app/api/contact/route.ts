import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const resend = new Resend(process.env.RESEND_API_KEY);
const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || "goldstarplumbingvancouver@gmail.com";
const CONTACT_FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "no-reply@goldstarplumbing.com";

export async function POST(req: NextRequest) {
  try {
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

    // Honeypot antispam
    if (website && String(website).trim() !== "") {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    if (!name || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const subject = `🔧 Nuevo mensaje de contacto - ${name}`;
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

    // Timestamp e ID
    const timestamp = new Date().toLocaleString("es-ES", {
      timeZone: "America/Vancouver",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const trackingId = Date.now();

    const html = `
      <div style="font-family: system-ui, ...">
        <!-- el mismo HTML que usabas arriba, usa escapeHtml donde corresponda -->
        <!-- ... -->
      </div>
    `;

    // ENVÍO CON RESEND
    const { error } = await resend.emails.send({
      from: `Goldstar Plumbing <onboarding@resend.dev>`, // Mejor personalizar con tu dominio propio si lo verificas
      to: [CONTACT_TO_EMAIL],
      subject,
      replyTo: email, // Para que al responder se contacte al cliente
      text,
      html,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("/api/contact error", err);
    return NextResponse.json({ error: "Unexpected server error" }, { status: 500 });
  }
}

// Escapador de HTML de tu ejemplo
function escapeHtml(input: string) {
  return String(input)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "'");
}
