import type { PrismLanguage } from "@react-email/code-block";
import { CodeInline, Img, Text } from "@react-email/components";
import type {
  HTMLAttributes,
  ImgHTMLAttributes,
  JSX,
  LinkHTMLAttributes,
  PropsWithChildren,
} from "react";
import { emailImageBaseUrl } from "@/newsletter/email-image-base-url";
import type { MdxComponentsMap } from "@/newsletter/mdx/components";
import { EmailAlert } from "@/newsletter/mdx/email/email-alert";
import { EmailCodeBlock } from "@/newsletter/mdx/email/email-code-block/email-code-block";
import { createEmailHeading } from "@/newsletter/mdx/email/email-headings";
import { EmailLink } from "@/newsletter/mdx/email/email-link";
import {
  EmailTable,
  EmailTableBody,
  EmailTableCell,
  EmailTableHead,
  EmailTableHeader,
  EmailTableRow,
} from "@/newsletter/mdx/email/email-table";

export function getEmailMdxComponents(): MdxComponentsMap {
  return {
    h1: createEmailHeading(1),
    h2: createEmailHeading(2),
    h3: createEmailHeading(3),
    h4: createEmailHeading(4),
    h5: createEmailHeading(5),
    h6: createEmailHeading(6),
    ul: (props: HTMLAttributes<HTMLUListElement>) => (
      <ul style={{ fontSize: 16 }} {...props} />
    ),
    ol: (props: HTMLAttributes<HTMLOListElement>) => (
      <ol style={{ fontSize: 16 }} {...props} />
    ),
    strong: (props: HTMLAttributes<HTMLElement> & PropsWithChildren) => (
      <strong style={{ color: "#0a0a0a" }}>{props.children}</strong>
    ),
    a: (
      props: LinkHTMLAttributes<HTMLAnchorElement> &
        PropsWithChildren<{ href: string }>,
    ) => {
      let href = props.href as string;
      if (href?.startsWith("/")) {
        href = (process.env.NEXT_PUBLIC_URL ?? "") + href;
      }
      return <EmailLink href={href}>{props.children}</EmailLink>;
    },
    img: (props: ImgHTMLAttributes<HTMLImageElement>) => (
      <Img
        src={emailImageBaseUrl(props?.src?.toString() ?? "")}
        alt={props.alt}
        width={props.width}
        height={props.height}
        style={{
          maxWidth: "100%",
          height: "auto",
          ...(props.style as object),
        }}
      />
    ),
    blockquote: EmailAlert,
    p: (props: HTMLAttributes<HTMLParagraphElement> & PropsWithChildren) => (
      <Text style={{ fontSize: 16, lineHeight: 1.6 }} {...props} />
    ),
    code: (props: HTMLAttributes<HTMLElement> & PropsWithChildren) => (
      <CodeInline
        style={{
          padding: "2px 6px",
          fontSize: "0.85em",
          backgroundColor: "#f0f0f0",
          borderRadius: 4,
          fontFamily: "monospace",
        }}
      >
        {props.children}
      </CodeInline>
    ),
    pre: (props: { children?: JSX.Element }) => {
      const codeContent = props.children?.props?.children ?? "";
      const className = props.children?.props?.className ?? "";
      const language = className.startsWith("language-")
        ? className.replace("language-", "")
        : "typescript";
      return (
        <EmailCodeBlock
          code={codeContent}
          language={language as PrismLanguage}
        />
      );
    },
    table: EmailTable,
    thead: EmailTableHead,
    tbody: EmailTableBody,
    tr: EmailTableRow,
    th: EmailTableHeader,
    td: EmailTableCell,
  };
}
