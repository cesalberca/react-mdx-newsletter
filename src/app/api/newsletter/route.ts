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
