require("dotenv").config({ path: ".env.local" });
const nodemailer = require("nodemailer");

async function testAlternativeEmail() {
  console.log("🧪 PRUEBA CON EMAIL ALTERNATIVO");
  console.log("================================");

  const timestamp = new Date().toISOString();
  console.log(`⏰ Timestamp: ${timestamp}`);

  // Crear transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    debug: true,
    logger: true,
  });

  // Lista de emails alternativos para probar
  const testEmails = [
    "marioccarloss@gmail.com", // Tu propio email
    "test@example.com", // Email de prueba
  ];

  for (const testEmail of testEmails) {
    try {
      console.log(`\n📧 Enviando a: ${testEmail}`);

      const mailOptions = {
        from: process.env.CONTACT_FROM_EMAIL,
        to: testEmail,
        subject: `🧪 PRUEBA ALTERNATIVA - ${timestamp}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">🧪 Prueba de Email Alternativo</h2>
            <p><strong>Timestamp:</strong> ${timestamp}</p>
            <p><strong>Email de prueba:</strong> ${testEmail}</p>
            <p><strong>Remitente:</strong> ${process.env.CONTACT_FROM_EMAIL}</p>

            <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0;">📋 Objetivo de la Prueba</h3>
              <p>Esta prueba determina si el problema es específico del email goldstarplumbingvancouver@gmail.com o un problema general de configuración.</p>
            </div>

            <p style="color: #6b7280; font-size: 12px;">
              ID de seguimiento: ${Date.now()}
            </p>
          </div>
        `,
        headers: {
          "X-Test-Type": "Alternative Email Test",
          "X-Test-Timestamp": timestamp,
          "X-Test-Target": testEmail,
        },
      };

      const info = await transporter.sendMail(mailOptions);

      console.log(`✅ Email enviado a ${testEmail}`);
      console.log(`Response: ${info.response}`);
      console.log(`Message ID: ${info.messageId}`);
    } catch (error) {
      console.error(`❌ Error enviando a ${testEmail}:`, error.message);
    }
  }

  console.log("\n🔍 INSTRUCCIONES:");
  console.log("1. Revisa tu email marioccarloss@gmail.com");
  console.log("2. Si recibes el email ahí, el problema es específico de goldstarplumbingvancouver@gmail.com");
  console.log("3. Si no recibes ningún email, el problema es de configuración de Mailjet");
}

testAlternativeEmail();
