import type { MdxComponentsMap } from "@/newsletter/mdx/components";

export interface MdxComponentsProvider {
  getComponents(): MdxComponentsMap;
}
