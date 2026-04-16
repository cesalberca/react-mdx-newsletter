import { Text, CodeBlock, dracula } from "@react-email/components";
import { NewsletterEmailLoader } from "@/email/delivery/newsletter-email-loader/newsletter-email-loader";

const DesigningEmailTemplates = () => {
  return (
    <NewsletterEmailLoader
      slug="designing-email-templates"
      title="Designing Email Templates with React Email"
      description="Build beautiful, responsive email layouts using @react-email/components that render perfectly in every inbox"
    >
      <Text style={{ color: "#0a0a0a", fontSize: 16, lineHeight: 1.6 }}>
        Email HTML is notoriously painful — inline styles, table layouts, and
        quirks across dozens of clients. React Email abstracts all of that away
        with a set of battle-tested components.
      </Text>
      <Text style={{ color: "#0a0a0a", fontSize: 16, lineHeight: 1.6 }}>
        Here&apos;s a minimal newsletter template:
      </Text>
      <CodeBlock
        code={`import {
  Html, Head, Body, Container,
  Section, Text, Link, Hr
} from "@react-email/components"

export default function NewsletterEmail() {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: "#f6f9fc", fontFamily: "sans-serif" }}>
        <Container style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>
            Issue #3: Email Templates
          </Text>
          <Hr />
          <Section>
            <Text>Your newsletter content goes here...</Text>
          </Section>
          <Hr />
          <Text style={{ fontSize: 12, color: "#999" }}>
            <Link href="{{{RESEND_UNSUBSCRIBE_URL}}}">Unsubscribe</Link>
          </Text>
        </Container>
      </Body>
    </Html>
  )
}`}
        language="tsx"
        theme={dracula}
      />
      <Text style={{ color: "#0a0a0a", fontSize: 16, lineHeight: 1.6 }}>
        The <strong>render()</strong> function from{" "}
        <strong>@react-email/render</strong> converts this JSX into email-safe
        HTML with all the right inline styles. Preview your templates locally
        with <strong>npx email dev</strong> before sending them to real inboxes.
        Next up: actually sending these emails with the Resend API.
      </Text>
    </NewsletterEmailLoader>
  );
};

DesigningEmailTemplates.title = "Designing Email Templates with React Email";

export default DesigningEmailTemplates;
