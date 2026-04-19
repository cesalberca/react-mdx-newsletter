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
    render(<NewsletterEmailLoader slug="welcome-and-project-setup" />),
  ]);

  return (
    <div
      style={{
        backgroundColor: "var(--bg-primary)",
        minHeight: "100%",
        padding: 24,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ maxWidth: 720, width: "100%" }}>
        <SubscribeForm />

        <div
          style={{
            backgroundColor: "var(--bg-card)",
            borderRadius: 8,
            border: "1px solid var(--border-primary)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "12px 24px",
              borderBottom: "1px solid var(--border-light)",
              fontSize: 13,
              color: "var(--text-secondary)",
            }}
          >
            What you&apos;ll receive — 3 emails in the journey
          </div>

          <EmailPreviewCard
            from="César Alberca"
            fromEmail="newsletter@cesalberca.com"
            subject="Please confirm your subscription"
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
            subject="Welcome! Let's Build a Newsletter from Scratch"
            preview="Setting up a Next.js project with MDX, React Email, and Resend — everything you need to ship your own newsletter"
            html={newsletterHtml}
          />
        </div>
      </div>
    </div>
  );
}
