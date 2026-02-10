import { Text, CodeBlock, dracula } from "@react-email/components"
import { NewsletterEmailLoader } from "@/email/delivery/newsletter-email-loader/newsletter-email-loader"

const AddingAGmailStyleUi = () => {
  return (
    <NewsletterEmailLoader
      slug="adding-a-gmail-style-ui"
      title="Adding a Gmail-Style Presentation UI"
      description="Wrap your newsletter in a Gmail-inspired interface with a sidebar, inbox, and compose dialog"
    >
      <Text style={{ color: "#0a0a0a", fontSize: 16, lineHeight: 1.6 }}>
        The final touch: a presentation layer. We&apos;ll build a Gmail-inspired interface so readers can
        browse newsletter issues in a familiar inbox-style layout.
      </Text>
      <Text style={{ color: "#0a0a0a", fontSize: 16, lineHeight: 1.6 }}>
        The architecture is simple — a sidebar with navigation, a list of issues pulled from a
        <strong> newsletters.ts</strong> config, and MDX-rendered content for each issue:
      </Text>
      <CodeBlock code={`// src/content/newsletters.ts
export const newsletters = [
  {
    slug: "welcome-and-project-setup",
    title: "Welcome! Let's Build a Newsletter from Scratch",
    description: "Setting up a Next.js project with MDX...",
    date: "Dec 9",
    filename: "2025-12-09_welcome-and-project-setup",
  },
  // ...more issues
]

// src/app/newsletters/[slug]/page.tsx
export default async function NewsletterPage({ params }) {
  const { slug } = await params
  const newsletter = newsletters.find(n => n.slug === slug)
  // Dynamically import and render the MDX content
  const { default: Content } = await import(
    \`@/app/newsletters/\${newsletter.filename}.mdx\`
  )
  return <Content />
}`} language="tsx" theme={dracula} />
      <Text style={{ color: "#0a0a0a", fontSize: 16, lineHeight: 1.6 }}>
        Add a Compose dialog that calls your broadcast API, a QR code widget so audience members can subscribe
        on the spot, and dark mode support with CSS custom properties. You now have a complete, end-to-end
        newsletter system built entirely with React, MDX, and Resend.
      </Text>
      <Text style={{ color: "#0a0a0a", fontSize: 16, lineHeight: 1.6 }}>
        That&apos;s a wrap! You&apos;ve gone from zero to a fully functional newsletter.
        Fork the repo, swap in your own content, and start shipping.
      </Text>
    </NewsletterEmailLoader>
  )
}

AddingAGmailStyleUi.title = "Adding a Gmail-Style Presentation UI"

export default AddingAGmailStyleUi
