import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components"
import type { FC, PropsWithChildren, ReactElement } from "react"
import { emailImageBaseUrl } from "@/lib/email-image-base-url"

interface EmailTemplateProps {
  title: string
  description: string
  browserUrl?: string
  footer?: ReactElement
}

export const EmailTemplate: FC<PropsWithChildren<EmailTemplateProps>> = ({
  description,
  title,
  children,
  browserUrl,
  footer,
}) => {
  const baseUrl = process.env.NEXT_PUBLIC_URL ?? "http://localhost:3000"

  return (
    <Html>
      <Head />
      <Preview>{description}</Preview>
      <Body style={{ fontFamily: "Arial, Helvetica, sans-serif", margin: "auto", padding: 0 }}>
        <Container style={{ maxWidth: 600, margin: "0 auto" }}>
          {browserUrl && (
            <Section style={{ padding: "8px 24px", textAlign: "center", borderBottom: "1px solid #e5e5e5" }}>
              <Text style={{ color: "#737373", fontSize: 12, margin: 0 }}>
                <Link href={browserUrl} style={{ color: "#737373" }}>
                  View this email in your browser
                </Link>
              </Text>
            </Section>
          )}

          <Section style={{ padding: "16px 24px 0", textAlign: "center" }}>
            <Link href={baseUrl} style={{ textDecoration: "none" }}>
              <Img
                src={emailImageBaseUrl("logo.png")}
                width="45"
                height="30"
                alt="Logo"
                style={{ width: 45, height: "auto", margin: "0 auto" }}
              />
              <Text style={{ color: "#0a0a0a", fontSize: 14, margin: 0, fontWeight: 500 }}>
                César Alberca
              </Text>
              <Text style={{ color: "#737373", fontSize: 12, marginTop: 8, margin: 0, fontStyle: "italic" }}>
                Helping You Build Scalable, AI-Ready Frontend Architecture
              </Text>
            </Link>
          </Section>

          <Section style={{ padding: 8 }}>
            <Heading style={{ fontSize: 42, fontWeight: 700, color: "#0a0a0a", lineHeight: 1.2, margin: "8px 0" }}>
              {title}
            </Heading>

            <Section style={{ color: "#737373", fontSize: 18, lineHeight: 1.6 }}>
              {children}
            </Section>

            <Section style={{ marginTop: 16 }}>
              <Img
                src={emailImageBaseUrl("signature.png")}
                width="501"
                height="161"
                alt="Handwritten César Alberca"
                style={{ margin: "0 auto", maxWidth: "100%", height: "auto", width: 400 }}
              />
              <Text style={{ color: "#737373", fontSize: 12, textAlign: "center", margin: 0 }}>
                <em>Freelance Frontend Architect</em>
              </Text>
            </Section>
          </Section>

          <Section style={{ backgroundColor: "#f5f5f5", padding: "32px 24px", fontSize: 12 }}>
            {footer}

            <Text style={{ color: "#737373", marginBottom: 16, textAlign: "center" }}>
              <Link href="{{{RESEND_UNSUBSCRIBE_URL}}}" style={{ color: "#737373" }}>
                Unsubscribe
              </Link>
              {" / "}
              <Link href={baseUrl} style={{ color: "#737373" }}>
                Visit Website
              </Link>
            </Text>

            <Text style={{ color: "#737373", fontSize: 12, textAlign: "center", margin: 0, fontStyle: "italic" }}>
              Copyright &copy; {new Date().getFullYear()} All Rights Reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}
