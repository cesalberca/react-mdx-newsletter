# Newsletter

A self-contained newsletter system built with **Next.js**, **MDX**, **React Email**, and **Resend**.

Copy this folder into your Next.js project and follow the steps below to have a fully working newsletter with subscription, confirmation, and broadcast in minutes.

---

## What's included

```
src/newsletter/
├── api/                    # Business logic (no Next.js specifics)
│   ├── subscribe.ts        # Signs a JWT, sends confirmation email
│   ├── confirm.ts          # Verifies JWT, adds contact to Resend audience
│   └── broadcast.ts        # Renders MDX issue to HTML, creates Resend broadcast
├── components/
│   ├── email-button.tsx    # CTA button used in email templates
│   └── newsletter-email-loader.tsx  # Reads an MDX issue and renders it
├── content/
│   ├── newsletters.ts      # Registry of all published issues
│   └── {slug}/en.mdx       # One folder per issue — write your content here
├── emails/
│   ├── newsletter/         # One thin .tsx wrapper per issue
│   └── transactional/      # Confirmation and welcome emails
├── mdx/
│   ├── email/              # MDX components that render inside emails
│   └── web/                # MDX components that render on the web
├── templates/
│   ├── email-template.tsx  # Base email layout (logo, signature, footer)
│   └── newsletter-template.tsx  # Newsletter layout (adds social share section)
├── email-image-base-url.ts # Builds URLs for email images
└── newsletter-metadata.ts  # TypeScript interface for issue metadata
```

---

## Prerequisites

- **Next.js 14+** with the App Router and `src/` directory
- **Node.js 18+**

---

## 1. Install dependencies

```bash
npm install resend @react-email/components @react-email/render react-email \
  @mdx-js/mdx @mdx-js/react @next/mdx \
  jsonwebtoken uuid \
  lucide-react react-syntax-highlighter \
  @types/jsonwebtoken @types/uuid @types/react-syntax-highlighter
```

---

## 2. Configure Next.js for MDX

In `next.config.ts`:

```ts
import createMDX from "@next/mdx";

const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

export default createMDX({})(nextConfig);
```

Add a type declaration so TypeScript understands `.mdx` imports. Create `src/mdx.d.ts`:

```ts
declare module "*.mdx" {
  import type { ComponentType } from "react";
  const component: ComponentType;
  export default component;
}
```

---

## 3. Set environment variables

Create a `.env` file at the root of your project:

```bash
# Resend — email delivery (https://resend.com)
RESEND_API_KEY=re_...                       # Your Resend API key
RESEND_EMAIL_FROM=you@yourdomain.com        # Must be a verified sender in Resend
RESEND_AUDIENCE_ID=...                      # Audience ID from Resend dashboard
RESEND_TEST_EMAIL=you@yourdomain.com        # Address used during local testing

# Auth — used to sign and verify confirmation tokens
JWT_SECRET=a-long-random-string            # Generate with: openssl rand -hex 32

# Broadcast protection — required to call the broadcast API
NEWSLETTER_BROADCAST_TOKEN=another-secret  # Generate with: openssl rand -hex 32

# App — used to build absolute URLs in emails
NEXT_PUBLIC_URL=https://yourdomain.com     # http://localhost:3000 for local dev
```

> **Where to find Resend values**
> - `RESEND_API_KEY` → [resend.com/api-keys](https://resend.com/api-keys)
> - `RESEND_AUDIENCE_ID` → Resend dashboard → Audiences → your audience → copy the ID
> - `RESEND_EMAIL_FROM` → you must verify your domain or use a Resend-provided address first

---

## 4. Add the API routes

Create these three thin route files in your `src/app/` directory. They delegate all logic to `src/newsletter/api/`.

**`src/app/api/newsletter/route.ts`** — subscribe
```ts
import { type NextRequest, NextResponse } from "next/server";
import { subscribe } from "@/newsletter/api/subscribe";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }
    await subscribe(email);
    return NextResponse.json({ message: "Confirmation email sent successfully" });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
```

**`src/app/api/newsletter/confirm/route.ts`** — confirm subscription
```ts
import { type NextRequest, NextResponse } from "next/server";
import { confirm } from "@/newsletter/api/confirm";

export async function POST(request: NextRequest) {
  try {
    const { token, email } = await request.json();
    if (!token) return NextResponse.json({ success: false, error: "Missing token" }, { status: 400 });
    if (!email) return NextResponse.json({ success: false, error: "Missing email" }, { status: 400 });
    const result = await confirm(token, email);
    return NextResponse.json({
      success: true,
      message: result.alreadySubscribed ? "Already subscribed" : "Confirmed!",
      ...result,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
```

**`src/app/api/newsletter/broadcast/route.ts`** — broadcast an issue
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
    return NextResponse.json({ broadcastId: result.broadcastId, message: "Broadcast created" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
```

---

## 5. Add the pages

**`src/app/newsletter/page.tsx`** — subscribe page with email previews

**`src/app/newsletter/confirm/page.tsx`** — handles the confirmation link from the email

**`src/app/newsletters/page.tsx`** — lists all published issues

**`src/app/newsletters/[slug]/page.tsx`** — renders a single issue as HTML

These pages are included in this repo. Copy them from `src/app/newsletter/` and `src/app/newsletters/`.

---

## 6. Serve email images

Email images live in `public/email-static/`. They are served at `/email-static/{filename}` and referenced in templates via `emailImageBaseUrl()`.

Copy the contents of `src/newsletter/emails/static/` into `public/email-static/` in your project, then replace `logo.png` and `signature.png` with your own.

---

## 7. Customise the email template

Open `src/newsletter/templates/email-template.tsx` and update:

- Your name (currently "César Alberca")
- The tagline ("Helping You Build Scalable, AI-Ready Frontend Architecture")
- The logo (`public/email-static/logo.png`)
- The signature (`public/email-static/signature.png`)

---

## 8. Writing and publishing an issue

### Create the content

Add a new folder under `src/newsletter/content/`:

```
src/newsletter/content/my-first-issue/en.mdx
```

The MDX file must export a `metadata` object:

```mdx
export const metadata = {
  slug: "my-first-issue",
  title: "My First Issue",
  description: "A short preview shown in email clients.",
  date: new Date("2026-01-01"),
};

Hello and welcome to the newsletter!

Here's a code example:

```tsx
function Hello() {
  return <p>Hello world</p>
}
```
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

In `src/app/newsletters/[slug]/page.tsx`, add it to the `componentMap`:

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

## 9. Preview emails locally

```bash
npm run email
# opens http://localhost:3001
```

This starts the React Email preview server pointed at `src/newsletter/emails/`.

---

## Subscription flow

```
User fills in email
      │
      ▼
POST /api/newsletter          ← signs JWT, sends confirmation email
      │
      ▼
User clicks confirmation link
      │
      ▼
POST /api/newsletter/confirm  ← verifies JWT, adds contact to Resend audience
                              ← sends welcome email
      │
      ▼
User is subscribed ✓
```
