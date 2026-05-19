# react-mdx-newsletter

A newsletter system built with **Next.js**, **MDX**, **React Email**, and **Resend**. It includes a Gmail-style presentation UI, a subscription flow with double opt-in, and a broadcast API for sending issues to your audience.

The newsletter code lives in `src/newsletter/`. It is designed to be self-contained: copy that folder into your own Next.js project and follow the setup steps below to get started.

---

## What's included

```
src/newsletter/
├── api/                    # Business logic
│   ├── subscribe.ts        # Signs a JWT, sends confirmation email
│   ├── confirm.ts          # Verifies JWT, adds contact to Resend audience
│   └── broadcast.ts        # Renders MDX issue to HTML, creates Resend broadcast
├── components/
│   ├── email-button.tsx    # CTA button used in email templates
│   └── newsletter-email-loader.tsx  # Reads an MDX issue and renders it
├── content/
│   ├── newsletters.ts      # Registry of all published issues
│   └── {slug}/en.mdx       # One folder per issue
├── emails/
│   ├── newsletter/         # One thin .tsx wrapper per issue
│   └── transactional/      # Confirmation and welcome emails
├── mdx/
│   ├── email/              # MDX components for email rendering
│   └── web/                # MDX components for web rendering
├── templates/
│   ├── email-template.tsx  # Base email layout (logo, signature, footer)
│   └── newsletter-template.tsx  # Newsletter layout with social share section
├── email-image-base-url.ts # Builds URLs for email images
└── newsletter-metadata.ts  # TypeScript interface for issue metadata
```

---

## Running the project

### Prerequisites

