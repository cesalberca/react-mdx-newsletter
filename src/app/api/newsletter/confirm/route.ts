import { verify } from "jsonwebtoken";
import { type NextRequest, NextResponse } from "next/server";
import type { ReactElement } from "react";
import { Resend } from "resend";
import { env } from "@/lib/env";
import { NewsletterWelcomeEmail } from "@/newsletter/emails/transactional/newsletter-welcome-email";

const resend = new Resend(env.RESEND_API_KEY);

interface ConfirmationTokenPayload {
  email: string;
}

interface ConfirmRequest {
  token: string;
  email: string;
}

export interface ConfirmResponseOk {
  success: true;
  message: string;
  alreadyConfirmed?: boolean;
  alreadySubscribed?: boolean;
}

export interface ConfirmResponseKo {
  error: string;
  success: false;
}

export type ConfirmResponse = ConfirmResponseOk | ConfirmResponseKo;

export async function POST(
  request: NextRequest,
): Promise<NextResponse<ConfirmResponse>> {
  try {
    const body: ConfirmRequest = await request.json();
    const { token, email: emailParam } = body;

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Missing confirmation token" },
        { status: 400 },
      );
    }

    if (!emailParam) {
      return NextResponse.json(
        { success: false, error: "Missing email parameter" },
        { status: 400 },
      );
    }

    let payload: ConfirmationTokenPayload;
    try {
      payload = verify(token, env.JWT_SECRET) as ConfirmationTokenPayload;
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid or expired confirmation token" },
        { status: 400 },
      );
    }

    const { email } = payload;

    if (email !== emailParam) {
      return NextResponse.json(
        {
          success: false,
          error: "Email mismatch between token and URL parameter",
        },
        { status: 400 },
      );
    }

    const contactResult = await resend.contacts.create({
      email,
      audienceId: env.RESEND_API_KEY ? "default" : "",
    });

    if (contactResult.error) {
      if (
        contactResult.error.message?.toLowerCase().includes("already exists") ||
        contactResult.error.message?.toLowerCase().includes("duplicate")
      ) {
        return NextResponse.json(
          {
            success: true,
            message: "Subscription confirmed (already exists)",
            alreadySubscribed: true,
          },
          { status: 200 },
        );
      }
      return NextResponse.json(
        { success: false, error: contactResult.error.message },
        { status: 500 },
      );
    }

    // Send welcome email
    try {
      await resend.emails.send({
        from: env.RESEND_EMAIL_FROM,
        to: email,
        subject: "Welcome to Build Your Own Newsletter!",
        react: NewsletterWelcomeEmail({}) as ReactElement,
      });
    } catch (err) {
      console.error("Failed to send welcome email:", err);
    }

    return NextResponse.json(
      { success: true, message: "Subscription confirmed successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Newsletter confirmation error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
