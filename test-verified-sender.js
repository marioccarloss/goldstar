require('dotenv').config({ path: '.env.local' });
const nodemailer = require('nodemailer');

console.log('🔍 PRUEBA CON DIRECCIÓN VERIFICADA');
console.log('==================================');

// Verificar variables de entorno
console.log('📧 Variables de configuración:');
console.log('SMTP_HOST:', process.env.SMTP_HOST);
console.log('SMTP_PORT:', process.env.SMTP_PORT);
console.log('SMTP_USER:', process.env.SMTP_USER);
console.log('SMTP_PASS:', process.env.SMTP_PASS ? 'CONFIGURADO' : 'NO CONFIGURADO');
console.log('CONTACT_FROM_EMAIL:', process.env.CONTACT_FROM_EMAIL);
console.log('CONTACT_TO_EMAIL:', process.env.CONTACT_TO_EMAIL);
console.log('');

async function testVerifiedSender() {
    try {
        // Crear transporter
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT),
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });

        // Verificar conexión
        console.log('🔗 Verificando conexión SMTP...');
        await transporter.verify();
        console.log('✅ Conexión SMTP exitosa');
        console.log('');

        // Preparar email de prueba
        const timestamp = new Date().toISOString();
        const trackingId = Date.now();
        
        const mailOptions = {
            from: process.env.CONTACT_FROM_EMAIL,
            to: process.env.CONTACT_TO_EMAIL,
            subject: `🧪 PRUEBA CON DIRECCIÓN VERIFICADA - ${trackingId}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #2563eb;">✅ Prueba con Dirección Verificada</h2>
                    
                    <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3>📊 Información de la Prueba</h3>
                        <p><strong>Tracking ID:</strong> ${trackingId}</p>
                        <p><strong>Timestamp:</strong> ${timestamp}</p>
                        <p><strong>Remitente:</strong> ${process.env.CONTACT_FROM_EMAIL}</p>
                        <p><strong>Destinatario:</strong> ${process.env.CONTACT_TO_EMAIL}</p>
                        <p><strong>Estado del remitente:</strong> ✅ VERIFICADO en Mailjet</p>
                    </div>
                    
                    <div style="background: #dcfce7; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3>🎯 Objetivo de la Prueba</h3>
                        <p>Esta prueba utiliza <strong>hello@marioroca.dev</strong>, que es la única dirección verificada y activa en Mailjet.</p>
                        <p>Si este email llega correctamente, confirma que el problema anterior era la falta de verificación de la dirección remitente.</p>
                    </div>
                    
                    <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3>📝 Simulación de Formulario de Contacto</h3>
                        <p><strong>Nombre:</strong> Cliente de Prueba</p>
                        <p><strong>Email:</strong> cliente@ejemplo.com</p>
                        <p><strong>Teléfono:</strong> +1 (555) 123-4567</p>
                        <p><strong>Servicio:</strong> Reparación de plomería</p>
                        <p><strong>Mensaje:</strong> Esta es una prueba del formulario de contacto con dirección verificada.</p>
                    </div>
                    
                    <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
                        Si recibes este email, ¡el sistema de contacto está funcionando correctamente! 🎉
                    </p>
                </div>
            `,
            headers: {
                'X-Test-Type': 'verified-sender-test',
                'X-Tracking-ID': trackingId.toString(),
                'X-Sender-Status': 'verified'
            }
        };

        // Enviar email
        console.log('📤 Enviando email de prueba...');
        console.log(`📧 De: ${mailOptions.from}`);
        console.log(`📧 Para: ${mailOptions.to}`);
        console.log(`🆔 Tracking ID: ${trackingId}`);
        console.log('');

        const result = await transporter.sendMail(mailOptions);
        
        console.log('✅ EMAIL ENVIADO EXITOSAMENTE');
        console.log('📊 Detalles del envío:');
        console.log('- Message ID:', result.messageId);
        console.log('- Response:', result.response);
        console.log('');
        
        console.log('🔍 PRÓXIMOS PASOS:');
        console.log('1. ✅ Revisar la bandeja de entrada de goldstarplumbingvancouver@gmail.com');
        console.log('2. ✅ Buscar email con Tracking ID:', trackingId);
        console.log('3. ✅ Verificar que el remitente aparece como hello@marioroca.dev');
        console.log('4. ✅ Si llega este email, el problema estaba en la verificación del remitente');
        console.log('');
        console.log('⏰ Tiempo estimado de entrega: 1-5 minutos');
        
    } catch (error) {
        console.error('❌ ERROR:', error.message);
        console.error('📋 Detalles completos:', error);
    }
}

testVerifiedSender();