- Node.js 24+
- A [Resend](https://resend.com) account

### Install dependencies

```bash
npm install
```

### Set environment variables

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

```bash
# Resend (https://resend.com)
RESEND_API_KEY=re_...
RESEND_EMAIL_FROM=you@yourdomain.com
RESEND_SEGMENT_ID=...
RESEND_TOPIC_ID=...
RESEND_TEST_EMAIL=you@yourdomain.com

# Auth
JWT_SECRET=...                      # openssl rand -hex 32

# Broadcast protection
NEWSLETTER_BROADCAST_TOKEN=...      # openssl rand -hex 32

# App
NEXT_PUBLIC_URL=http://localhost:3000

# Send emails to audience through UI. If it's enable you can send them in production
NEXT_PUBLIC_COMPOSE_ENABLED=true|false
NEWSLETTER_ADMIN_TOKEN=
NEXT_PUBLIC_NEWSLETTER_ADMIN_TOKEN=
```

Where to find the Resend values:

- `RESEND_API_KEY`: [resend.com/api-keys](https://resend.com/api-keys)
- `RESEND_SEGMENT_ID`: Resend dashboard > Audiences > your audience > copy the ID
- `RESEND_EMAIL_FROM`: you must verify your domain or use a Resend-provided address first

### Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Preview emails

```bash
npm run email
```

Opens the React Email preview server at [http://localhost:3001](http://localhost:3001). All templates in `src/newsletter/emails/` are available.

---

## Using the newsletter in your own project

### 1. Copy the folder

Copy `src/newsletter/` into your Next.js project.

### 2. Configure Next.js for MDX

In `next.config.ts`:

```ts
import createMDX from "@next/mdx";

const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

export default createMDX({})(nextConfig);
```

Add a type declaration for `.mdx` imports. Create `src/mdx.d.ts`:

```ts
declare module "*.mdx" {
  import type { ComponentType } from "react";
  const component: ComponentType;
  export default component;
}
```

### 3. Add the API routes

Create these three files in `src/app/api/newsletter/`:

**`route.ts`** (subscribe)
```ts
import { type NextRequest, NextResponse } from "next/server";
import { subscribe } from "@/newsletter/api/subscribe";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    if (!email) return NextResponse.json({ error: "Email is required" }, { status: 400 });
    await subscribe(email);
    return NextResponse.json({ message: "Confirmation email sent" });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
```

**`confirm/route.ts`** (confirm subscription)
```ts
import { type NextRequest, NextResponse } from "next/server";
import { confirm } from "@/newsletter/api/confirm";

export async function POST(request: NextRequest) {
  try {
    const { token, email } = await request.json();
    if (!token) return NextResponse.json({ success: false, error: "Missing token" }, { status: 400 });
    if (!email) return NextResponse.json({ success: false, error: "Missing email" }, { status: 400 });
    const result = await confirm(token, email);
    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
```

**`broadcast/route.ts`** (send an issue)
```ts
import { type NextRequest, NextResponse } from "next/server";
import { env } from "@/lib/env";
import { broadcast } from "@/newsletter/api/broadcast";

export async function POST(request: NextRequest) {
  try {
    const { newsletterSlug, token } = await request.json();
    if (!newsletterSlug) return NextResponse.json({ error: "Missing newsletterSlug" }, { status: 400 });
    if (!token || token !== env.NEWSLETTER_BROADCAST_TOKEN) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const result = await broadcast(newsletterSlug);
    return NextResponse.json({ broadcastId: result.broadcastId });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
```

### 4. Add the pages

Copy these from this repo into your `src/app/` directory:

- `src/app/newsletter/` (subscribe page and confirmation handler)
- `src/app/newsletters/` (issue list and individual issue view)

### 5. Serve email images

Email images are served from `public/email-static/`. Copy the contents of `src/newsletter/emails/static/` into `public/email-static/` in your project, then replace `logo.png` and `signature.png` with your own.

### 6. Customise the email template

Open `src/newsletter/templates/email-template.tsx` and update:

- Your name
- The tagline
- The logo (`public/email-static/logo.png`)
- The signature (`public/email-static/signature.png`)

---

## Publishing an issue

### Create the content

Add a new folder under `src/newsletter/content/`:

```
src/newsletter/content/my-first-issue/en.mdx
```

The MDX file must export a `metadata` object at the top:

```mdx
export const metadata = {
  slug: "my-first-issue",
  title: "My First Issue",
  description: "A short preview shown in email clients.",
  date: new Date("2026-01-01"),
};

Your content goes here. You can use **Markdown** and React components.
```

### Register the issue

Add it to `src/newsletter/content/newsletters.ts`:

```ts
export const newsletters = [
  {
    slug: "my-first-issue",
    title: "My First Issue",
    description: "A short preview shown in email clients.",
    date: "Jan 1",
    filename: "2026-01-01_my-first-issue",
  },
];
```

### Create the email wrapper

Add `src/newsletter/emails/newsletter/2026-01-01_my-first-issue.tsx`:

```tsx
import { NewsletterEmailLoader } from "@/newsletter/components/newsletter-email-loader";

const MyFirstIssue = () => <NewsletterEmailLoader slug="my-first-issue" />;
MyFirstIssue.title = "My First Issue";
export default MyFirstIssue;
```

### Register it in the newsletters page

In `src/app/newsletters/[slug]/page.tsx`, add it to `componentMap`:

```ts
import MyFirstIssue from "@/newsletter/emails/newsletter/2026-01-01_my-first-issue";

const componentMap = {
  "my-first-issue": MyFirstIssue,
};
```

### Broadcast it

```bash
curl -X POST https://yourdomain.com/api/newsletter/broadcast \
  -H "Content-Type: application/json" \
  -d '{ "newsletterSlug": "2026-01-01_my-first-issue", "token": "your-broadcast-token" }'
```

---

## Subscription flow

```
User submits their email
      |
      v
POST /api/newsletter           signs JWT, sends confirmation email
      |
      v
User clicks the confirmation link
      |
      v
POST /api/newsletter/confirm   verifies JWT, adds contact to Resend audience,
                               sends welcome email
      |
      v
User is subscribed
```

---

## Tech stack

- [Next.js](https://nextjs.org) - React framework with App Router
- [MDX](https://mdxjs.com) - Markdown with JSX for writing content
- [React Email](https://react.email) - Email-safe React components
- [Resend](https://resend.com) - Email delivery and audience management
- [Tailwind CSS](https://tailwindcss.com) - Utility classes, converted to inline styles by `<Tailwind>` at render time
