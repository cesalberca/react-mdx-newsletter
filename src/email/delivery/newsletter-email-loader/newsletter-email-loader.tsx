import type { FC, PropsWithChildren } from "react"
import { NewsletterTemplate } from "@/email/delivery/templates/newsletter-template"

interface NewsletterEmailLoaderProps {
  slug: string
  title: string
  description: string
}

export const NewsletterEmailLoader: FC<PropsWithChildren<NewsletterEmailLoaderProps>> = ({
  slug,
  title,
  description,
  children,
}) => {
  return (
    <NewsletterTemplate browserUrl={slug} title={title} description={description}>
      {children}
    </NewsletterTemplate>
  )
}
