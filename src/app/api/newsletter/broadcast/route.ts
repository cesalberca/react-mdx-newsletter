import { type NextRequest, NextResponse } from "next/server";
import { env } from "@/lib/env";
import { broadcast } from "@/newsletter/api/broadcast";

export async function POST(request: NextRequest) {
  try {
    const { newsletterSlug, token } = await request.json();
    if (!newsletterSlug) {
      return NextResponse.json(
        { error: "Missing required fields: newsletterSlug" },
        { status: 400 },
      );
    }
    if (!token || token !== env.NEWSLETTER_BROADCAST_TOKEN) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const result = await broadcast(newsletterSlug);
    return NextResponse.json({
      broadcastId: result.broadcastId,
      message: "Broadcast created successfully",
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    const status = message.includes("not found") ? 404 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
