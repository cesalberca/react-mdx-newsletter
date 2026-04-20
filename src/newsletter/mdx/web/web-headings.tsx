import { createElement, type FC } from "react";
import { slugify } from "@/newsletter/mdx/web/slugify";

const CLASSES: Record<number, string> = {
  1: "text-[28px] font-bold mb-4 mt-0 text-foreground leading-tight",
  2: "text-[22px] font-bold mt-6 mb-3 text-foreground leading-tight",
  3: "text-lg font-bold mt-5 mb-2 text-foreground leading-tight",
  4: "text-base font-semibold mt-4 mb-2 text-foreground leading-tight",
  5: "text-sm font-semibold mt-4 mb-2 text-foreground leading-tight",
  6: "text-[13px] font-semibold mt-4 mb-2 text-foreground leading-tight",
};

export function createWebHeading(level: number): FC<{ children: string }> {
  const className = CLASSES[level] ?? CLASSES[6];

  const Heading: FC<{ children: string }> = ({ children }) => {
    const slug = slugify(children);
    return createElement(`h${level}`, { id: slug, className }, children);
  };

  Heading.displayName = `Heading${level}`;
  return Heading;
}
