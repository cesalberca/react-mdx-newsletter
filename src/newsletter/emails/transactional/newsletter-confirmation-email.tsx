import { Container, Text } from "@react-email/components";
import { EmailButton } from "@/newsletter/components/email-button";
import { EmailLink } from "@/newsletter/mdx/email/email-link";
import { EmailTemplate } from "@/newsletter/templates/email-template";

interface ConfirmationEmailProps {
  confirmationToken: string;
  email: string;
}

export default function NewsletterConfirmationEmail({
  confirmationToken,
  email,
}: ConfirmationEmailProps) {
  const baseUrl =
    process.env.NEXT_PUBLIC_URL ?? "https://react-mdx-newsletter.vercel.app";
  const confirmationUrl = `${baseUrl}/newsletter/confirm?token=${confirmationToken}&email=${encodeURIComponent(email)}`;

  return (
    <EmailTemplate
      title="Your Inheritance Awaits: One Final Step Required"
      description="To claim your React + MDX Newsletter Inheritance, you must first verify your identity."
    >
      <Text style={{ color: "#0a0a0a", fontSize: 16, lineHeight: 1.6 }}>
        Dear Esteemed Friend,
      </Text>

      <Text style={{ color: "#0a0a0a", fontSize: 16, lineHeight: 1.6 }}>
        I trust this message reaches you in excellent spirits. We have received
        your request to claim your rightful inheritance. The vault is nearly
        open.
      </Text>

      <Text style={{ color: "#0a0a0a", fontSize: 16, lineHeight: 1.6 }}>
        Before the transfer of wisdom can proceed, our legal department requires
        one final verification of your identity. Simply click the sacred button
        below to confirm your cooperation.
      </Text>

      <Text style={{ color: "#0a0a0a", fontSize: 16, lineHeight: 1.6 }}>
        Should you have no knowledge of this inheritance, you may disregard this
        correspondence. No further contact shall be made.
      </Text>

      <Container style={{ textAlign: "center", width: "66%" }}>
        <EmailButton link={confirmationUrl}>Claim My Inheritance</EmailButton>
        <Text style={{ fontSize: 12 }}>
          Or copy and paste this link in your browser:
          <br />
          <EmailLink href={confirmationUrl}>{confirmationUrl}</EmailLink>
        </Text>
      </Container>

      <Text style={{ color: "#0a0a0a", fontSize: 16, lineHeight: 1.6 }}>
        I remain eternally grateful for your imminent cooperation.
      </Text>
    </EmailTemplate>
  );
}

NewsletterConfirmationEmail.PreviewProps = {
  confirmationToken: "tkasnaAdfsaA",
  email: "cesar@cesalberca.com",
} satisfies ConfirmationEmailProps;
