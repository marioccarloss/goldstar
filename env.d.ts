declare namespace NodeJS {
  interface ProcessEnv {
    // Mailjet SMTP Configuration
    SMTP_HOST: string;
    SMTP_PORT: string;
    SMTP_USER: string;
    SMTP_PASS: string;

    // Email Configuration
    CONTACT_TO_EMAIL: string;
    CONTACT_FROM_EMAIL: string;

    // Next.js
    NODE_ENV: "development" | "production" | "test";
  }
}
