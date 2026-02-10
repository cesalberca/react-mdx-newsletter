import { Text } from "@react-email/components"
import { NewsletterEmailLoader } from "@/email/delivery/newsletter-email-loader/newsletter-email-loader"

const FrontendArchitectureNewsletter = () => {
  return (
    <NewsletterEmailLoader
      slug="run-use-cases-using-the-command-pattern"
      title="Run Use Cases Using The Command Pattern"
      description="Learn how to execute use cases with the Command pattern for better decoupling"
    >
      <Text style={{ color: "#0a0a0a", fontSize: 16, lineHeight: 1.6 }}>
        The Command pattern turns requests into standalone objects, allowing you to parameterize, queue, and log
        operations. When combined with Use Cases, it creates a powerful execution pipeline.
      </Text>
    </NewsletterEmailLoader>
  )
}

FrontendArchitectureNewsletter.title = "Run Use Cases Using The Command Pattern"

export default FrontendArchitectureNewsletter
