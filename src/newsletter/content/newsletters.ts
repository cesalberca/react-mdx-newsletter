export interface Newsletter {
  slug: string;
  title: string;
  description: string;
  date: string;
  filename: string;
}

export const newsletters: Newsletter[] = [
  {
    slug: "welcome-and-project-setup",
    title: "Welcome! Let's Build a Newsletter from Scratch",
    description:
      "Setting up a Next.js project with MDX, React Email, and Resend — everything you need to ship your own newsletter",
    date: "Dec 9",
    filename: "2025-12-09_welcome-and-project-setup",
  },
  {
    slug: "writing-content-with-mdx",
    title: "Writing Newsletter Content with MDX",
    description:
      "How MDX lets you mix Markdown and React components to create rich, interactive newsletter content",
    date: "Dec 23",
    filename: "2025-12-23_writing-content-with-mdx",
  },
  {
    slug: "designing-email-templates",
    title: "Designing Email Templates with React Email",
    description:
      "Build beautiful, responsive email layouts using @react-email/components that render perfectly in every inbox",
    date: "Jan 6",
    filename: "2026-01-06_designing-email-templates",
  },
  {
    slug: "sending-emails-with-resend",
    title: "Sending Emails with the Resend API",
    description:
      "Integrate Resend to deliver your newsletter emails reliably — API keys, audiences, and your first send",
    date: "Jan 20",
    filename: "2026-01-20_sending-emails-with-resend",
  },
  {
    slug: "building-a-subscription-system",
    title: "Building a Double Opt-In Subscription System",
    description:
      "Create a subscription flow with confirmation emails, token verification, and audience management",
    date: "Feb 3",
    filename: "2026-02-03_building-a-subscription-system",
  },
  {
    slug: "broadcasting-to-your-audience",
    title: "Broadcasting Newsletters to Your Audience",
    description:
      "Build a broadcast API that renders MDX content into HTML and sends it to all confirmed subscribers",
    date: "Feb 17",
    filename: "2026-02-17_broadcasting-to-your-audience",
  },
  {
    slug: "adding-a-gmail-style-ui",
    title: "Adding a Gmail-Style Presentation UI",
    description:
      "Wrap your newsletter in a Gmail-inspired interface with a sidebar, inbox, and compose dialog",
    date: "Mar 3",
    filename: "2026-03-03_adding-a-gmail-style-ui",
  },
];
