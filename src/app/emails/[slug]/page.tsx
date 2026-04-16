import { notFound } from "next/navigation";
import Welcome from "@/content/01-welcome.mdx";
import Architecture from "@/content/02-architecture.mdx";
import Rendering from "@/content/03-rendering.mdx";
import LayoutTraps from "@/content/04-layout-traps.mdx";
import Cicd from "@/content/05-cicd.mdx";
import Gotchas from "@/content/06-gotchas.mdx";
import Closing from "@/content/07-closing.mdx";
import NewsletterPromo from "@/content/08-newsletter-promo.mdx";
import ServicesPromo from "@/content/09-services-promo.mdx";
import { sections } from "@/content/sections";
import { MarkAsRead } from "@/core/components/gmail/mark-as-read";
import { ThreadHeader } from "./thread-header";
import { ThreadMessages } from "./thread-messages";

const mdxMap: Record<string, React.ComponentType> = {
  welcome: Welcome,
  architecture: Architecture,
  rendering: Rendering,
  "layout-traps": LayoutTraps,
  cicd: Cicd,
  gotchas: Gotchas,
  closing: Closing,
  "newsletter-promo": NewsletterPromo,
  "services-promo": ServicesPromo,
};

export function generateStaticParams() {
  return sections.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const section = sections.find((s) => s.slug === slug);
  if (!section) return {};
  return { title: section.subject };
}

export default async function EmailThreadPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const section = sections.find((s) => s.slug === slug);
  if (!section) notFound();

  const MDXContent = mdxMap[slug];
  if (!MDXContent) notFound();

  const folderSections = sections.filter((s) => s.folder === section.folder);
  const currentIndex = folderSections.findIndex((s) => s.slug === slug);
  const prevSlug =
    currentIndex > 0 ? folderSections[currentIndex - 1].slug : null;
  const nextSlug =
    currentIndex < folderSections.length - 1
      ? folderSections[currentIndex + 1].slug
      : null;
  const backHref = section.folder === "spam" ? "/spam" : "/";

  return (
    <div style={{ backgroundColor: "var(--bg-primary)", minHeight: "100%" }}>
      <MarkAsRead slug={slug} />
      <ThreadHeader
        section={section}
        prevSlug={prevSlug}
        nextSlug={nextSlug}
        backHref={backHref}
      />
      <ThreadMessages section={section}>
        <MDXContent />
      </ThreadMessages>
    </div>
  );
}
