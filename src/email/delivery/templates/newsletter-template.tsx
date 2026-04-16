import { EmailTemplate } from "./email-template";
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
import { emailImageBaseUrl } from "@/lib/email-image-base-url";

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
      icon: "x.png",
    },
    {
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}`,
      name: "LinkedIn",
      icon: "linkedin.png",
    },
    {
      href: `https://bsky.app/intent/compose?text=${encodedTitle} ${encodedUrl} by @cesalberca.com`,
      name: "Bluesky",
      icon: "bluesky.png",
    },
    {
      href: `mailto:?subject=${encodedTitle}&body=Check out this newsletter: ${encodedUrl}`,
      name: "Email",
      icon: "email.png",
    },
  ];

  return (
    <EmailTemplate
      title={title}
      description={description}
      browserUrl={urlToShare}
      footer={
        <Container style={{ width: "66%", margin: "0 auto" }}>
          <Text
            style={{
              color: "#737373",
              fontSize: 12,
              marginBottom: 0,
              textAlign: "center",
              lineHeight: 1.6,
            }}
          >
            You&apos;re receiving this email because you subscribed voluntarily
            and confirmed it by clicking a link in a verification email.
          </Text>
        </Container>
      }
    >
      {children}

      <Section style={{ marginTop: 48 }}>
        <Text
          style={{
            color: "#0a0a0a",
            marginBottom: 16,
            marginTop: 0,
            textAlign: "center",
            fontSize: 18,
            fontWeight: 500,
          }}
        >
          Help me by sharing this newsletter
        </Text>

        <Row>
          {socialMedia.map((x) => (
            <Column key={x.name} style={{ textAlign: "center" }}>
              <Img
                alt={x.name}
                src={emailImageBaseUrl(x.icon)}
                width="32"
                height="32"
                style={{ display: "inline-block", margin: "0 auto" }}
              />
              <Link
                href={x.href}
                style={{
                  color: "#737373",
                  fontSize: 12,
                  textDecoration: "none",
                  display: "block",
                }}
              >
                {x.name}
              </Link>
            </Column>
          ))}
        </Row>

        <Container style={{ marginTop: 32 }}>
          <Text style={{ fontSize: 12, textAlign: "center" }}>
            Found a <em>typo</em>? The email doesn&apos;t render{" "}
            <em>correctly</em> in your email client? Have <em>any</em> feedback?
            Please, <strong>feel free to reply to this email</strong> and
            I&apos;ll get back to you <strong>as soon as I can</strong>.{" "}
            <span style={{ textDecoration: "underline" }}>Thank you!</span>
          </Text>
        </Container>
      </Section>
    </EmailTemplate>
  );
};
