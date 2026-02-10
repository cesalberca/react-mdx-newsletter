import { Text } from "@react-email/components"
import { NewsletterEmailLoader } from "@/email/delivery/newsletter-email-loader/newsletter-email-loader"

const FrontendArchitectureNewsletter = () => {
  return (
    <NewsletterEmailLoader
      slug="launching-frontend-architecture-newsletter"
      title="Launching The Frontend Architecture Newsletter"
      description="Welcome to the first issue of the Frontend Architecture Newsletter"
    >
      <Text style={{ color: "#0a0a0a", fontSize: 16, lineHeight: 1.6 }}>
        Welcome to the very first issue of the Frontend Architecture Newsletter! I&apos;m excited to share insights
        about building scalable, maintainable frontend applications.
      </Text>
      <Text style={{ color: "#0a0a0a", fontSize: 16, lineHeight: 1.6 }}>
        In this newsletter, we&apos;ll cover topics like design patterns, architecture decisions, and practical tips
        for building better frontends.
      </Text>
    </NewsletterEmailLoader>
  )
}

FrontendArchitectureNewsletter.title = "Launching The Frontend Architecture Newsletter"

export default FrontendArchitectureNewsletter
