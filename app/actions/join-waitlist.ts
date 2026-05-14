"use server";

import { AdminWaitlistEmail } from "@/components/email-template";
import { getResend } from "@/lib/resend";

export type JoinWaitlistResult = { ok: true } | { ok: false; error: string };

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const GENERIC_ERROR = "Something went wrong. Please try again.";

export async function joinWaitlist(input: {
  email: string;
}): Promise<JoinWaitlistResult> {
  const email = input.email?.trim().toLowerCase();
  if (!email || email.length > 254 || !EMAIL_REGEX.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  const audienceId = process.env.RESEND_AUDIENCE_ID;
  const notifyEmail = process.env.NOTIFY_EMAIL;
  if (!audienceId) {
    console.error("RESEND_AUDIENCE_ID is not set");
    return { ok: false, error: GENERIC_ERROR };
  }
  if (!notifyEmail) {
    console.error("NOTIFY_EMAIL is not set");
    return { ok: false, error: GENERIC_ERROR };
  }

  let resend: ReturnType<typeof getResend>;
  try {
    resend = getResend();
  } catch (err) {
    console.error("Resend client init failed", err);
    return { ok: false, error: GENERIC_ERROR };
  }

  const contactResult = await resend.contacts.create({
    email,
    segments: [{ id: audienceId }],
  });

  if (contactResult.error) {
    const isDuplicate =
      contactResult.error.name === "validation_error" &&
      /already exists/i.test(contactResult.error.message);
    if (!isDuplicate) {
      console.error("Resend contacts.create failed", contactResult.error);
      return { ok: false, error: GENERIC_ERROR };
    }
    return { ok: true };
  }

  try {
    const emailResult = await resend.emails.send(
      {
        from: "BetterStandup <onboarding@resend.dev>",
        to: [notifyEmail],
        subject: `New waitlist signup: ${email}`,
        react: AdminWaitlistEmail({
          email,
          joinedAt: new Date(),
          source: "hero_form",
        }),
      },
      { idempotencyKey: `waitlist-notify/${email}` },
    );
    if (emailResult.error) {
      console.error("Resend emails.send failed", emailResult.error);
    }
  } catch (err) {
    console.error("Resend emails.send threw", err);
  }

  return { ok: true };
}
