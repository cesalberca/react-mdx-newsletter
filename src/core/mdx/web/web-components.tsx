import type { HTMLAttributes, PropsWithChildren } from "react";
import { Slide } from "@/core/components/slides/slide";
import type { MdxComponentsMap } from "@/core/mdx/components";
import { WebAlert } from "@/core/mdx/web/web-alert";
import { WebCode } from "@/core/mdx/web/web-code";
import { createWebHeading } from "@/core/mdx/web/web-headings";
import { WebLink } from "@/core/mdx/web/web-link";
import { WebPre } from "@/core/mdx/web/web-pre";
import {
  WebTable,
  WebTableBody,
  WebTableCell,
  WebTableHead,
  WebTableHeader,
  WebTableRow,
} from "@/core/mdx/web/web-table";

export function getWebMdxComponents(): MdxComponentsMap {
  return {
    Slide,
    h1: createWebHeading(1),
    h2: createWebHeading(2),
    h3: createWebHeading(3),
    h4: createWebHeading(4),
    h5: createWebHeading(5),
    h6: createWebHeading(6),
    a: WebLink,
    code: WebCode,
    blockquote: WebAlert,
    p: (props: HTMLAttributes<HTMLParagraphElement>) => (
      <p
        style={{
          margin: "0 0 12px 0",
          lineHeight: 1.7,
          color: "var(--text-primary)",
        }}
        {...props}
      />
    ),
    ul: (props: HTMLAttributes<HTMLUListElement>) => (
      <ul
        style={{ margin: "0 0 12px 0", paddingLeft: 24, lineHeight: 1.7 }}
        {...props}
      />
    ),
    ol: (props: HTMLAttributes<HTMLOListElement>) => (
      <ol
        style={{ margin: "0 0 12px 0", paddingLeft: 24, lineHeight: 1.7 }}
        {...props}
      />
    ),
    strong: (props: HTMLAttributes<HTMLElement> & PropsWithChildren) => (
      <strong
        style={{ fontWeight: 700, color: "var(--text-primary)" }}
        {...props}
      />
    ),
    pre: WebPre,
    table: WebTable,
    thead: WebTableHead,
    tbody: WebTableBody,
    tr: WebTableRow,
    th: WebTableHeader,
    td: WebTableCell,
    li: (props: HTMLAttributes<HTMLLIElement>) => (
      <li style={{ marginBottom: 4 }} {...props} />
    ),
    hr: () => (
      <hr
        style={{
          border: "none",
          borderTop: "1px solid var(--border-primary)",
          margin: "16px 0",
        }}
      />
    ),
  };
}
