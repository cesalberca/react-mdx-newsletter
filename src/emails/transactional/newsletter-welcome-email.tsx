import type { FC } from "react"
import { Text } from "@react-email/components"
import { EmailTemplate } from "@/email/delivery/templates/email-template"
import { Link } from "@/email/delivery/components/link/link"

export const NewsletterWelcomeEmail: FC = () => {
  return (
    <EmailTemplate
      title="Welcome to the Newsletter!"
      description="I'm thrilled to welcome you to this newsletter."
    >
      <Text style={{ color: "#0a0a0a", fontSize: 16, lineHeight: 1.6 }}>
        I&apos;m thrilled you&apos;ve decided to sign up to this newsletter to learn about{" "}
        <strong>Frontend Architecture</strong> with me. With this step you are creating a future for yourself where
        you&apos;ll learn:
      </Text>

      <Text style={{ color: "#0a0a0a", fontSize: 16, lineHeight: 1.6 }}>
        - Applying use cases to unlock the full potential of your architecture
        <br />
        - Learning design patterns like Chain of Responsibility, Decorator, Command and more
        <br />
        - Integrating AI tools to maximize the quality of generated code
      </Text>

      <Text style={{ color: "#0a0a0a", fontSize: 16, lineHeight: 1.6 }}>
        If you really want to make sure you get the newsletter, I kindly ask to reply to this email with
        &quot;Hey Cesar&quot; to make sure it doesn&apos;t end up in Spam. It takes 10 seconds. Writing each newsletter
        takes me ~4 hours.
      </Text>

      <Text style={{ color: "#0a0a0a", fontSize: 16, lineHeight: 1.6 }}>
        Great, thank you very much! You&apos;ll now be receiving recurrent emails from me about{" "}
        <strong>Frontend Architecture</strong>. While I type away the next newsletter, you can read previous{" "}
        <Link href={`${process.env.NEXT_PUBLIC_URL ?? "http://localhost:3000"}/newsletter`}>newsletters here</Link>.
      </Text>
    </EmailTemplate>
  )
}

export default NewsletterWelcomeEmail
