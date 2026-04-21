import { type NextRequest, NextResponse } from "next/server";
import { subscribe } from "@/newsletter/api/subscribe";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }
    await subscribe(email);
    return NextResponse.json({
      message: "Confirmation email sent successfully",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal server error";
    console.error("[newsletter/subscribe]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
