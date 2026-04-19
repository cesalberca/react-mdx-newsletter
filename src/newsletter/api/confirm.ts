import { verify } from "jsonwebtoken";
import type { ReactElement } from "react";
import { Resend } from "resend";
import { env } from "@/lib/env";
import { NewsletterWelcomeEmail } from "@/newsletter/emails/transactional/newsletter-welcome-email";

const resend = new Resend(env.RESEND_API_KEY);

interface ConfirmationTokenPayload {
  email: string;
}

export interface ConfirmResult {
  alreadySubscribed?: boolean;
}

export interface ConfirmResponseOk {
  success: true;
  message: string;
  alreadyConfirmed?: boolean;
  alreadySubscribed?: boolean;
}

export interface ConfirmResponseKo {
  error: string;
  success: false;
}

export type ConfirmResponse = ConfirmResponseOk | ConfirmResponseKo;

export async function confirm(
  token: string,
  emailParam: string,
): Promise<ConfirmResult> {
  let payload: ConfirmationTokenPayload;
  try {
    payload = verify(token, env.JWT_SECRET) as ConfirmationTokenPayload;
  } catch {
    throw new Error("Invalid or expired confirmation token");
  }

  const { email } = payload;

  if (email !== emailParam) {
    throw new Error("Email mismatch between token and URL parameter");
  }

  const contactResult = await resend.contacts.create({
    email,
    audienceId: env.RESEND_AUDIENCE_ID,
  });

  if (contactResult.error) {
    if (
      contactResult.error.message?.toLowerCase().includes("already exists") ||
      contactResult.error.message?.toLowerCase().includes("duplicate")
    ) {
      return { alreadySubscribed: true };
    }
    throw new Error(contactResult.error.message);
  }

  try {
    await resend.emails.send({
      from: env.RESEND_EMAIL_FROM,
      to: email,
      subject: "Welcome to Build Your Own Newsletter!",
      react: NewsletterWelcomeEmail({}) as ReactElement,
    });
  } catch (err) {
    console.error("Failed to send welcome email:", err);
  }

  return {};
}
