import type { MDXComponents } from "mdx/types";
import { getMdxComponents } from "@/core/mdx/mdx-components-factory";

// This file needs to be here

const customComponents = getMdxComponents("web");

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...customComponents,
    ...components,
  };
}
