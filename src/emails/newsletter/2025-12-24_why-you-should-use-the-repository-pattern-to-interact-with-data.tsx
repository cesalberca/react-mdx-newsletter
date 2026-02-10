import { Text } from "@react-email/components"
import { NewsletterEmailLoader } from "@/email/delivery/newsletter-email-loader/newsletter-email-loader"

const FrontendArchitectureNewsletter = () => {
  return (
    <NewsletterEmailLoader
      slug="why-you-should-use-the-repository-pattern-to-interact-with-data"
      title="Why You Should Use The Repository Pattern to Interact with Data"
      description="Learn how the Repository pattern can decouple your data access layer"
    >
      <Text style={{ color: "#0a0a0a", fontSize: 16, lineHeight: 1.6 }}>
        The Repository pattern creates an abstraction layer between your business logic and data access. This makes your
        code more testable and allows you to swap data sources without changing your application logic.
      </Text>
    </NewsletterEmailLoader>
  )
}

FrontendArchitectureNewsletter.title = "Why You Should Use The Repository Pattern to Interact with Data"

export default FrontendArchitectureNewsletter
