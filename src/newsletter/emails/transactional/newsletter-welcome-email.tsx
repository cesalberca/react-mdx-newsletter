import { Text } from "@react-email/components";
import type { FC } from "react";
import { EmailLink } from "@/newsletter/mdx/email/email-link";
import { EmailTemplate } from "@/newsletter/templates/email-template";

export const NewsletterWelcomeEmail: FC = () => {
  return (
    <EmailTemplate
      title="The Inheritance Has Been Transferred"
      description="Your identity has been verified. The vault is open."
    >
      <Text style={{ color: "#0a0a0a", fontSize: 16, lineHeight: 1.6 }}>
        Dear Esteemed Friend,
      </Text>

      <Text style={{ color: "#0a0a0a", fontSize: 16, lineHeight: 1.6 }}>
        The transfer is complete. Your identity has been verified and your
        rightful inheritance has been released from the vault. The first
        dispatch will reach you shortly.
      </Text>

      <Text style={{ color: "#0a0a0a", fontSize: 16, lineHeight: 1.6 }}>
        To ensure the inheritance does not end up in the spam vault, I kindly
        request you reply to this email with &quot;I accept the transfer&quot;.
        It takes 10 seconds. Each issue takes me approximately 4 hours to
        prepare.
      </Text>

      <Text style={{ color: "#0a0a0a", fontSize: 16, lineHeight: 1.6 }}>
        While I prepare the next dispatch, you may review previous issues{" "}
        <EmailLink
          href={`${process.env.NEXT_PUBLIC_URL ?? "http://localhost:3000"}/newsletters`}
        >
          in the archive
        </EmailLink>
        .
      </Text>

      <Text style={{ color: "#0a0a0a", fontSize: 16, lineHeight: 1.6 }}>
        I remain eternally grateful for your cooperation.
      </Text>
    </EmailTemplate>
  );
};

export default NewsletterWelcomeEmail;
