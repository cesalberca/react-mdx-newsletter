import { Text, CodeBlock, dracula } from "@react-email/components"
import { NewsletterEmailLoader } from "@/email/delivery/newsletter-email-loader/newsletter-email-loader"

const BuildingASubscriptionSystem = () => {
  return (
    <NewsletterEmailLoader
      slug="building-a-subscription-system"
      title="Building a Double Opt-In Subscription System"
      description="Create a subscription flow with confirmation emails, token verification, and audience management"
    >
      <Text style={{ color: "#0a0a0a", fontSize: 16, lineHeight: 1.6 }}>
        A newsletter needs subscribers. The gold standard is double opt-in: the user enters their email,
        receives a confirmation link, and only gets added to your audience after clicking it.
      </Text>
      <Text style={{ color: "#0a0a0a", fontSize: 16, lineHeight: 1.6 }}>
        Here&apos;s the subscription API route. It generates a token and sends a confirmation email:
      </Text>
      <CodeBlock code={`// app/api/newsletter/route.ts
import { randomBytes } from "crypto"

export async function POST(request: Request) {
  const { email } = await request.json()

  // Generate a unique confirmation token
  const token = randomBytes(32).toString("hex")

  // Send confirmation email with the token
  await resend.emails.send({
    from: process.env.RESEND_EMAIL_FROM!,
    to: email,
    subject: "Confirm your subscription",
    html: \`<a href="\${baseUrl}/newsletter/confirm?token=\${token}&email=\${email}">
      Click here to confirm
    </a>\`,
  })

  return Response.json({ message: "Check your inbox!" })
}`} language="tsx" theme={dracula} />
      <Text style={{ color: "#0a0a0a", fontSize: 16, lineHeight: 1.6 }}>
        When the user clicks the link, a confirmation route verifies the token and adds them to your
        Resend audience using <strong>resend.contacts.create()</strong>. This keeps your list clean
        and ensures you only email people who actually want to hear from you.
      </Text>
      <Text style={{ color: "#0a0a0a", fontSize: 16, lineHeight: 1.6 }}>
        Next issue: now that we have subscribers, let&apos;s broadcast to all of them at once.
      </Text>
    </NewsletterEmailLoader>
  )
}

BuildingASubscriptionSystem.title = "Building a Double Opt-In Subscription System"

export default BuildingASubscriptionSystem
