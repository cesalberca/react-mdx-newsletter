import { render } from "@react-email/render";
import { notFound } from "next/navigation";
import type { ComponentType } from "react";
import { newsletters } from "@/app/newsletters/newsletters";
import LaunchingNewsletter from "@/newsletter/emails/newsletter/2026-04-19_launching-newsletter";
import { NewsletterThreadHeader } from "./thread-header";

const componentMap: Record<string, ComponentType> = {
  "launching-newsletter": LaunchingNewsletter,
};

export function generateStaticParams() {
  return Object.keys(componentMap).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<{ title: string }> {
  const { slug } = await params;
  const newsletter = newsletters.find((n) => n.slug === slug);
  if (!newsletter)
    return {
      title: "",
    };
  return { title: newsletter.title };
}

export default async function NewsletterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const newsletter = newsletters.find((n) => n.slug === slug);
  if (!newsletter) notFound();

  const Component = componentMap[slug];
  if (!Component) notFound();

  const currentIndex = newsletters.findIndex((n) => n.slug === slug);
  const prevSlug = currentIndex > 0 ? newsletters[currentIndex - 1].slug : null;
  const nextSlug =
    currentIndex < newsletters.length - 1
      ? newsletters[currentIndex + 1].slug
      : null;

  const html = await render(<Component />);

  return (
    <div className="bg-background min-h-full">
      <NewsletterThreadHeader
        title={newsletter.title}
        prevSlug={prevSlug}
        nextSlug={nextSlug}
      />
      <div className="max-w-[680px] mx-auto py-6 px-4">
        <div
          className="bg-white rounded-lg overflow-hidden"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted HTML rendered from React Email template
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}
