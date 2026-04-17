import type { MdxComponentsMap } from "@/newsletter/mdx/components";
import type { MdxComponentsProvider } from "@/newsletter/mdx/mdx-components-provider";

export function getMdxComponents(target: "web" | "email"): MdxComponentsMap {
  if (target === "web") {
    const { WebMdxComponentsProvider } =
      require("./web/web-mdx-provider") as typeof import("@/newsletter/mdx/web/web-mdx-provider");
    const provider = new WebMdxComponentsProvider();
    return provider.getComponents();
  }

  const { EmailMdxComponentsProvider } =
    require("./email/email-mdx-provider") as typeof import("@/newsletter/mdx/email/email-mdx-provider");
  const provider: MdxComponentsProvider = new EmailMdxComponentsProvider();
  return provider.getComponents();
}
