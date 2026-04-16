function getEnvVar(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
}

export const env = {
  get RESEND_API_KEY() {
    return getEnvVar("RESEND_API_KEY");
  },
  get RESEND_EMAIL_FROM() {
    return getEnvVar("RESEND_EMAIL_FROM");
  },
  get RESEND_TEST_EMAIL() {
    return getEnvVar("RESEND_TEST_EMAIL");
  },
  get NEWSLETTER_BROADCAST_TOKEN() {
    return getEnvVar("NEWSLETTER_BROADCAST_TOKEN");
  },
  get JWT_SECRET() {
    return getEnvVar("JWT_SECRET");
  },
  get NEXT_PUBLIC_URL() {
    return process.env.NEXT_PUBLIC_URL ?? "http://localhost:3000";
  },
};
