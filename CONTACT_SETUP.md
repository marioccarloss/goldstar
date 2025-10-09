# Configuración del Formulario de Contacto

## ✅ Estado Actual

El formulario de contacto está **completamente funcional** y listo para enviar correos electrónicos usando **Mailjet SMTP**.

## 🔧 Configuración Requerida

### 1. Variables de Entorno

Asegúrate de que tu archivo `.env.local` contenga las siguientes variables:

```env
# Configuración SMTP de Mailjet
SMTP_HOST=in-v3.mailjet.com
SMTP_PORT=587
SMTP_USER=tu_api_key_publica
SMTP_PASS=tu_api_key_privada

# Email de destino para el formulario de contacto
CONTACT_TO_EMAIL=goldstarplumbingvancouver@gmail.com
CONTACT_FROM_EMAIL=goldstarplumbingvancouver@gmail.com
```

### 2. Configuración de Mailjet

1. **Crear cuenta en Mailjet**: Ve a [mailjet.com](https://www.mailjet.com) y crea una cuenta
2. **Obtener API Keys**:
   - Ve a [API Key Management](https://app.mailjet.com/account/apikeys)
   - Crea una nueva API key (o usa las existentes)
   - Copia la **API Key Pública** y pégala en `SMTP_USER`
   - Copia la **API Key Privada** y pégala en `SMTP_PASS`

3. **Configurar Email de Remitente**:
   - Ve a [Sender addresses & domains](https://app.mailjet.com/account/sender)
   - Verifica tu dominio o email
   - Usa ese email en `CONTACT_FROM_EMAIL`

4. **Para el proyecto actual**:
   - Ya está configurado con `goldstarplumbingvancouver@gmail.com`
   - Las credenciales SMTP ya están en `.env.local`

### 3. Email de Destino

- `CONTACT_TO_EMAIL` es el email donde recibirás las notificaciones
- `CONTACT_FROM_EMAIL` es el email desde el cual se enviarán los correos

## 🚀 Funcionalidades Implementadas

### ✅ Formulario Frontend

- Validación en tiempo real
- Campos: nombre, email, teléfono, mensaje
- Protección anti-spam (honeypot)
- Notificaciones toast para éxito/error
- Diseño responsive y accesible

### ✅ API Backend

- Endpoint: `/api/contact`
- Validación de datos del servidor
- Envío de correos con **Nodemailer + Mailjet SMTP**
- Formato HTML y texto plano
- Manejo robusto de errores
- Protección contra spam

### ✅ Características de Seguridad

- Validación de entrada
- Escape de HTML para prevenir XSS
- Honeypot para detectar bots
- Variables de entorno para credenciales

## 📧 Formato del Email

Los correos que recibirás incluirán:

- **Asunto**: "🔧 Nuevo mensaje de contacto - [Nombre]"
- **De**: `goldstarplumbingvancouver@gmail.com`
- **Para**: `goldstarplumbingvancouver@gmail.com`
- **Responder a**: El email del usuario que envió el formulario
- **Contenido**: Nombre, email, teléfono (si se proporciona) y mensaje en formato HTML y texto plano

## 🧪 Cómo Probar

1. Inicia el servidor: `pnpm dev`
2. Ve a `http://localhost:3000/contact`
3. Llena el formulario con datos de prueba
4. Envía el formulario
5. Verifica que recibas el email en `goldstarplumbingvancouver@gmail.com`

## 🔍 Solución de Problemas

### Error: "Faltan campos requeridos"

- Asegúrate de llenar los campos: nombre, email y mensaje

### Error: "Error al enviar el correo"

- Verifica que las variables SMTP estén configuradas en `.env.local`
- Verifica que tu API key de Mailjet sea válida
- Asegúrate de que el email en `CONTACT_FROM_EMAIL` esté verificado en Mailjet

### No recibo emails

- Verifica la carpeta de spam
- Confirma que `CONTACT_TO_EMAIL` sea correcto
- Revisa los logs del servidor para errores
- Verifica que tu cuenta de Mailjet esté activa

## 📝 Notas Importantes

- El archivo `.env.local` está en `.gitignore` por seguridad
- Nunca commits las API keys al repositorio
- Para producción, configura las variables de entorno en tu plataforma de hosting (Vercel, Netlify, etc.)
- Mailjet tiene límites de envío en el plan gratuito (200 emails/día)

## 🔄 Tecnologías Utilizadas

- **Next.js 15** - Framework de React
- **Nodemailer** - Librería para envío de emails
- **Mailjet SMTP** - Servicio de email transaccional
- **TypeScript** - Tipado estático
- **Zod** - Validación de datos (opcional)

## 📚 Recursos Adicionales

- [Documentación de Mailjet SMTP](https://dev.mailjet.com/smtp-api/overview/)
- [Documentación de Nodemailer](https://nodemailer.com/)
- [API Keys de Mailjet](https://app.mailjet.com/account/apikeys)
