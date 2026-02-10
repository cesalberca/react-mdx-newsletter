import { Text } from "@react-email/components"
import { NewsletterEmailLoader } from "@/email/delivery/newsletter-email-loader/newsletter-email-loader"

const FrontendArchitectureNewsletter = () => {
  return (
    <NewsletterEmailLoader
      slug="middlewares-and-chain-of-responsibility-pattern"
      title="Middlewares and The Chain of Responsibility Pattern"
      description="How middlewares implement the Chain of Responsibility pattern"
    >
      <Text style={{ color: "#0a0a0a", fontSize: 16, lineHeight: 1.6 }}>
        Middlewares are everywhere in modern web development. Under the hood, they implement the Chain of Responsibility
        pattern — each handler decides whether to process the request or pass it along.
      </Text>
    </NewsletterEmailLoader>
  )
}

FrontendArchitectureNewsletter.title = "Middlewares and The Chain of Responsibility Pattern"

export default FrontendArchitectureNewsletter
