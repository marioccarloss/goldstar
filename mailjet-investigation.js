require('dotenv').config({ path: '.env.local' });
const nodemailer = require('nodemailer');

async function investigateMailjetConfig() {
  console.log('🔍 INVESTIGACIÓN DE CONFIGURACIÓN MAILJET');
  console.log('=========================================');
  
  console.log('\n📋 Configuración actual:');
  console.log(`SMTP_HOST: ${process.env.SMTP_HOST}`);
  console.log(`SMTP_PORT: ${process.env.SMTP_PORT}`);
  console.log(`SMTP_USER: ${process.env.SMTP_USER}`);
  console.log(`CONTACT_FROM_EMAIL: ${process.env.CONTACT_FROM_EMAIL}`);
  console.log(`CONTACT_TO_EMAIL: ${process.env.CONTACT_TO_EMAIL}`);
  
  // Verificar si el dominio del remitente está verificado
  const fromDomain = process.env.CONTACT_FROM_EMAIL?.split('@')[1];
  console.log(`\n🌐 Dominio del remitente: ${fromDomain}`);
  
  if (fromDomain === 'gmail.com') {
    console.log('✅ Usando dominio Gmail (debería estar verificado)');
  } else {
    console.log('⚠️  Usando dominio personalizado - requiere verificación en Mailjet');
  }
  
  // Crear transporter con configuración detallada
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    debug: false, // Desactivar debug para output más limpio
    logger: false,
  });

  try {
    console.log('\n🔌 Verificando conexión SMTP...');
    await transporter.verify();
    console.log('✅ Conexión SMTP exitosa');
    
    // Enviar email de prueba con headers de autenticación
    console.log('\n📧 Enviando email de prueba con headers de autenticación...');
    
    const mailOptions = {
      from: process.env.CONTACT_FROM_EMAIL,
      to: process.env.CONTACT_FROM_EMAIL, // Enviar a nosotros mismos
      subject: '🔍 Prueba de Autenticación Mailjet',
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>🔍 Prueba de Autenticación</h2>
          <p>Este email verifica la configuración de autenticación de Mailjet.</p>
          <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
          <p><strong>Dominio:</strong> ${fromDomain}</p>
        </div>
      `,
      headers: {
        'X-Mailer': 'Goldstar Plumbing',
        'Return-Path': process.env.CONTACT_FROM_EMAIL,
      }
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email de autenticación enviado');
    console.log(`Response: ${info.response}`);
    console.log(`Message ID: ${info.messageId}`);
    
  } catch (error) {
    console.error('\n❌ Error en la investigación:');
    console.error('Mensaje:', error.message);
    console.error('Código:', error.code);
  }
  
  console.log('\n🔍 POSIBLES PROBLEMAS IDENTIFICADOS:');
  
  if (fromDomain !== 'gmail.com') {
    console.log('⚠️  1. Dominio personalizado no verificado en Mailjet');
    console.log('   Solución: Verificar dominio en dashboard de Mailjet');
  }
  
  console.log('⚠️  2. Configuración SPF/DKIM faltante');
  console.log('   Solución: Configurar registros DNS para autenticación');
  
  console.log('⚠️  3. Límites de cuenta nueva en Mailjet');
  console.log('   Solución: Verificar límites en dashboard de Mailjet');
  
  console.log('⚠️  4. Políticas de Gmail muy estrictas');
  console.log('   Solución: Usar dominio verificado o configurar autenticación');
  
  console.log('\n📋 PRÓXIMOS PASOS:');
  console.log('1. Revisar dashboard de Mailjet: https://app.mailjet.com/');
  console.log('2. Verificar estado de entrega de emails enviados');
  console.log('3. Comprobar si hay dominios verificados');
  console.log('4. Revisar configuración de autenticación');
}

investigateMailjetConfig();