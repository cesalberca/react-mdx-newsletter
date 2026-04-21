import { sign } from "jsonwebtoken";
import type { ReactElement } from "react";
import { Resend } from "resend";
import { v4 as uuid } from "uuid";
import { env } from "@/lib/env";
import NewsletterConfirmationEmail from "@/newsletter/emails/transactional/newsletter-confirmation-email";

export async function subscribe(email: string): Promise<void> {
  const resend = new Resend(env.RESEND_API_KEY);
  const confirmationToken = sign({ email }, env.JWT_SECRET, {
    expiresIn: "24h",
  });

  await resend.emails.send({
    from: env.RESEND_EMAIL_FROM,
    to: email,
    subject: "Confirm your Build Your Own Newsletter subscription",
    replyTo: env.RESEND_EMAIL_FROM,
    headers: { "X-Entity-Ref-ID": uuid() },
    react: NewsletterConfirmationEmail({
      confirmationToken,
      email,
    }) as ReactElement,
  });
}
