import type { MdxComponentsMap } from "@/newsletter/mdx/components";
import { getEmailMdxComponents } from "@/newsletter/mdx/email/email-components";
import type { MdxComponentsProvider } from "@/newsletter/mdx/mdx-components-provider";

export class EmailMdxComponentsProvider implements MdxComponentsProvider {
  getComponents(): MdxComponentsMap {
    return getEmailMdxComponents() as MdxComponentsMap;
  }
}
