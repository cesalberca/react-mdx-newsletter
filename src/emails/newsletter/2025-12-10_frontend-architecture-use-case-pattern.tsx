import { Text } from "@react-email/components"
import { NewsletterEmailLoader } from "@/email/delivery/newsletter-email-loader/newsletter-email-loader"

const FrontendArchitectureNewsletter = () => {
  return (
    <NewsletterEmailLoader
      slug="frontend-architecture-use-case-pattern"
      title='Use Cases: The "Only" Pattern you Need in Frontend Architecture'
      description="Learn about the Use Case pattern and how it can transform your frontend architecture"
    >
      <Text style={{ color: "#0a0a0a", fontSize: 16, lineHeight: 1.6 }}>
        The Use Case pattern is one of the most powerful tools in your architecture toolkit. It encapsulates business
        logic in a way that&apos;s testable, reusable, and framework-agnostic.
      </Text>
    </NewsletterEmailLoader>
  )
}

FrontendArchitectureNewsletter.title = 'Use Cases: The "Only" Pattern you Need in Frontend Architecture'

export default FrontendArchitectureNewsletter
