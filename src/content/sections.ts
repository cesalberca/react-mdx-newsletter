export interface Section {
  slug: string;
  sender: string;
  senderEmail: string;
  subject: string;
  preview: string;
  date: string;
  unread: boolean;
  starred: boolean;
  folder: "inbox" | "spam";
}

export const sections: Section[] = [
  {
    slug: "welcome",
    sender: "Prince MDX",
    senderEmail: "prince.mdx@royalnewsletter.ng",
    subject: "URGENT: You Have Been Selected to Inherit MDX Newsletter Fortune",
    preview:
      "Dear Beloved Developer, I am Prince MDX, son of the late King Markdown...",
    date: "9:07 AM",
    unread: true,
    starred: true,
    folder: "inbox",
  },
  {
    slug: "architecture",
    sender: "Dr. Archi Tecture",
    senderEmail: "dr.architecture@newsletter-blueprints.com",
    subject: "RE: Your Newsletter Blueprint Is Ready for Review",
    preview:
      "I have completed the architectural analysis of your newsletter system...",
    date: "10:02 AM",
    unread: true,
    starred: false,
    folder: "inbox",
  },
  {
    slug: "rendering",
    sender: "React Email Support",
    senderEmail: "support@react.email",
    subject: "Your Email Rendering Report Is Ready",
    preview:
      "Your rendering diagnostics are complete. We found several compatibility...",
    date: "11:04 AM",
    unread: true,
    starred: false,
    folder: "inbox",
  },
  {
    slug: "cicd",
    sender: "GitHub Actions Bot",
    senderEmail: "noreply@github.com",
    subject: "Your Workflow Run Has Completed Successfully",
    preview:
      "newsletter-pipeline (main) - All jobs passed. Build, preview, send...",
    date: "1:13 PM",
    unread: false,
    starred: false,
    folder: "inbox",
  },
  {
    slug: "gotchas",
    sender: "Bankruptcy Prevention Bureau",
    senderEmail: "urgent@bpb.org",
    subject: "URGENT: Critical Issues Found in Your Email System",
    preview:
      "Our analysis has revealed critical issues that may cause total system...",
    date: "2:06 PM",
    unread: true,
    starred: true,
    folder: "inbox",
  },
  {
    slug: "closing",
    sender: "César Alberca",
    senderEmail: "cesar@cesaralberca.com",
    subject: "My Newsletter + Thank You",
    preview:
      "Thanks for attending! Here's where to find my newsletter and resources...",
    date: "3:08 PM",
    unread: false,
    starred: false,
    folder: "inbox",
  },
  {
    slug: "newsletter-promo",
    sender: "César's Newsletter Bot",
    senderEmail: "noreply@totally-not-spam.cesalberca.com",
    subject:
      "🔥 YOU WON'T BELIEVE These Frontend Architecture Secrets — Subscribe NOW!!!",
    preview:
      "CONGRATULATIONS! You've been selected to receive EXCLUSIVE frontend tips...",
    date: "11:47 AM",
    unread: true,
    starred: false,
    folder: "spam",
  },
  {
    slug: "services-promo",
    sender: "César's Consulting Agency",
    senderEmail: "deals@definitely-legit-consulting.cesalberca.com",
    subject:
      "⚡ LIMITED TIME: 10x Your Frontend Architecture — ACT FAST Before Offer Expires!!!",
    preview:
      "Dear Lucky Developer, for a LIMITED TIME ONLY, world-renowned consultant...",
    date: "11:53 AM",
    unread: true,
    starred: false,
    folder: "spam",
  },
];

export const inboxSections = sections.filter((s) => s.folder === "inbox");
export const spamSections = sections.filter((s) => s.folder === "spam");
