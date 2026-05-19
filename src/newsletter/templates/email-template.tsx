import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  pixelBasedPreset,
  Section,
  Tailwind,
  type TailwindConfig,
  Text,
} from "@react-email/components";
import type { FC, PropsWithChildren, ReactElement } from "react";
import { emailImageBaseUrl } from "@/newsletter/email-image-base-url";

interface EmailTemplateProps {
  title: string;
  description: string;
  browserUrl?: string;
  footer?: ReactElement;
}

const config: TailwindConfig = {
  presets: [pixelBasedPreset],
  theme: {
    extend: {
      colors: {
        primary: "#171717",
        background: "#ffffff",
        foreground: "#0a0a0a",
        secondary: "#f5f5f5",
        muted: "#f5f5f5",
        "muted-foreground": "#737373",
        border: "#e5e5e5",
      },
    },
  },
};

export const EmailTemplate: FC<PropsWithChildren<EmailTemplateProps>> = ({
  description,
  title,
  children,
  browserUrl,
  footer,
}) => {
  const baseUrl = process.env.NEXT_PUBLIC_URL ?? "http://localhost:3000";

  return (
    <Html>
      <Tailwind config={config}>
        <Head />
        <Preview>{description}</Preview>
        <Body className="font-sans mx-auto my-auto m-0 p-0">
          <Container className="mx-auto max-w-[600px]">
            {browserUrl && (
              <Section className="py-2 px-6 text-center border-b border-border">
                <Text className="text-muted-foreground text-xs m-0">
                  <Link href={browserUrl} className="text-muted-foreground">
                    View this email in your browser
                  </Link>
                </Text>
              </Section>
            )}

            <Section className="py-4 px-6 pb-0 text-center">
              <Link href={baseUrl} className="no-underline">
                <Img
                  src={emailImageBaseUrl("/email-static/logo.png")}
                  width="45"
                  height="30"
                  alt="Logo"
                  className="w-[45px] h-auto mx-auto"
                />
                <Text className="text-foreground text-sm m-0 font-medium tracking-wide">
                  FWD: Urgent Opportunity to Claim Your React + MDX Newsletter
                  Inheritance
                </Text>
                <Text className="text-muted-foreground text-xs mt-2 m-0 italic">
                  by César Alberca
                </Text>
              </Link>
            </Section>

            <Section className="p-2">
              <Heading className="text-[42px] font-bold text-foreground text-left leading-tight my-2">
                {title}
              </Heading>

              <Section className="text-muted-foreground text-xl leading-relaxed">
                {children}
              </Section>

              <Section className="mt-4">
                <Img
                  src={emailImageBaseUrl("/email-static/signature.png")}
                  width="501"
                  height="161"
                  alt="Handwritten César Alberca"
                  className="mx-auto max-w-full h-auto w-[400px]"
                />
                <Text className="text-muted-foreground text-xs text-center m-0 italic">
                  Freelance Frontend Architect
                </Text>
              </Section>
            </Section>

            <Section className="bg-muted py-8 px-6 text-xs">
              {footer}

              <Text className="text-muted-foreground mb-4 text-center">
                <Link
                  href="{{{RESEND_UNSUBSCRIBE_URL}}}"
                  className="text-muted-foreground"
                >
                  Unsubscribe
                </Link>
                {" / "}
                <Link href={baseUrl} className="text-muted-foreground">
                  Visit Website
                </Link>
              </Text>

              <Text className="text-muted-foreground text-xs text-center m-0 italic">
                Copyright &copy; {new Date().getFullYear()} All Rights Reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
