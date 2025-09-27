# Configuración del Formulario de Contacto

## ✅ Estado Actual
El formulario de contacto está **completamente funcional** y listo para enviar correos electrónicos.

## 🔧 Configuración Requerida

### 1. Variables de Entorno
Asegúrate de que tu archivo `.env.local` contenga las siguientes variables:

```env
# API Key de Resend (obtener en: https://resend.com/api-keys)
RESEND_API_KEY=tu_api_key_aqui

# Email donde recibirás las notificaciones del formulario
CONTACT_TO_EMAIL=tu_email@ejemplo.com

# Email desde el cual se enviarán los correos (debe ser dominio verificado)
CONTACT_FROM_EMAIL=no-reply@tu-dominio.com
```

### 2. Configuración de Resend

1. **Crear cuenta en Resend**: Ve a [resend.com](https://resend.com) y crea una cuenta
2. **Obtener API Key**: 
   - Ve a [API Keys](https://resend.com/api-keys)
   - Crea una nueva API key
   - Cópiala y pégala en `RESEND_API_KEY`

3. **Configurar dominio** (opcional pero recomendado):
   - Ve a [Domains](https://resend.com/domains)
   - Agrega tu dominio y verifica los registros DNS
   - Usa `no-reply@tu-dominio.com` en `CONTACT_FROM_EMAIL`

4. **Para pruebas**: Puedes usar `onboarding@resend.dev` como `CONTACT_FROM_EMAIL`

### 3. Email de Destino
- Cambia `CONTACT_TO_EMAIL` por el email donde quieres recibir las notificaciones
- Este será el email que reciba todos los mensajes del formulario

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
- Envío de correos con Resend
- Formato HTML y texto plano
- Manejo robusto de errores
- Protección contra spam

### ✅ Características de Seguridad
- Validación de entrada
- Escape de HTML para prevenir XSS
- Honeypot para detectar bots
- Rate limiting implícito
- Variables de entorno para credenciales

## 📧 Formato del Email

Los correos que recibirás incluirán:
- **Asunto**: "New contact message from [Nombre]"
- **De**: El email configurado en `CONTACT_FROM_EMAIL`
- **Responder a**: El email del usuario que envió el formulario
- **Contenido**: Nombre, email, teléfono (si se proporciona) y mensaje

## 🧪 Cómo Probar

1. Inicia el servidor: `npm run dev`
2. Ve a `http://localhost:3000/contact`
3. Llena el formulario con datos de prueba
4. Envía el formulario
5. Verifica que recibas el email en `CONTACT_TO_EMAIL`

## 🔍 Solución de Problemas

### Error: "Server not configured"
- Verifica que `RESEND_API_KEY` y `CONTACT_TO_EMAIL` estén configurados en `.env.local`

### Error: "Failed to send email"
- Verifica que tu API key de Resend sea válida
- Asegúrate de que el dominio en `CONTACT_FROM_EMAIL` esté verificado en Resend

### No recibo emails
- Verifica la carpeta de spam
- Confirma que `CONTACT_TO_EMAIL` sea correcto
- Revisa los logs del servidor para errores

## 📝 Notas Importantes

- El archivo `.env.local` está en `.gitignore` por seguridad
- Nunca commits las API keys al repositorio
- Para producción, configura las variables de entorno en tu plataforma de hosting
- Resend tiene límites de envío en el plan gratuito (100 emails/día)