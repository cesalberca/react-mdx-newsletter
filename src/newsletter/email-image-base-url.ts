const BASE_URL =
  process.env.NEXT_PUBLIC_URL ?? "https://react-mdx-newsletter.vercel.app";

// Email HTML may be rendered locally and sent to real inboxes, so image
// URLs must always be absolute. Set NEXT_PUBLIC_URL=http://localhost:3000
// in .env.local for local previews that load from public/email-static.
export const emailImageBaseUrl = (url: string) => {
  const path = url.startsWith("/") ? url : `/${url}`;

  return `${BASE_URL}${path}`;
};
