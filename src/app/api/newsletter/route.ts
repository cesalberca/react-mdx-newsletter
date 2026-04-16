import { sign } from "jsonwebtoken";
import { type NextRequest, NextResponse } from "next/server";
import type { ReactElement } from "react";
import { Resend } from "resend";
import { v4 as uuid } from "uuid";
import NewsletterConfirmationEmail from "@/emails/transactional/newsletter-confirmation-email";
import { env } from "@/lib/env";

const resend = new Resend(env.RESEND_API_KEY);

interface SubscribeRequest {
  email: string;
}

interface SubscribeResponse {
  message?: string;
  error?: string;
}

export async function POST(
  request: NextRequest,
): Promise<NextResponse<SubscribeResponse>> {
  try {
    const body: SubscribeRequest = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const confirmationToken = sign({ email }, env.JWT_SECRET, {
      expiresIn: "24h",
    });

    await resend.emails.send({
      from: env.RESEND_EMAIL_FROM,
      to: email,
      subject: "Confirm your Build Your Own Newsletter subscription",
      replyTo: env.RESEND_EMAIL_FROM,
      headers: {
        "X-Entity-Ref-ID": uuid(),
      },
      react: NewsletterConfirmationEmail({
        confirmationToken,
        email,
      }) as ReactElement,
    });

    return NextResponse.json(
      { message: "Confirmation email sent successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Newsletter subscribe error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
