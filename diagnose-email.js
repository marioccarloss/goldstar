require("dotenv").config({ path: ".env.local" });
const nodemailer = require("nodemailer");

async function diagnoseEmailDelivery() {
  console.log("🔍 DIAGNÓSTICO AVANZADO DE EMAIL - Mailjet");
  console.log("==========================================");

  const timestamp = new Date().toISOString();
  console.log(`⏰ Timestamp: ${timestamp}`);

  // Verificar variables de entorno
  console.log("\n📋 Variables de entorno:");
  console.log(`SMTP_HOST: ${process.env.SMTP_HOST}`);
  console.log(`SMTP_PORT: ${process.env.SMTP_PORT}`);
  console.log(`SMTP_USER: ${process.env.SMTP_USER}`);
  console.log(`SMTP_PASS: ${process.env.SMTP_PASS ? "***configurado***" : "NO CONFIGURADO"}`);
  console.log(`CONTACT_FROM_EMAIL: ${process.env.CONTACT_FROM_EMAIL}`);
  console.log(`CONTACT_TO_EMAIL: ${process.env.CONTACT_TO_EMAIL}`);

  // Crear transporter con logging detallado
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    debug: true, // Habilitar debug
    logger: true, // Habilitar logging
  });

  try {
    // Verificar conexión
    console.log("\n🔌 Verificando conexión SMTP...");
    await transporter.verify();
    console.log("✅ Conexión SMTP exitosa");

    // Configurar email con headers adicionales para tracking
    const mailOptions = {
      from: process.env.CONTACT_FROM_EMAIL,
      to: process.env.CONTACT_TO_EMAIL,
      subject: `🧪 PRUEBA DE DIAGNÓSTICO - ${timestamp}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">🧪 Email de Diagnóstico</h2>
          <p><strong>Timestamp:</strong> ${timestamp}</p>
          <p><strong>Remitente:</strong> ${process.env.CONTACT_FROM_EMAIL}</p>
          <p><strong>Destinatario:</strong> ${process.env.CONTACT_TO_EMAIL}</p>
          <p><strong>Servidor SMTP:</strong> ${process.env.SMTP_HOST}:${process.env.SMTP_PORT}</p>

          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">📋 Información del Test</h3>
            <p>Este email fue enviado para diagnosticar problemas de entrega.</p>
            <p>Si recibes este email, la configuración está funcionando correctamente.</p>
          </div>

          <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">⚠️ Si no recibes este email, revisa:</h3>
            <ul>
              <li>Carpeta de <strong>Spam/Correo no deseado</strong></li>
              <li>Filtros de Gmail</li>
              <li>Configuración de seguridad de Gmail</li>
              <li>Bandeja de entrada de Gmail</li>
            </ul>
          </div>

          <p style="color: #6b7280; font-size: 12px;">
            ID de seguimiento: ${Date.now()}
          </p>
        </div>
      `,
      headers: {
        "X-Mailer": "Goldstar Plumbing Diagnostic Tool",
        "X-Priority": "1",
        "X-MSMail-Priority": "High",
        Importance: "high",
        "X-Test-Timestamp": timestamp,
        "X-Test-ID": Date.now().toString(),
      },
    };

    console.log("\n📧 Enviando email de diagnóstico...");
    console.log(`De: ${mailOptions.from}`);
    console.log(`Para: ${mailOptions.to}`);
    console.log(`Asunto: ${mailOptions.subject}`);

    const info = await transporter.sendMail(mailOptions);

    console.log("\n✅ Email enviado exitosamente!");
    console.log("📊 Información de respuesta:");
    console.log(`Message ID: ${info.messageId}`);
    console.log(`Response: ${info.response}`);
    console.log(`Accepted: ${info.accepted}`);
    console.log(`Rejected: ${info.rejected}`);

    if (info.envelope) {
      console.log(`Envelope From: ${info.envelope.from}`);
      console.log(`Envelope To: ${info.envelope.to}`);
    }

    console.log("\n🔍 PRÓXIMOS PASOS:");
    console.log("1. Revisa la carpeta de SPAM en goldstarplumbingvancouver@gmail.com");
    console.log("2. Busca emails de marioccarloss@gmail.com");
    console.log("3. Revisa filtros de Gmail que puedan estar bloqueando emails");
    console.log("4. Espera 5-10 minutos para la entrega");
    console.log("5. Revisa el dashboard de Mailjet para más detalles");
  } catch (error) {
    console.error("\n❌ Error en el diagnóstico:");
    console.error("Tipo:", error.name);
    console.error("Mensaje:", error.message);
    console.error("Código:", error.code);
    console.error("Stack:", error.stack);
  }
}

diagnoseEmailDelivery();
