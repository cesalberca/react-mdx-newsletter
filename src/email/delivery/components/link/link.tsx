import type { FC, PropsWithChildren } from "react"
import { Link as EmailLink } from "@react-email/components"

export const Link: FC<PropsWithChildren<{ className?: string; href?: string }>> = ({ href, children }) => {
  return (
    <EmailLink href={href} style={{ color: "#171717", textDecoration: "underline" }}>
      {children}
    </EmailLink>
  )
}
