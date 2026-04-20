import { render } from "@react-email/render";
import { NewsletterEmailLoader } from "@/newsletter/components/newsletter-email-loader";
import NewsletterConfirmationEmail from "@/newsletter/emails/transactional/newsletter-confirmation-email";
import { NewsletterWelcomeEmail } from "@/newsletter/emails/transactional/newsletter-welcome-email";
import { EmailPreviewCard } from "./email-preview-card";
import { SubscribeForm } from "./subscribe-form";

export default async function NewsletterPage() {
  const [confirmationHtml, welcomeHtml, newsletterHtml] = await Promise.all([
    render(
      <NewsletterConfirmationEmail
        confirmationToken="preview-token"
        email="you@example.com"
      />,
    ),
    render(<NewsletterWelcomeEmail />),
    render(<NewsletterEmailLoader slug="launching-newsletter" />),
  ]);

  return (
    <div className="bg-background min-h-full p-6 flex justify-center">
      <div className="max-w-[720px] w-full">
        <SubscribeForm />

        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <div className="py-3 px-6 border-b border-border-faint text-[13px] text-muted-foreground">
            You&apos;ll receive 3 emails
          </div>

          <EmailPreviewCard
            from="César Alberca"
            fromEmail="newsletter@cesalberca.com"
            subject="Confirm your subscription"
            preview="Just one click away from joining the Frontend Architecture newsletter community!"
            html={confirmationHtml}
          />

          <EmailPreviewCard
            from="César Alberca"
            fromEmail="newsletter@cesalberca.com"
            subject="Welcome to the Newsletter!"
            preview="I'm thrilled you've decided to sign up to learn about Frontend Architecture with me."
            html={welcomeHtml}
          />

          <EmailPreviewCard
            from="César Alberca"
            fromEmail="newsletter@cesalberca.com"
            subject="Build Your Own Newsletter: Talk Resources and Links"
            preview="The slides, the repo, and everything else from the talk."
            html={newsletterHtml}
          />
        </div>
      </div>
    </div>
  );
}
