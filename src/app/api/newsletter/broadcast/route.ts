import { type NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import type { ReactElement } from "react";
import { render } from "@react-email/render";
import { env } from "@/lib/env";
import { NEWSLETTER_CONFIG } from "@/app/api/newsletter/newsletter.config";

const resend = new Resend(env.RESEND_API_KEY);

interface BroadcastRequest {
  newsletterSlug: string;
  token: string;
}

interface BroadcastResponse {
  broadcastId?: string;
  message?: string;
  error?: string;
}

export async function POST(
  request: NextRequest,
): Promise<NextResponse<BroadcastResponse>> {
  try {
    const body: BroadcastRequest = await request.json();
    const { newsletterSlug, token } = body;

    if (!newsletterSlug) {
      return NextResponse.json(
        { error: "Missing required fields: newsletterSlug" },
        { status: 400 },
      );
    }

    if (token === undefined || token !== env.NEWSLETTER_BROADCAST_TOKEN) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
      const newsletterModule = await import(
        `@/emails/newsletter/${newsletterSlug}.tsx`
      );
      const NewsletterComponent = newsletterModule.default;
      const { title } = NewsletterComponent;

      if (!NewsletterComponent) {
        return NextResponse.json(
          { error: "Newsletter component not found" },
          { status: 404 },
        );
      }

      const html = await render(NewsletterComponent() as ReactElement);

      const broadcast = await resend.broadcasts.create({
        audienceId: NEWSLETTER_CONFIG.SEGMENT_ID,
        from: env.RESEND_EMAIL_FROM,
        subject: title,
        html,
        name: title,
      });

      if (broadcast.error) {
        console.error("Resend broadcast creation error:", broadcast.error);
        return NextResponse.json(
          { error: broadcast.error.message },
          { status: 400 },
        );
      }

      await resend.broadcasts.send(broadcast.data!.id, {
        scheduledAt: "today 15:00 UTC",
      });

      return NextResponse.json(
        {
          broadcastId: broadcast.data!.id,
          message: "Broadcast created successfully",
        },
        { status: 200 },
      );
    } catch (importError) {
      console.error("Newsletter import error:", importError);
      return NextResponse.json(
        { error: `Failed to load newsletter: ${newsletterSlug}` },
        { status: 404 },
      );
    }
  } catch (error) {
    console.error("Newsletter broadcast error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
