import type { MdxComponentsMap } from "@/newsletter/mdx/components";
import type { MdxComponentsProvider } from "@/newsletter/mdx/mdx-components-provider";
import { getWebMdxComponents } from "@/newsletter/mdx/web/web-components";

export class WebMdxComponentsProvider implements MdxComponentsProvider {
  getComponents(): MdxComponentsMap {
    return getWebMdxComponents();
  }
}
