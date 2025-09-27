import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Configuración de Mailjet SMTP
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const BOOKING_TO_EMAIL = "goldstarplumbingvancouver@gmail.com";
const BOOKING_FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "no-reply@goldstarplumbing.com";

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
    if (!transporter) {
      return NextResponse.json(
        { error: "Server not configured: missing SMTP_HOST, SMTP_USER, SMTP_PASS" },
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

    const { 
      name = "", 
      email = "", 
      phone = "", 
      service = "",
      date = "",
      timeSlot = "",
      comments = "",
      website = "" 
    } = body;

    // Honeypot
    if (website && String(website).trim() !== "") {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    if (!name || !phone || !service || !date || !timeSlot) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const subject = `📅 Nueva reserva de servicio - ${name}`;
    const text = [
      `NUEVA RESERVA DE SERVICIO`,
      ``,
      `Cliente: ${name}`,
      email ? `Email: ${email}` : null,
      `Teléfono: ${phone}`,
      ``,
      `DETALLES DE LA RESERVA:`,
      `Servicio: ${service}`,
      `Fecha: ${date}`,
      `Hora: ${timeSlot}`,
      ``,
      comments ? `Comentarios adicionales:` : null,
      comments ? comments : null,
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
    const bookingId = `BK-${Date.now()}`;

    const html = `
      <div style="font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">

        <!-- Header -->
        <div style="background: linear-gradient(135deg, #059669 0%, #047857 100%); padding: 24px; border-radius: 12px 12px 0 0;">
          <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600; display: flex; align-items: center; gap: 8px;">
            📅 Nueva reserva de servicio
          </h1>
          <div style="height: 3px; background: linear-gradient(90deg, #f59e0b 0%, #d97706 100%); margin-top: 16px; border-radius: 2px;"></div>
        </div>

        <!-- Content -->
        <div style="padding: 32px; background-color: #ffffff;">

          <!-- Booking Information Section -->
          <div style="margin-bottom: 32px;">
            <h2 style="color: #374151; font-size: 18px; font-weight: 600; margin: 0 0 16px 0; border-bottom: 2px solid #f3f4f6; padding-bottom: 8px;">
              Información del cliente:
            </h2>

            <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; border-left: 4px solid #059669;">
              <p style="margin: 0 0 12px 0; color: #374151; font-size: 16px;">
                <strong style="color: #1f2937;">Nombre:</strong> ${escapeHtml(name)}
              </p>

              ${
                email
                  ? `
              <p style="margin: 0 0 12px 0; color: #374151; font-size: 16px;">
                <strong style="color: #1f2937;">Email:</strong>
                <a href="mailto:${escapeHtml(email)}" style="color: #059669; text-decoration: none; font-weight: 500;">
                  ${escapeHtml(email)}
                </a>
              </p>
              `
                  : ""
              }

              <p style="margin: 0; color: #374151; font-size: 16px;">
                <strong style="color: #1f2937;">Teléfono:</strong> 
                <a href="tel:${escapeHtml(phone)}" style="color: #059669; text-decoration: none; font-weight: 500;">
                  ${escapeHtml(phone)}
                </a>
              </p>
            </div>
          </div>

          <!-- Service Details Section -->
          <div style="margin-bottom: 32px;">
            <h2 style="color: #374151; font-size: 18px; font-weight: 600; margin: 0 0 16px 0; border-bottom: 2px solid #f3f4f6; padding-bottom: 8px;">
              Detalles de la reserva:
            </h2>

            <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b;">
              <p style="margin: 0 0 12px 0; color: #374151; font-size: 16px;">
                <strong style="color: #1f2937;">Servicio:</strong> ${escapeHtml(service)}
              </p>

              <p style="margin: 0 0 12px 0; color: #374151; font-size: 16px;">
                <strong style="color: #1f2937;">Fecha:</strong> ${escapeHtml(date)}
              </p>

              <p style="margin: 0; color: #374151; font-size: 16px;">
                <strong style="color: #1f2937;">Hora:</strong> ${escapeHtml(timeSlot)}
              </p>
            </div>
          </div>

          ${
            comments
              ? `
          <!-- Comments Section -->
          <div style="margin-bottom: 32px;">
            <h3 style="color: #374151; font-size: 16px; font-weight: 600; margin: 0 0 16px 0;">
              Comentarios adicionales:
            </h3>

            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0;">
              <p style="margin: 0; color: #475569; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">
                ${escapeHtml(comments)}
              </p>
            </div>
          </div>
          `
              : ""
          }

          <!-- Tracking Information -->
          <div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); padding: 20px; border-radius: 8px; margin-bottom: 24px;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
              <span style="font-size: 16px;">📍</span>
              <strong style="color: #1e40af; font-size: 14px;">Enviado desde:</strong>
              <span style="color: #1e40af; font-size: 14px;">Sistema de reservas web</span>
            </div>

            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
              <span style="font-size: 16px;">🕐</span>
              <strong style="color: #1e40af; font-size: 14px;">Fecha de reserva:</strong>
              <span style="color: #1e40af; font-size: 14px;">${timestamp}</span>
            </div>

            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 16px;">🔍</span>
              <strong style="color: #1e40af; font-size: 14px;">ID de reserva:</strong>
              <span style="color: #1e40af; font-size: 14px; font-family: monospace;">${bookingId}</span>
            </div>
          </div>

          <!-- Action Required -->
          <div style="text-align: center; padding: 20px; background-color: #fef2f2; border-radius: 8px; margin-bottom: 24px; border: 1px solid #fecaca;">
            <p style="margin: 0 0 8px 0; color: #dc2626; font-size: 16px; font-weight: 600;">
              ⚠️ Acción requerida
            </p>
            <p style="margin: 0; color: #7f1d1d; font-size: 14px;">
              Por favor, confirma la disponibilidad y contacta al cliente para confirmar la cita.
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
      from: BOOKING_FROM_EMAIL!,
      to: BOOKING_TO_EMAIL!,
      subject,
      text,
      html,
      replyTo: email || BOOKING_FROM_EMAIL,
    };

    await transporter!.sendMail(mailOptions);

    return NextResponse.json({ ok: true, bookingId });
  } catch (err) {
    console.error("/api/booking error", err);

    // Manejo específico de errores de nodemailer
    if (err && typeof err === "object" && "code" in err) {
      return NextResponse.json({ error: "Failed to send booking email" }, { status: 502 });
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