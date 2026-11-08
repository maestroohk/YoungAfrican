import { enquiryServices } from "@/content/site";

export type EnquiryInput = {
  name: string;
  email: string;
  phone: string;
  organisation: string;
  service: string;
  message: string;
  consent: boolean;
  website: string;
};

export type EnquiryField = Exclude<keyof EnquiryInput, "website">;
export type FieldErrors = Partial<Record<EnquiryField, string>>;

export type EnquiryResult =
  | { status: "idle" }
  | { status: "sent" }
  | { status: "stored-locally" }
  | { status: "invalid"; errors: FieldErrors }
  | { status: "rate-limited" }
  | { status: "unavailable" }
  | { status: "error" };

export const emptyEnquiry: EnquiryInput = {
  name: "",
  email: "",
  phone: "",
  organisation: "",
  service: "",
  message: "",
  consent: false,
  website: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const phonePattern = /^[+()\d\s-]{7,20}$/;

export function serviceLabel(value: string) {
  return enquiryServices.find((service) => service.value === value)?.label;
}

export function normaliseEnquiry(raw: unknown): EnquiryInput {
  const source = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const text = (key: string) => (typeof source[key] === "string" ? (source[key] as string).trim() : "");
  return {
    name: text("name"),
    email: text("email").toLowerCase(),
    phone: text("phone"),
    organisation: text("organisation"),
    service: text("service"),
    message: text("message"),
    consent: source.consent === true,
    website: text("website"),
  };
}

export function validateEnquiry(input: EnquiryInput): FieldErrors {
  const errors: FieldErrors = {};

  if (input.name.length < 2) errors.name = "Please enter your full name.";
  else if (input.name.length > 100) errors.name = "Please keep your name under 100 characters.";

  if (!input.email) errors.email = "Please enter your email address.";
  else if (!emailPattern.test(input.email) || input.email.length > 200)
    errors.email = "Please enter a valid email address, for example name@example.com.";

  if (input.phone && !phonePattern.test(input.phone))
    errors.phone = "Please enter a valid phone number, for example +256 700 000000.";

  if (input.organisation.length > 150) errors.organisation = "Please keep this under 150 characters.";

  if (!serviceLabel(input.service)) errors.service = "Please choose the service you are interested in.";

  if (input.message.length < 20) errors.message = "Please tell us a little more (at least 20 characters).";
  else if (input.message.length > 3000) errors.message = "Please keep your message under 3,000 characters.";

  if (!input.consent) errors.consent = "Please confirm that we may use these details to respond to you.";

  return errors;
}
