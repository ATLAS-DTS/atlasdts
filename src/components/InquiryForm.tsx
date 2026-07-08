"use client";

import { AlertCircle, Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import FormError from "./FormError";
import FormSuccess from "./FormSuccess";
import PhotoUpload from "./PhotoUpload";
import { trackEvent } from "@/lib/analytics";
import { CONTACT_EMAIL, FACEBOOK_URL } from "@/lib/constants";
import { inquirySchema } from "@/lib/validations";
import type { UploadedPhoto } from "@/types";

interface FormValues {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  supplies: string;
}

const initialValues: FormValues = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  supplies: "",
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const inputClasses =
  "h-12 w-full rounded-lg border border-border px-4 text-base text-dark-navy placeholder:text-text-muted focus:border-royal-blue focus:outline-none focus:ring-2 focus:ring-royal-blue/20";

export default function InquiryForm() {
  const searchParams = useSearchParams();
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [photos, setPhotos] = useState<UploadedPhoto[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const hasStarted = useRef(false);

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const suppliesRef = useRef<HTMLTextAreaElement>(null);

  function handleFirstInteraction() {
    if (!hasStarted.current) {
      hasStarted.current = true;
      trackEvent("form_start");
    }
  }

  function handleChange(field: keyof FormValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const result = inquirySchema.safeParse(values);
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof FormValues;
        if (!fieldErrors[field]) fieldErrors[field] = issue.message;
      }
      setErrors(fieldErrors);

      const refsByField: Record<keyof FormValues, React.RefObject<HTMLElement | null>> = {
        firstName: firstNameRef,
        lastName: lastNameRef,
        phone: phoneRef,
        email: emailRef,
        supplies: suppliesRef,
      };
      const firstErrorField = (Object.keys(values) as (keyof FormValues)[]).find(
        (field) => fieldErrors[field],
      );
      if (firstErrorField) {
        const target = refsByField[firstErrorField].current;
        target?.scrollIntoView({ behavior: "smooth", block: "center" });
        target?.focus();
      }
      return;
    }

    setErrors({});
    setSubmitError(false);
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("firstName", values.firstName);
      formData.append("lastName", values.lastName);
      formData.append("phone", values.phone);
      formData.append("email", values.email);
      formData.append("supplies", values.supplies);
      formData.append("utmSource", searchParams.get("utm_source") ?? "");
      formData.append("utmMedium", searchParams.get("utm_medium") ?? "");
      formData.append("utmCampaign", searchParams.get("utm_campaign") ?? "");
      photos.forEach((photo) => formData.append("photos", photo.file));

      const res = await fetch("/api/inquiry", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Submission failed");

      if (photos.length > 0) trackEvent("photo_upload");
      trackEvent("form_submit");
      setSubmitted(true);
    } catch {
      trackEvent("form_error");
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="inquiry-form" className="bg-light-grey px-4 py-20 md:py-[120px]">
      <div className="mx-auto max-w-[640px] rounded-2xl bg-white p-8 shadow-[0_4px_24px_rgba(0,0,0,0.06)] md:p-12">
        {submitted ? (
          <FormSuccess />
        ) : (
          <>
            <h2 className="text-[28px] font-semibold text-dark-navy md:text-[36px]">
              Get Your Free Quote Today
            </h2>
            <p className="mb-8 mt-2 text-base text-text-secondary">
              Complete the form below with a few details about the supplies
              you&apos;d like to sell.
            </p>

            <form onSubmit={handleSubmit} onFocus={handleFirstInteraction} noValidate>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-5 sm:flex-row">
                  <div className="flex-1">
                    <label htmlFor="firstName" className="mb-1.5 block text-sm font-medium text-dark-navy">
                      First Name
                    </label>
                    <input
                      id="firstName"
                      ref={firstNameRef}
                      type="text"
                      value={values.firstName}
                      onChange={(e) => handleChange("firstName", e.target.value)}
                      className={inputClasses}
                      aria-invalid={!!errors.firstName}
                      aria-describedby={errors.firstName ? "firstName-error" : undefined}
                      required
                    />
                    {errors.firstName && (
                      <p id="firstName-error" className="mt-1.5 flex items-center gap-1 text-[13px] text-error">
                        <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                  <div className="flex-1">
                    <label htmlFor="lastName" className="mb-1.5 block text-sm font-medium text-dark-navy">
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      ref={lastNameRef}
                      type="text"
                      value={values.lastName}
                      onChange={(e) => handleChange("lastName", e.target.value)}
                      className={inputClasses}
                      aria-invalid={!!errors.lastName}
                      aria-describedby={errors.lastName ? "lastName-error" : undefined}
                      required
                    />
                    {errors.lastName && (
                      <p id="lastName-error" className="mt-1.5 flex items-center gap-1 text-[13px] text-error">
                        <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-dark-navy">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    ref={phoneRef}
                    type="tel"
                    value={values.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className={inputClasses}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                    required
                  />
                  {errors.phone && (
                    <p id="phone-error" className="mt-1.5 flex items-center gap-1 text-[13px] text-error">
                      <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-dark-navy">
                    Email Address
                  </label>
                  <input
                    id="email"
                    ref={emailRef}
                    type="email"
                    value={values.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className={inputClasses}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    required
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1.5 flex items-center gap-1 text-[13px] text-error">
                      <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="supplies" className="mb-1.5 block text-sm font-medium text-dark-navy">
                    What supplies do you have?
                  </label>
                  <textarea
                    id="supplies"
                    ref={suppliesRef}
                    rows={5}
                    value={values.supplies}
                    onChange={(e) => handleChange("supplies", e.target.value)}
                    placeholder="List the supplies you'd like to sell — include brand names, quantities, and expiration dates if possible."
                    className={`${inputClasses} h-auto resize-y py-3`}
                    aria-invalid={!!errors.supplies}
                    aria-describedby={errors.supplies ? "supplies-error" : undefined}
                    required
                  />
                  {errors.supplies && (
                    <p id="supplies-error" className="mt-1.5 flex items-center gap-1 text-[13px] text-error">
                      <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                      {errors.supplies}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-dark-navy">
                    Upload Photos (Optional)
                  </label>
                  <p className="mb-2 text-sm text-text-secondary">
                    Photos of the front and back of each box help us quote faster.
                  </p>
                  <PhotoUpload photos={photos} onChange={setPhotos} />
                </div>

                <p className="text-[13px] text-text-muted">
                  Please note: all supplies must be sealed (unopened) and not expired.
                </p>

                <div className="text-sm leading-relaxed text-text-secondary">
                  <p>To provide an accurate quote, please include:</p>
                  <ul className="mt-1 space-y-1">
                    {[
                      "Photos of the front and back of each box",
                      "The product name",
                      "The expiration date",
                      "The quantity you have available",
                    ].map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="text-accent-gold" aria-hidden="true">
                          •
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="mt-6 flex h-[52px] w-full items-center justify-center gap-2 rounded-lg bg-royal-blue text-[17px] font-semibold text-white transition-colors hover:bg-royal-blue-dark disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting && <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />}
                {submitting ? "Submitting..." : "Submit for Free Quote"}
              </button>

              {submitError && <FormError onRetry={() => setSubmitError(false)} />}

              <div className="mt-4 text-center text-sm text-text-muted">
                <p>
                  Have questions? Email us at{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-royal-blue hover:underline">
                    {CONTACT_EMAIL}
                  </a>
                </p>
                <p className="mt-1">
                  Or{" "}
                  <a
                    href={FACEBOOK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-royal-blue hover:underline"
                  >
                    message us on Facebook →
                  </a>
                </p>
              </div>
            </form>
          </>
        )}
      </div>
    </section>
  );
}
