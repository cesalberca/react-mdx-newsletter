import { Button } from "@react-email/components";
import type { FC, PropsWithChildren } from "react";

export const EmailButton: FC<
  PropsWithChildren<{ className?: string; link?: string }>
> = ({ link, children }) => {
  return (
    <Button
      href={link}
      style={{
        padding: 16,
        color: "#737373",
        fontFamily: "monospace",
        fontSize: 14,
        backgroundColor: "#f5f5f5",
        border: "2px solid #e5e5e5",
        textDecoration: "none",
        display: "inline-block",
      }}
    >
      {children}
    </Button>
  );
};
