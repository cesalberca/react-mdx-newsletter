import { notFound } from "next/navigation"
import { render } from "@react-email/render"
import { newsletters } from "@/content/newsletters"
import { NewsletterThreadHeader } from "./thread-header"

import WelcomeAndProjectSetup from "@/emails/newsletter/2025-12-09_welcome-and-project-setup"
import WritingContentWithMdx from "@/emails/newsletter/2025-12-23_writing-content-with-mdx"
import DesigningEmailTemplates from "@/emails/newsletter/2026-01-06_designing-email-templates"
import SendingEmailsWithResend from "@/emails/newsletter/2026-01-20_sending-emails-with-resend"
import BuildingASubscriptionSystem from "@/emails/newsletter/2026-02-03_building-a-subscription-system"
import BroadcastingToYourAudience from "@/emails/newsletter/2026-02-17_broadcasting-to-your-audience"
import AddingAGmailStyleUi from "@/emails/newsletter/2026-03-03_adding-a-gmail-style-ui"

const componentMap: Record<string, React.ComponentType> = {
  "welcome-and-project-setup": WelcomeAndProjectSetup,
  "writing-content-with-mdx": WritingContentWithMdx,
  "designing-email-templates": DesigningEmailTemplates,
  "sending-emails-with-resend": SendingEmailsWithResend,
  "building-a-subscription-system": BuildingASubscriptionSystem,
  "broadcasting-to-your-audience": BroadcastingToYourAudience,
  "adding-a-gmail-style-ui": AddingAGmailStyleUi,
}

export function generateStaticParams() {
  return newsletters.map((n) => ({ slug: n.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const newsletter = newsletters.find((n) => n.slug === slug)
  if (!newsletter) return {}
  return { title: newsletter.title }
}

export default async function NewsletterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const newsletter = newsletters.find((n) => n.slug === slug)
  if (!newsletter) notFound()

  const Component = componentMap[slug]
  if (!Component) notFound()

  const currentIndex = newsletters.findIndex((n) => n.slug === slug)
  const prevSlug = currentIndex > 0 ? newsletters[currentIndex - 1].slug : null
  const nextSlug = currentIndex < newsletters.length - 1 ? newsletters[currentIndex + 1].slug : null

  const html = await render(<Component />)

  return (
    <div style={{ backgroundColor: "var(--bg-primary)", minHeight: "100%" }}>
      <NewsletterThreadHeader
        title={newsletter.title}
        prevSlug={prevSlug}
        nextSlug={nextSlug}
      />
      <div
        style={{
          maxWidth: 680,
          margin: "0 auto",
          padding: "24px 16px",
        }}
      >
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: 8,
            overflow: "hidden",
          }}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  )
}
