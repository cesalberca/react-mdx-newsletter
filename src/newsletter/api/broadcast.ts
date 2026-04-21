import { render } from "@react-email/render";
import type { ReactElement } from "react";
import { Resend } from "resend";
import { env } from "@/lib/env";

export interface BroadcastResult {
  broadcastId: string;
}

export async function broadcast(
  newsletterSlug: string,
): Promise<BroadcastResult> {
  const resend = new Resend(env.RESEND_API_KEY);
  const newsletterModule = await import(
    `@/newsletter/emails/newsletter/${newsletterSlug}.tsx`
  );
  const NewsletterComponent = newsletterModule.default;

  if (!NewsletterComponent) {
    throw new Error(`Newsletter component not found: ${newsletterSlug}`);
  }

  const { title } = NewsletterComponent;
  const html = await render(NewsletterComponent() as ReactElement);

  const result = await resend.broadcasts.create({
    audienceId: env.RESEND_SEGMENT_ID,
    topicId: env.RESEND_TOPIC_ID,
    from: env.RESEND_EMAIL_FROM,
    subject: title,
    html,
    name: title,
  });

  if (result.error) {
    throw new Error(result.error.message);
  }

  if (!result.data) {
    throw new Error("Failed to create broadcast");
  }

  await resend.broadcasts.send(result.data.id);

  return { broadcastId: result.data.id };
}
