import { render } from "@react-email/render";
import { notFound } from "next/navigation";
import type { ComponentType } from "react";
import { newsletters } from "@/app/newsletters/newsletters";
import BuildingASubscriptionSystem from "@/newsletter/emails/newsletter/2026-02-03_building-a-subscription-system";
import BroadcastingToYourAudience from "@/newsletter/emails/newsletter/2026-02-17_broadcasting-to-your-audience";
import { NewsletterThreadHeader } from "./thread-header";

const componentMap: Record<string, ComponentType> = {
  "building-a-subscription-system": BuildingASubscriptionSystem,
  "broadcasting-to-your-audience": BroadcastingToYourAudience,
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
    <div style={{ backgroundColor: "var(--bg-primary)", minHeight: "100%" }}>
      <NewsletterThreadHeader
        title={newsletter.title}
        prevSlug={prevSlug}
        nextSlug={nextSlug}
      />
      <div
        style={{
          maxWidth: 680,
          margin: "0 auto",
          padding: "24px 16px",
        }}
      >
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: 8,
            overflow: "hidden",
          }}
          // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted HTML rendered from React Email template
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}
