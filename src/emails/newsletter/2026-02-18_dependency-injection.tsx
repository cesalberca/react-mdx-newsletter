import { Text } from "@react-email/components"
import { NewsletterEmailLoader } from "@/email/delivery/newsletter-email-loader/newsletter-email-loader"

const FrontendArchitectureNewsletter = () => {
  return (
    <NewsletterEmailLoader
      slug="understanding-dependency-injection"
      title="Understanding Dependency Injection"
      description="A practical guide to Dependency Injection in frontend applications"
    >
      <Text style={{ color: "#0a0a0a", fontSize: 16, lineHeight: 1.6 }}>
        Dependency Injection is often associated with backend frameworks, but it&apos;s equally powerful in frontend
        applications. Learn how to decouple your components and make them truly testable.
      </Text>
    </NewsletterEmailLoader>
  )
}

FrontendArchitectureNewsletter.title = "Understanding Dependency Injection"

export default FrontendArchitectureNewsletter
