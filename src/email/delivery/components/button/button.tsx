import type { FC, PropsWithChildren } from "react"
import { Button as EmailButton } from "@react-email/components"

export const Button: FC<PropsWithChildren<{ className?: string; link?: string }>> = ({ link, children }) => {
  return (
    <EmailButton
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
    </EmailButton>
  )
}
