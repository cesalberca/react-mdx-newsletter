import { EmailTemplate } from "@/email/delivery/templates/email-template"
import { Text } from "@react-email/components"
import { Link } from "@/email/delivery/components/link/link"

interface ContactConfirmationEmailProps {
  name: string
}

export function ContactConfirmationEmail({ name }: ContactConfirmationEmailProps) {
  const baseUrl = process.env.NEXT_PUBLIC_URL ?? "http://localhost:3000"

  return (
    <EmailTemplate
      title="Thanks for reaching out!"
      description="I've received your message and I will get back to you as soon as possible."
    >
      <Text style={{ color: "#0a0a0a", fontSize: 16, lineHeight: 1.6 }}>Hey {name}!</Text>

      <Text style={{ color: "#0a0a0a", fontSize: 16, lineHeight: 1.6 }}>
        Thanks for reaching out through my <Link href={baseUrl}>website</Link>.{" "}
        <strong>I&apos;ve received your message</strong> and I&apos;ll get back to you{" "}
        <strong>as soon as I can</strong>.
      </Text>

      <Text style={{ color: "#0a0a0a", fontSize: 16, lineHeight: 1.6 }}>
        <strong>What happens next?</strong> I typically respond to messages within 24-48 hours during business days.
      </Text>

      <Text style={{ color: "#0a0a0a", fontSize: 16, lineHeight: 1.6 }}>
        Looking forward to <strong>connecting with you!</strong>
      </Text>
    </EmailTemplate>
  )
}

ContactConfirmationEmail.PreviewProps = {
  name: "Cesar",
} satisfies ContactConfirmationEmailProps
