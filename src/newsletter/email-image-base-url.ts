const PROD_URL =
  process.env.NEXT_PUBLIC_URL ?? "https://react-mdx-newsletter.vercel.app";

export const emailImageBaseUrl = (url: string) => {
  const path = url.startsWith("/") ? url : `/${url}`;

  // Dev: Next (port 3000) serves public/email-static at the same path,
  // so a root-relative URL loads the local committed file directly.
  if (process.env.NODE_ENV === "development") {
    return path;
  }

  // Production: absolute URL so sent emails resolve in real inboxes.
  return `${PROD_URL}${path}`;
};
