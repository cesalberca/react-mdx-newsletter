import {
  Column,
  Container,
  Img,
  Link,
  Row,
  Section,
  Text,
} from "@react-email/components";
import type { FC, PropsWithChildren } from "react";
import { emailImageBaseUrl } from "@/newsletter/email-image-base-url";
import { EmailTemplate } from "./email-template";

interface NewsletterEmailProps {
  title: string;
  description: string;
  browserUrl: string;
}

export const NewsletterTemplate: FC<
  PropsWithChildren<NewsletterEmailProps>
> = ({ title, description, children, browserUrl }) => {
  const baseUrl = process.env.NEXT_PUBLIC_URL ?? "http://localhost:3000";
  const urlToShare = `${baseUrl}/newsletters/${browserUrl}`;
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(urlToShare);

  const socialMedia = [
    {
      href: `https://x.com/intent/tweet?text=${encodedTitle} ${encodedUrl} by @cesalberca`,
      name: "X/Twitter",
      icon: "/email-static/x.png",
    },
    {
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}`,
      name: "LinkedIn",
      icon: "/email-static/linkedin.png",
    },
    {
      href: `https://bsky.app/intent/compose?text=${encodedTitle} ${encodedUrl} by @cesalberca.com`,
      name: "Bluesky",
      icon: "/email-static/bluesky.png",
    },
    {
      href: `mailto:?subject=${encodedTitle}&body=Check out this newsletter: ${encodedUrl}`,
      name: "Email",
      icon: "/email-static/email.png",
    },
  ];

  return (
    <EmailTemplate
      title={title}
      description={description}
      browserUrl={urlToShare}
      footer={
        <Container className="w-2/3 mx-auto">
          <Text className="text-muted-foreground text-xs mb-0 text-center leading-relaxed">
            You&apos;re receiving this email because you subscribed voluntarily
            and confirmed it by clicking a link in a verification email.
          </Text>
        </Container>
      }
    >
      {children}

      <Section className="mt-12">
        <Text className="text-foreground mb-4 mt-0 text-center text-lg font-medium">
          Help me by sharing this newsletter
        </Text>

        <Row>
          {socialMedia.map((x) => (
            <Column key={x.name} className="text-center">
              <Img
                alt={x.name}
                src={emailImageBaseUrl(x.icon)}
                width="32"
                height="32"
                className="inline-block mx-auto"
              />
              <Link
                href={x.href}
                className="text-muted-foreground text-xs no-underline block"
              >
                {x.name}
              </Link>
            </Column>
          ))}
        </Row>

        <Container className="mt-8">
          <Text className="text-xs text-center">
            Found a <em>typo</em>? The email doesn&apos;t render{" "}
            <em>correctly</em> in your email client? Have <em>any</em> feedback?
            Please, <strong>feel free to reply to this email</strong> and
            I&apos;ll get back to you <strong>as soon as I can</strong>.{" "}
            <span className="underline">Thank you!</span>
          </Text>
        </Container>
      </Section>
    </EmailTemplate>
  );
};
