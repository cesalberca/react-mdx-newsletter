import type { AnchorHTMLAttributes, PropsWithChildren } from "react";

export function WebLink(
  props: AnchorHTMLAttributes<HTMLAnchorElement> & PropsWithChildren,
) {
  return <a className="text-link no-underline" {...props} />;
}
