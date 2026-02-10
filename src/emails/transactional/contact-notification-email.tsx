import { EmailTemplate } from "@/email/delivery/templates/email-template"
import { Text, Hr } from "@react-email/components"

interface ContactNotificationEmailProps {
  name: string
  email: string
  message: string
  date: string
}

export function ContactNotificationEmail({ name, email, message, date }: ContactNotificationEmailProps) {
  return (
    <EmailTemplate
      title="New Contact Form Submission"
      description={`You have received a new contact form submission from ${name}.`}
    >
      <Text style={{ color: "#0a0a0a", fontSize: 16, lineHeight: 1.6 }}>
        You have received a new message through your contact form:
      </Text>

      <Text style={{ color: "#0a0a0a", fontSize: 16, lineHeight: 1.6 }}>
        <strong>From:</strong> {name}
        <br />
        <strong>Email:</strong> {email}
        <br />
        <strong>Date:</strong> {date}
      </Text>

      <Text style={{ color: "#0a0a0a", fontSize: 16, lineHeight: 1.6 }}>
        <strong>Message:</strong>
        <br />
        {message}
      </Text>

      <Hr style={{ borderColor: "#e5e5e5", margin: "16px 0" }} />

      <Text style={{ color: "#0a0a0a", fontSize: 16, lineHeight: 1.6 }}>
        You can reply directly to this email to respond to {name}.
      </Text>
    </EmailTemplate>
  )
}

ContactNotificationEmail.PreviewProps = {
  name: "Cesar",
  email: "cesar@cesalberca.com",
  message: "Hello",
  date: "2025-04-15",
} satisfies ContactNotificationEmailProps
