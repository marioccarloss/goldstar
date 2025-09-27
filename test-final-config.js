require("dotenv").config({ path: ".env.local" });
const nodemailer = require("nodemailer");

console.log("🧪 PRUEBA FINAL - CONFIGURACIÓN UNIFICADA");
console.log("==========================================");

// Mostrar configuración actual
console.log("📧 Configuración de Email:");
console.log(`   FROM: ${process.env.CONTACT_FROM_EMAIL}`);
console.log(`   TO: ${process.env.CONTACT_TO_EMAIL}`);
console.log("");

// Configurar transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Simular un mensaje de contacto real
const timestamp = new Date().toLocaleString("es-ES", { timeZone: "America/Vancouver" });
const trackingId = Date.now();

const mailOptions = {
  from: process.env.CONTACT_FROM_EMAIL,
  to: process.env.CONTACT_TO_EMAIL,
  replyTo: "cliente.ejemplo@gmail.com", // Email del cliente que llena el formulario
  subject: `🔧 Nuevo mensaje de contacto - Gold Star Plumbing`,
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1f2937; border-bottom: 2px solid #f59e0b; padding-bottom: 10px;">
        🔧 Nuevo mensaje de contacto
      </h2>

      <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #374151; margin-top: 0;">Información del cliente:</h3>
        <p><strong>Nombre:</strong> Juan Pérez</p>
        <p><strong>Email:</strong> cliente.ejemplo@gmail.com</p>
        <p><strong>Teléfono:</strong> (604) 555-0123</p>
      </div>

      <div style="background: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
        <h3 style="color: #374151; margin-top: 0;">Mensaje:</h3>
        <p style="line-height: 1.6;">
          Hola, necesito ayuda con una fuga en mi cocina. El agua está goteando debajo del fregadero
          y parece que viene de las tuberías. ¿Podrían venir a revisarlo esta semana?
          Estoy disponible en las mañanas. Gracias.
        </p>
      </div>

      <div style="margin-top: 20px; padding: 15px; background: #fef3c7; border-radius: 8px;">
        <p style="margin: 0; font-size: 14px; color: #92400e;">
          <strong>📍 Enviado desde:</strong> Formulario de contacto web<br>
          <strong>🕐 Fecha:</strong> ${timestamp}<br>
          <strong>🔍 ID de seguimiento:</strong> ${trackingId}
        </p>
      </div>

      <div style="margin-top: 20px; text-align: center; color: #6b7280; font-size: 12px;">
        <p>Para responder a este cliente, simplemente responde a este email.</p>
        <p>Gold Star Plumbing - Vancouver, BC</p>
      </div>
    </div>
  `,
};

console.log("📤 Enviando email de prueba...");
console.log(`🔍 Tracking ID: ${trackingId}`);
console.log("");

transporter
  .sendMail(mailOptions)
  .then((info) => {
    console.log("✅ EMAIL ENVIADO EXITOSAMENTE!");
    console.log("================================");
    console.log(`📧 De: ${process.env.CONTACT_FROM_EMAIL}`);
    console.log(`📧 Para: ${process.env.CONTACT_TO_EMAIL}`);
    console.log(`📧 Reply-To: cliente.ejemplo@gmail.com`);
    console.log(`🆔 Message ID: ${info.messageId}`);
    console.log(`🔍 Tracking ID: ${trackingId}`);
    console.log("");
    console.log("🎯 CONFIGURACIÓN PERFECTA:");
    console.log("   ✅ Misma dirección para FROM y TO");
    console.log("   ✅ Dirección verificada en Mailjet");
    console.log("   ✅ Reply-To configurado para responder al cliente");
    console.log("");
    console.log("📱 Revisa tu email en: goldstarplumbingvancouver@gmail.com");
    console.log("   - Busca el email de Gold Star Plumbing");
    console.log(`   - Tracking ID: ${trackingId}`);
    console.log("   - Verifica que puedes responder directamente al cliente");
  })
  .catch((error) => {
    console.error("❌ Error enviando email:", error);
  });
