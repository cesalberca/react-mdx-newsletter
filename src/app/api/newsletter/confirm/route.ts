import { type NextRequest, NextResponse } from "next/server";
import { confirm } from "@/newsletter/api/confirm";

export async function POST(request: NextRequest) {
  try {
    const { token, email } = await request.json();
    if (!token) {
      return NextResponse.json(
        { success: false, error: "Missing confirmation token" },
        { status: 400 },
      );
    }
    if (!email) {
      return NextResponse.json(
        { success: false, error: "Missing email parameter" },
        { status: 400 },
      );
    }
    const result = await confirm(token, email);
    return NextResponse.json({
      success: true,
      message: result.alreadySubscribed
        ? "Subscription confirmed (already exists)"
        : "Subscription confirmed successfully",
      ...result,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal server error";
    const isTokenError = message.includes("Invalid or expired");
    return NextResponse.json(
      { success: false, error: message },
      { status: isTokenError ? 400 : 500 },
    );
  }
}
