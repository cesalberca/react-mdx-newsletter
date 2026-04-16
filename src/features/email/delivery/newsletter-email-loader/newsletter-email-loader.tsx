import fs from "node:fs";
import path from "node:path";
import { type EvaluateOptions, evaluateSync } from "@mdx-js/mdx";
import type { FC } from "react";
import * as runtime from "react/jsx-runtime";
import { getMdxComponents } from "@/core/mdx/mdx-components-factory";
import type { NewsletterMetadata } from "@/features/email/domain/newsletter-metadata";
import { NewsletterTemplate } from "@/features/email/delivery/templates/newsletter-template";

export const NewsletterEmailLoader: FC<{ slug: string }> = ({ slug }) => {
  const file = path.join(
    process.cwd(),
    "src",
    "content",
    "emails",
    "newsletter",
    slug,
    "en.mdx",
  );
  const code = fs.readFileSync(file, { encoding: "utf8" });

  const { default: Content, metadata } = evaluateSync(code, {
    ...(runtime as Readonly<EvaluateOptions>),
    useMDXComponents: () => getMdxComponents("email"),
  });

  const typedMetadata = metadata as NewsletterMetadata;

  return (
    <NewsletterTemplate
      browserUrl={typedMetadata.slug}
      title={typedMetadata.title}
      description={typedMetadata.description}
    >
      <Content />
    </NewsletterTemplate>
  );
};
