import { Text, CodeBlock, dracula } from "@react-email/components"
import { NewsletterEmailLoader } from "@/email/delivery/newsletter-email-loader/newsletter-email-loader"

const SendingEmailsWithResend = () => {
  return (
    <NewsletterEmailLoader
      slug="sending-emails-with-resend"
      title="Sending Emails with the Resend API"
      description="Integrate Resend to deliver your newsletter emails reliably — API keys, audiences, and your first send"
    >
      <Text style={{ color: "#0a0a0a", fontSize: 16, lineHeight: 1.6 }}>
        Resend is a modern email API built for developers. Sign up at resend.com, grab your API key,
        and add it to your environment:
      </Text>
      <CodeBlock code={`# .env.local
RESEND_API_KEY=re_your_api_key_here
RESEND_EMAIL_FROM="Your Name <newsletter@yourdomain.com>"`} language="bash" theme={dracula} />
      <Text style={{ color: "#0a0a0a", fontSize: 16, lineHeight: 1.6 }}>
        Sending an email is just a few lines in a Next.js API route:
      </Text>
      <CodeBlock code={`import { Resend } from "resend"
import { render } from "@react-email/render"
import NewsletterEmail from "@/emails/newsletter-email"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  const html = await render(<NewsletterEmail />)

  const { data, error } = await resend.emails.send({
    from: process.env.RESEND_EMAIL_FROM!,
    to: "subscriber@example.com",
    subject: "Issue #4: Sending Emails",
    html,
  })

  if (error) return Response.json({ error }, { status: 400 })
  return Response.json({ id: data?.id })
}`} language="tsx" theme={dracula} />
      <Text style={{ color: "#0a0a0a", fontSize: 16, lineHeight: 1.6 }}>
        That&apos;s the core loop: write content in MDX, render it with React Email, and deliver it via Resend.
        But sending to one person isn&apos;t a newsletter — next issue, we&apos;ll build a proper subscription
        system with double opt-in.
      </Text>
    </NewsletterEmailLoader>
  )
}

SendingEmailsWithResend.title = "Sending Emails with the Resend API"

export default SendingEmailsWithResend
