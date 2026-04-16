import { Text, CodeBlock, dracula } from "@react-email/components";
import { NewsletterEmailLoader } from "@/email/delivery/newsletter-email-loader/newsletter-email-loader";

const BroadcastingToYourAudience = () => {
  return (
    <NewsletterEmailLoader
      slug="broadcasting-to-your-audience"
      title="Broadcasting Newsletters to Your Audience"
      description="Build a broadcast API that renders MDX content into HTML and sends it to all confirmed subscribers"
    >
      <Text style={{ color: "#0a0a0a", fontSize: 16, lineHeight: 1.6 }}>
        Sending one-off emails is fine, but a newsletter needs broadcasts — a
        single send that goes to your entire audience. Resend&apos;s Broadcasts
        API handles this elegantly.
      </Text>
      <Text style={{ color: "#0a0a0a", fontSize: 16, lineHeight: 1.6 }}>
        Here&apos;s the broadcast API route. It dynamically imports a newsletter
        template by slug, renders it to HTML, and creates a broadcast:
      </Text>
      <CodeBlock
        code={`// app/api/newsletter/broadcast/route.ts
export async function POST(request: Request) {
  const { newsletterSlug, token } = await request.json()

  // Verify the broadcast token (simple auth)
  if (token !== process.env.NEWSLETTER_BROADCAST_TOKEN) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Dynamically import the newsletter component
  const mod = await import(\`@/emails/newsletter/\${newsletterSlug}.tsx\`)
  const Newsletter = mod.default
  const html = await render(<Newsletter />)

  // Create and send the broadcast
  const broadcast = await resend.broadcasts.create({
    audienceId: AUDIENCE_ID,
    from: process.env.RESEND_EMAIL_FROM!,
    subject: Newsletter.title,
    html,
  })

  await resend.broadcasts.send(broadcast.data!.id)
  return Response.json({ broadcastId: broadcast.data!.id })
}`}
        language="tsx"
        theme={dracula}
      />
      <Text style={{ color: "#0a0a0a", fontSize: 16, lineHeight: 1.6 }}>
        The dynamic import is key — it means you can add new newsletter issues
        as files and broadcast them without changing any code. Protect this
        endpoint with a secret token so only you can trigger sends.
      </Text>
      <Text style={{ color: "#0a0a0a", fontSize: 16, lineHeight: 1.6 }}>
        In the final issue, we&apos;ll build a Gmail-style UI to tie everything
        together with a polished frontend.
      </Text>
    </NewsletterEmailLoader>
  );
};

BroadcastingToYourAudience.title = "Broadcasting Newsletters to Your Audience";

export default BroadcastingToYourAudience;
