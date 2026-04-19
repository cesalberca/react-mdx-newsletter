import { type NextRequest, NextResponse } from "next/server";
import { broadcast } from "@/newsletter/api/broadcast";

export async function POST(request: NextRequest) {
  try {
    const { newsletterSlug } = await request.json();
    if (!newsletterSlug) {
      return NextResponse.json(
        { error: "Missing required field: newsletterSlug" },
        { status: 400 },
      );
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
