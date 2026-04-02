// IMPORTANTE: Esta clave es SECRETA y solo se usa en el servidor.
// No la exportes para evitar filtraciones al navegador.
const TURNSTILE_SECRET_KEY = "0x4AAAAAACzKP7fycCSGlVJRe3atrJn1vRk";

export async function verifyTurnstileToken(token: string) {
  if (!token) {
    return { success: false, "error-codes": ["missing-input-response"] };
  }

  const formData = new FormData();
  formData.append("secret", TURNSTILE_SECRET_KEY);
  formData.append("response", token);

  try {
    const result = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: formData,
    });

    const outcome = await result.json();
    return outcome;
  } catch (error) {
    console.error("Error verifying Turnstile token:", error);
    return { success: false, "error-codes": ["internal-error"] };
  }
}
