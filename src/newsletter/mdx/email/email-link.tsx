import { Link } from "@react-email/components";
import type { FC, PropsWithChildren } from "react";

export const EmailLink: FC<
  PropsWithChildren<{ className?: string; href?: string }>
> = ({ href, children }) => {
  return (
    <Link href={href} style={{ color: "#171717", textDecoration: "underline" }}>
      {children}
    </Link>
  );
};
