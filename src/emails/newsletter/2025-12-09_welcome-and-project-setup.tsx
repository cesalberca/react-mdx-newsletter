import { Text, CodeBlock, dracula } from "@react-email/components";
import { NewsletterEmailLoader } from "@/email/delivery/newsletter-email-loader/newsletter-email-loader";

const WelcomeAndProjectSetup = () => {
  return (
    <NewsletterEmailLoader
      slug="welcome-and-project-setup"
      title="Welcome! Let's Build a Newsletter from Scratch"
      description="Setting up a Next.js project with MDX, React Email, and Resend — everything you need to ship your own newsletter"
    >
      <Text style={{ color: "#0a0a0a", fontSize: 16, lineHeight: 1.6 }}>
        Welcome to the first issue! Over the next seven issues, you&apos;ll
        build a complete newsletter system — from writing content in MDX all the
        way to sending beautifully rendered emails to your subscribers.
      </Text>
      <Text style={{ color: "#0a0a0a", fontSize: 16, lineHeight: 1.6 }}>
        Let&apos;s start by scaffolding the project. We&apos;ll use Next.js as
        the foundation since it gives us server-side rendering, API routes, and
        a great developer experience out of the box:
      </Text>
      <CodeBlock
        code={`npx create-next-app@latest my-newsletter --typescript --app
cd my-newsletter
npm install @react-email/components resend`}
        language="bash"
        theme={dracula}
      />
      <Text style={{ color: "#0a0a0a", fontSize: 16, lineHeight: 1.6 }}>
        That&apos;s three packages doing the heavy lifting: Next.js for the web
        app,
        <strong> @react-email/components</strong> for building email templates
        with React, and
        <strong> resend</strong> for actually delivering the emails.
      </Text>
      <Text style={{ color: "#0a0a0a", fontSize: 16, lineHeight: 1.6 }}>
        Next issue, we&apos;ll dive into MDX and see how mixing Markdown with
        React components lets you write rich newsletter content without leaving
        your editor.
      </Text>
    </NewsletterEmailLoader>
  );
};

WelcomeAndProjectSetup.title = "Welcome! Let's Build a Newsletter from Scratch";

export default WelcomeAndProjectSetup;
