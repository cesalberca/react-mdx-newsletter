import type { HTMLAttributes, PropsWithChildren } from "react";
import { Slide } from "@/core/components/slides/slide";
import type { MdxComponentsMap } from "@/newsletter/mdx/components";
import { WebAlert } from "@/newsletter/mdx/web/web-alert";
import { WebCode } from "@/newsletter/mdx/web/web-code";
import { createWebHeading } from "@/newsletter/mdx/web/web-headings";
import { WebLink } from "@/newsletter/mdx/web/web-link";
import { WebPre } from "@/newsletter/mdx/web/web-pre";
import {
  WebTable,
  WebTableBody,
  WebTableCell,
  WebTableHead,
  WebTableHeader,
  WebTableRow,
} from "@/newsletter/mdx/web/web-table";

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
      <p className="mb-3 leading-[1.7] text-foreground" {...props} />
    ),
    ul: (props: HTMLAttributes<HTMLUListElement>) => (
      <ul className="mb-3 pl-6 leading-[1.7]" {...props} />
    ),
    ol: (props: HTMLAttributes<HTMLOListElement>) => (
      <ol className="mb-3 pl-6 leading-[1.7]" {...props} />
    ),
    strong: (props: HTMLAttributes<HTMLElement> & PropsWithChildren) => (
      <strong className="font-bold text-foreground" {...props} />
    ),
    pre: WebPre,
    table: WebTable,
    thead: WebTableHead,
    tbody: WebTableBody,
    tr: WebTableRow,
    th: WebTableHeader,
    td: WebTableCell,
    li: (props: HTMLAttributes<HTMLLIElement>) => (
      <li className="mb-1" {...props} />
    ),
    hr: () => <hr className="border-0 border-t border-border my-4" />,
  };
}
