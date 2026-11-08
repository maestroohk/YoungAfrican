"use client";

import { useRef, useState, useTransition, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { CircleAlert, CircleCheck, LoaderCircle, Send } from "lucide-react";
import { submitEnquiry } from "@/app/(site)/contact/actions";
import { enquiryServices, site } from "@/content/site";
import {
  emptyEnquiry,
  validateEnquiry,
  type EnquiryField,
  type EnquiryInput,
  type EnquiryResult,
  type FieldErrors,
} from "@/lib/enquiry";

const fieldOrder: EnquiryField[] = ["name", "email", "phone", "organisation", "service", "message", "consent"];

const inputClass =
  "block min-h-12 w-full rounded-2xl border bg-paper px-4 py-3 text-base text-ink transition-colors placeholder:text-muted/80 focus:border-blue focus:bg-white focus:outline-none focus-visible:outline-none focus:ring-4 focus:ring-blue/15";

export function ContactForm({ initialService = "", initialMessage = "" }: { initialService?: string; initialMessage?: string }) {
  const [values, setValues] = useState<EnquiryInput>({ ...emptyEnquiry, service: initialService, message: initialMessage });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [result, setResult] = useState<EnquiryResult>({ status: "idle" });
  const [pending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  const update = (field: keyof EnquiryInput) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const value = event.target instanceof HTMLInputElement && event.target.type === "checkbox" ? event.target.checked : event.target.value;
    setValues((current) => ({ ...current, [field]: value }));
    if (field !== "website" && errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const focusFirstError = (fieldErrors: FieldErrors) => {
    const first = fieldOrder.find((field) => fieldErrors[field]);
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fieldErrors = validateEnquiry(values);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) {
      setResult({ status: "idle" });
      focusFirstError(fieldErrors);
      return;
    }

    startTransition(async () => {
      let response: EnquiryResult;
      try {
        response = await submitEnquiry(values);
      } catch {
        response = { status: "error" };
      }
      setResult(response);
      if (response.status === "invalid") {
        setErrors(response.errors);
        focusFirstError(response.errors);
        return;
      }
      if (response.status === "sent" || response.status === "stored-locally") {
        setValues({ ...emptyEnquiry });
      }
      requestAnimationFrame(() => statusRef.current?.focus());
    });
  };

  if (result.status === "sent" || result.status === "stored-locally") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="rounded-[2rem] bg-white p-6 outline-none sm:p-10">
        <CircleCheck aria-hidden className="size-10 text-blue" strokeWidth={1.75} />
        {result.status === "sent" ? (
          <>
            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.03em]">Thank you, your enquiry has been sent.</h2>
            <p className="mt-4 max-w-lg text-lg leading-relaxed text-muted">
              We have received your message and will reply to the email address you provided.
            </p>
          </>
        ) : (
          <>
            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.03em]">Enquiry saved locally (development mode).</h2>
            <p className="mt-4 max-w-lg text-lg leading-relaxed text-muted">
              Email delivery is not configured, so nobody has been notified. The enquiry was written to{" "}
              <code className="bg-paper px-1.5 py-0.5 font-mono text-base text-ink">.enquiries/enquiries.ndjson</code>{" "}
              on the development machine.
            </p>
          </>
        )}
        <button
          type="button"
          onClick={() => setResult({ status: "idle" })}
          className="mt-8 inline-flex min-h-12 items-center rounded-full bg-ink px-6 font-semibold text-white transition-colors hover:bg-blue"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  const failureMessage: Partial<Record<EnquiryResult["status"], string>> = {
    "rate-limited": "You have sent several enquiries in a short time. Please wait a few minutes and try again.",
    unavailable: "Our enquiry form is not connected to email yet, so your message could not be sent. Please try again later.",
    error: "Something went wrong and your enquiry was not sent. Please try again in a moment.",
    invalid: "Please correct the highlighted fields and try again.",
  };
  const failure = failureMessage[result.status];
  const errorCount = Object.values(errors).filter(Boolean).length;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="relative rounded-[2rem] bg-white p-6 sm:p-10">
      {errorCount > 0 && !failure && (
        <p role="alert" className="mb-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-800">
          <CircleAlert aria-hidden className="mt-0.5 size-5 shrink-0" />
          {errorCount === 1 ? "One field needs your attention." : `${errorCount} fields need your attention.`}
        </p>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="name" label="Full name" required error={errors.name}>
          <input
            id="name"
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={update("name")}
            maxLength={100}
            {...fieldA11y("name", errors.name)}
            className={`${inputClass} ${borderFor(errors.name)}`}
          />
        </Field>
        <Field id="email" label="Email address" required error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={values.email}
            onChange={update("email")}
            maxLength={200}
            {...fieldA11y("email", errors.email)}
            className={`${inputClass} ${borderFor(errors.email)}`}
          />
        </Field>
        <Field id="phone" label="Phone number" hint="Optional" error={errors.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+256 or your country code"
            value={values.phone}
            onChange={update("phone")}
            maxLength={20}
            {...fieldA11y("phone", errors.phone)}
            className={`${inputClass} ${borderFor(errors.phone)}`}
          />
        </Field>
        <Field id="organisation" label="Organisation or community" hint="Optional" error={errors.organisation}>
          <input
            id="organisation"
            name="organisation"
            autoComplete="organization"
            value={values.organisation}
            onChange={update("organisation")}
            maxLength={150}
            {...fieldA11y("organisation", errors.organisation)}
            className={`${inputClass} ${borderFor(errors.organisation)}`}
          />
        </Field>
        <Field id="service" label="What can we help with?" required error={errors.service} className="sm:col-span-2">
          <select
            id="service"
            name="service"
            value={values.service}
            onChange={update("service")}
            {...fieldA11y("service", errors.service)}
            className={`${inputClass} ${borderFor(errors.service)} appearance-none bg-[url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%20fill='none'%20stroke='%230b0c0a'%20stroke-width='2'%3E%3Cpath%20d='m6%209%206%206%206-6'/%3E%3C/svg%3E")] bg-[length:1.25rem] bg-[right_1rem_center] bg-no-repeat pr-12`}
          >
            <option value="" disabled>
              Select a service
            </option>
            {enquiryServices.map((service) => (
              <option key={service.value} value={service.value}>
                {service.label}
              </option>
            ))}
          </select>
        </Field>
        <Field
          id="message"
          label="Your message"
          required
          hint={`${values.message.length}/3000`}
          error={errors.message}
          className="sm:col-span-2"
        >
          <textarea
            id="message"
            name="message"
            rows={6}
            value={values.message}
            onChange={update("message")}
            maxLength={3000}
            placeholder="Tell us your location and what you need. For connection problems, describe what happens and when it started."
            {...fieldA11y("message", errors.message)}
            className={`${inputClass} ${borderFor(errors.message)} resize-y`}
          />
        </Field>
      </div>

      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={update("website")} />
      </div>

      <div className="mt-6">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            name="consent"
            checked={values.consent}
            onChange={update("consent")}
            {...fieldA11y("consent", errors.consent)}
            className="mt-0.5 size-5 shrink-0 cursor-pointer accent-[var(--color-blue)]"
          />
          <span className="text-muted">
            I agree that {site.name} may use these details to respond to my enquiry, as described in the{" "}
            <a href="/privacy" className="underline underline-offset-4">
              privacy notice
            </a>
            .
          </span>
        </label>
        {errors.consent && (
          <p id="consent-error" className="mt-2 ml-8 text-sm text-red-700">
            {errors.consent}
          </p>
        )}
      </div>

      {failure && (
        <div ref={statusRef} tabIndex={-1} role="alert" className="mt-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-800 outline-none">
          <CircleAlert aria-hidden className="mt-0.5 size-5 shrink-0" />
          <p>{failure}</p>
        </div>
      )}

      <div className="mt-8 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          <span aria-hidden>*</span> Required fields
        </p>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-blue px-6 font-semibold text-white transition-colors hover:bg-blue-deep disabled:cursor-wait disabled:opacity-70"
        >
          {pending ? (
            <>
              <LoaderCircle aria-hidden className="size-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Send enquiry
              <Send aria-hidden className="size-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

function fieldA11y(field: EnquiryField, error?: string) {
  return {
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${field}-error` : undefined,
  };
}

function borderFor(error?: string) {
  return error ? "border-red-600" : "border-line hover:border-muted";
}

function Field({
  id,
  label,
  required,
  hint,
  error,
  className = "",
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <div className="mb-2 flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="font-medium">
          {label}
          {required && (
            <span aria-hidden className="text-muted">
              {" "}
              *
            </span>
          )}
          {required && <span className="sr-only"> (required)</span>}
        </label>
        {hint && <span className="text-sm text-muted">{hint}</span>}
      </div>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
