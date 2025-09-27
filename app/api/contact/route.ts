import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Configuración de Mailjet SMTP
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL;
const CONTACT_FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "no-reply@goldstarplumbing.com";

// Crear el transporter de nodemailer para Mailjet
const transporter =
  SMTP_HOST && SMTP_USER && SMTP_PASS
    ? nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: false, // true para 465, false para otros puertos
        auth: {
          user: SMTP_USER,
          pass: SMTP_PASS,
        },
      })
    : null;

export async function POST(req: NextRequest) {
  try {
    if (!transporter || !CONTACT_TO_EMAIL) {
      return NextResponse.json(
        { error: "Server not configured: missing SMTP_HOST, SMTP_USER, SMTP_PASS or CONTACT_TO_EMAIL" },
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

    // Generar timestamp y ID de seguimiento
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
      <div style="font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">

        <!-- Header -->
        <div style="background: linear-gradient(135deg, #1f2937 0%, #374151 100%); padding: 24px; border-radius: 12px 12px 0 0;">
          <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600; display: flex; align-items: center; gap: 8px;">
            🔧 Nuevo mensaje de contacto
          </h1>
          <div style="height: 3px; background: linear-gradient(90deg, #f59e0b 0%, #d97706 100%); margin-top: 16px; border-radius: 2px;"></div>
        </div>

        <!-- Content -->
        <div style="padding: 32px; background-color: #ffffff;">

          <!-- Client Information Section -->
          <div style="margin-bottom: 32px;">
            <h2 style="color: #374151; font-size: 18px; font-weight: 600; margin: 0 0 16px 0; border-bottom: 2px solid #f3f4f6; padding-bottom: 8px;">
              Información del cliente:
            </h2>

            <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6;">
              <p style="margin: 0 0 12px 0; color: #374151; font-size: 16px;">
                <strong style="color: #1f2937;">Nombre:</strong> ${escapeHtml(name)}
              </p>

              <p style="margin: 0 0 12px 0; color: #374151; font-size: 16px;">
                <strong style="color: #1f2937;">Email:</strong>
                <a href="mailto:${escapeHtml(email)}" style="color: #3b82f6; text-decoration: none; font-weight: 500;">
                  ${escapeHtml(email)}
                </a>
              </p>

              ${
                phone
                  ? `
              <p style="margin: 0; color: #374151; font-size: 16px;">
                <strong style="color: #1f2937;">Teléfono:</strong> ${escapeHtml(phone)}
              </p>
              `
                  : ""
              }
            </div>
          </div>

          <!-- Message Section -->
          <div style="margin-bottom: 32px;">
            <h3 style="color: #374151; font-size: 16px; font-weight: 600; margin: 0 0 16px 0;">
              Mensaje:
            </h3>

            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0;">
              <p style="margin: 0; color: #475569; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">
                ${escapeHtml(message || "(no message)")}
              </p>
            </div>
          </div>

          <!-- Tracking Information -->
          <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 20px; border-radius: 8px; margin-bottom: 24px;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
              <span style="font-size: 16px;">📍</span>
              <strong style="color: #92400e; font-size: 14px;">Enviado desde:</strong>
              <span style="color: #92400e; font-size: 14px;">Formulario de contacto web</span>
            </div>

            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
              <span style="font-size: 16px;">🕐</span>
              <strong style="color: #92400e; font-size: 14px;">Fecha:</strong>
              <span style="color: #92400e; font-size: 14px;">${timestamp}</span>
            </div>

            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 16px;">🔍</span>
              <strong style="color: #92400e; font-size: 14px;">ID de seguimiento:</strong>
              <span style="color: #92400e; font-size: 14px; font-family: monospace;">${trackingId}</span>
            </div>
          </div>

          <!-- Instructions -->
          <div style="text-align: center; padding: 20px; background-color: #f1f5f9; border-radius: 8px; margin-bottom: 24px;">
            <p style="margin: 0; color: #64748b; font-size: 14px; font-style: italic;">
              Para responder a este cliente, simplemente responde a este email.
            </p>
          </div>

          <!-- Footer -->
          <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e2e8f0;">
            <p style="margin: 0; color: #9ca3af; font-size: 16px; font-weight: 500;">
              Gold Star Plumbing - Vancouver, BC
            </p>
          </div>
        </div>
      </div>
    `;

    // Enviar email usando nodemailer con Mailjet
    const mailOptions = {
      from: CONTACT_FROM_EMAIL!,
      to: CONTACT_TO_EMAIL!,
      subject,
      text,
      html,
      replyTo: email,
    };

    await transporter!.sendMail(mailOptions);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("/api/contact error", err);

    // Manejo específico de errores de nodemailer
    if (err && typeof err === "object" && "code" in err) {
      return NextResponse.json({ error: "Failed to send email" }, { status: 502 });
    }

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
