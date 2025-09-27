// Script para probar el formulario de contacto
const testContactForm = async () => {
  console.log('🧪 PROBANDO FORMULARIO DE CONTACTO');
  console.log('==================================');

  const testData = {
    name: 'Mario Test',
    email: 'mario.test@ejemplo.com',
    phone: '(604) 555-0123',
    message: 'Esta es una prueba del formulario de contacto desde el script. ¿Pueden ayudarme con una reparación de plomería?',
    website: '' // honeypot field
  };

  try {
    console.log('📤 Enviando datos del formulario...');
    console.log('Datos:', JSON.stringify(testData, null, 2));
    console.log('');

    const response = await fetch('http://localhost:3001/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });

    console.log('📊 Respuesta del servidor:');
    console.log('Status:', response.status);
    console.log('Status Text:', response.statusText);
    console.log('');

    const result = await response.json();
    console.log('📋 Resultado:', JSON.stringify(result, null, 2));

    if (response.ok) {
      console.log('');
      console.log('✅ FORMULARIO FUNCIONANDO CORRECTAMENTE!');
      console.log('🎯 El email debería llegar a: goldstarplumbingvancouver@gmail.com');
      console.log('📧 Remitente: goldstarplumbingvancouver@gmail.com');
      console.log('📧 Reply-To: mario.test@ejemplo.com');
      console.log('');
      console.log('🔍 Revisa tu email ahora!');
    } else {
      console.log('');
      console.log('❌ ERROR EN EL FORMULARIO');
      console.log('Código de error:', response.status);
      console.log('Mensaje:', result.error || 'Error desconocido');
    }

  } catch (error) {
    console.error('❌ Error de conexión:', error.message);
    console.log('');
    console.log('🔍 Posibles causas:');
    console.log('- El servidor no está ejecutándose');
    console.log('- Puerto incorrecto');
    console.log('- Problema de red');
  }
};

// Ejecutar la prueba
testContactForm();