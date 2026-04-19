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
  const baseUrl = process.env.NEXT_PUBLIC_URL ?? "http://localhost:3000";
  const confirmationUrl = `${baseUrl}/newsletter/confirm?token=${confirmationToken}&email=${encodeURIComponent(email)}`;

  return (
    <EmailTemplate
      title="Confirm your newsletter subscription"
      description="Just one click away from joining the Frontend Architecture newsletter community!"
    >
      <Text style={{ color: "#0a0a0a", fontSize: 16, lineHeight: 1.6 }}>
        Hey!
      </Text>

      <Text style={{ color: "#0a0a0a", fontSize: 16, lineHeight: 1.6 }}>
        <strong>Why you got this email</strong>: Your email has been submitted
        in the signup form.
      </Text>

      <Text style={{ color: "#0a0a0a", fontSize: 16, lineHeight: 1.6 }}>
        If you didn&apos;t sign up, you don&apos;t need to worry at all, feel
        free to ignore this email and you won&apos;t get another email from me.
      </Text>

      <Text style={{ color: "#0a0a0a", fontSize: 16, lineHeight: 1.6 }}>
        <strong>What you need to do</strong>: If you <em>did</em> sign up and
        want to join the Frontend Architecture Newsletter, just click the button
        below to confirm.
      </Text>

      <Container style={{ textAlign: "center", width: "66%" }}>
        <EmailButton link={confirmationUrl}>
          Confirm the subscription
        </EmailButton>
        <Text style={{ fontSize: 12 }}>
          Or copy and paste this link in your browser:
          <br />
          <EmailLink href={confirmationUrl}>{confirmationUrl}</EmailLink>
        </Text>
      </Container>

      <Text style={{ color: "#0a0a0a", fontSize: 16, lineHeight: 1.6 }}>
        Looking forward to sharing some <em>great</em>{" "}
        <strong>frontend architecture</strong> insights with you!
      </Text>
    </EmailTemplate>
  );
}

NewsletterConfirmationEmail.PreviewProps = {
  confirmationToken: "tkasnaAdfsaA",
  email: "cesar@cesalberca.com",
} satisfies ConfirmationEmailProps;
