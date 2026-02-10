import { Text } from "@react-email/components"
import { NewsletterEmailLoader } from "@/email/delivery/newsletter-email-loader/newsletter-email-loader"

const FrontendArchitectureNewsletter = () => {
  return (
    <NewsletterEmailLoader
      slug="use-case-options-for-advanced-middlewares"
      title="Use Case Options for Advanced Middlewares"
      description="Configure use cases with advanced middleware options"
    >
      <Text style={{ color: "#0a0a0a", fontSize: 16, lineHeight: 1.6 }}>
        Use Case Options allow you to configure middleware behavior per use case execution. This gives you fine-grained
        control over caching, logging, error handling, and more.
      </Text>
    </NewsletterEmailLoader>
  )
}

FrontendArchitectureNewsletter.title = "Use Case Options for Advanced Middlewares"

export default FrontendArchitectureNewsletter
