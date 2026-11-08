"use server";

import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { headers } from "next/headers";
import { normaliseEnquiry, serviceLabel, validateEnquiry, type EnquiryInput, type EnquiryResult } from "@/lib/enquiry";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const recentSubmissions = new Map<string, number[]>();

function isRateLimited(key: string) {
  const now = Date.now();
  const recent = (recentSubmissions.get(key) ?? []).filter((time) => now - time < WINDOW_MS);
  recent.push(now);
  recentSubmissions.set(key, recent);
  return recent.length > MAX_PER_WINDOW;
}

function formatEmail(enquiry: EnquiryInput) {
  return [
    `Service: ${serviceLabel(enquiry.service)}`,
    `Name: ${enquiry.name}`,
    `Email: ${enquiry.email}`,
    `Phone: ${enquiry.phone || "Not provided"}`,
    `Organisation: ${enquiry.organisation || "Not provided"}`,
    "",
    "Message:",
    enquiry.message,
  ].join("\n");
}

async function sendWithResend(enquiry: EnquiryInput, apiKey: string, to: string, from: string) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: enquiry.email,
      subject: `New enquiry: ${serviceLabel(enquiry.service)} from ${enquiry.name}`.replace(/[\r\n]+/g, " "),
      text: formatEmail(enquiry),
    }),
  });
  if (!response.ok) {
    throw new Error(`Resend responded with ${response.status}: ${await response.text()}`);
  }
}

async function storeLocally(enquiry: EnquiryInput) {
  const directory = path.join(process.cwd(), ".enquiries");
  await mkdir(directory, { recursive: true });
  const record = {
    receivedAt: new Date().toISOString(),
    name: enquiry.name,
    email: enquiry.email,
    phone: enquiry.phone,
    organisation: enquiry.organisation,
    service: enquiry.service,
    message: enquiry.message,
  };
  await appendFile(path.join(directory, "enquiries.ndjson"), `${JSON.stringify(record)}\n`);
}

export async function submitEnquiry(raw: unknown): Promise<EnquiryResult> {
  const enquiry = normaliseEnquiry(raw);

  if (enquiry.website) return { status: "sent" };

  const errors = validateEnquiry(enquiry);
  if (Object.keys(errors).length > 0) return { status: "invalid", errors };

  const requestHeaders = await headers();
  const ip = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() || requestHeaders.get("x-real-ip") || "unknown";
  if (isRateLimited(ip)) return { status: "rate-limited" };

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;

  try {
    if (RESEND_API_KEY && CONTACT_TO_EMAIL && CONTACT_FROM_EMAIL) {
      await sendWithResend(enquiry, RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL);
      return { status: "sent" };
    }

    if (process.env.NODE_ENV !== "production") {
      await storeLocally(enquiry);
      console.info(`[enquiry] Stored locally in .enquiries/enquiries.ndjson (email delivery is not configured).`);
      return { status: "stored-locally" };
    }

    console.error("[enquiry] Email delivery is not configured. Set RESEND_API_KEY, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL.");
    return { status: "unavailable" };
  } catch (error) {
    console.error("[enquiry] Failed to deliver enquiry", error);
    return { status: "error" };
  }
}
