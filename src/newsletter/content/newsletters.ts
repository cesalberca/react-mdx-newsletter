export interface Newsletter {
  slug: string;
  title: string;
  description: string;
  date: string;
  filename: string;
}

export const newsletters: Newsletter[] = [
  {
    slug: "launching-newsletter",
    title: "Build Your Own Newsletter: Talk Resources and Links",
    description:
      "The slides, the repo, and everything else from the talk. Links to get started building your own newsletter with MDX, React Email, and Resend.",
    date: "Apr 19",
    filename: "2026-04-19_launching-newsletter",
  },
];
