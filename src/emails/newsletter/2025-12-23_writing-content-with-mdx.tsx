import { Text, CodeBlock, dracula } from "@react-email/components";
import { NewsletterEmailLoader } from "@/email/delivery/newsletter-email-loader/newsletter-email-loader";

const WritingContentWithMdx = () => {
  return (
    <NewsletterEmailLoader
      slug="writing-content-with-mdx"
      title="Writing Newsletter Content with MDX"
      description="How MDX lets you mix Markdown and React components to create rich, interactive newsletter content"
    >
      <Text style={{ color: "#0a0a0a", fontSize: 16, lineHeight: 1.6 }}>
        MDX is Markdown on steroids — you write prose in Markdown and drop in
        React components wherever you need something richer. Here&apos;s what a
        simple newsletter issue looks like as an MDX file:
      </Text>
      <CodeBlock
        code={`# Welcome to Issue 2

Regular **Markdown** works as expected.

But you can also use React components:

<Alert type="info">
  This is a custom alert component rendered
  inside your Markdown content!
</Alert>

\`\`\`tsx
// And code blocks with syntax highlighting
function greet(name: string) {
  return \`Hello, \${name}!\`
}
\`\`\``}
        language="markdown"
        theme={dracula}
      />
      <Text style={{ color: "#0a0a0a", fontSize: 16, lineHeight: 1.6 }}>
        To make this work, install the MDX packages and configure Next.js:
      </Text>
      <CodeBlock
        code={`npm install @next/mdx @mdx-js/loader @mdx-js/react`}
        language="bash"
        theme={dracula}
      />
      <Text style={{ color: "#0a0a0a", fontSize: 16, lineHeight: 1.6 }}>
        The real power comes from custom components. You can map any HTML
        element to a styled React component and reuse them across all your
        newsletter issues. Next time, we&apos;ll turn this MDX content into
        actual email templates using React Email.
      </Text>
    </NewsletterEmailLoader>
  );
};

WritingContentWithMdx.title = "Writing Newsletter Content with MDX";

export default WritingContentWithMdx;
