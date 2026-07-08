import type { Metadata } from "next";
import { CONTACT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy | Atlas DTS",
  description: "Atlas DTS privacy policy.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:py-24">
      <h1 className="text-3xl font-bold text-dark-navy">Privacy Policy</h1>
      <p className="mt-2 text-sm text-text-muted">Last updated: July 8, 2026</p>

      {/* OWNER_INPUT: Real privacy policy content needed here. This is especially
      important because the site collects personal information (name, phone,
      email) and photos. Should be reviewed by an attorney given the medical
      supply nature of the business. */}

      <div className="mt-8 space-y-8 text-base leading-relaxed text-text-secondary">
        <section>
          <h2 className="text-xl font-semibold text-dark-navy">Information We Collect</h2>
          <p className="mt-2">
            [OWNER_INPUT: Describe the categories of information collected via
            the inquiry form — name, phone number, email address, supply
            descriptions, and any photos submitted — as well as information
            collected automatically, such as analytics and cookies.]
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-dark-navy">How We Use Your Information</h2>
          <p className="mt-2">
            [OWNER_INPUT: Explain how submitted information is used — to
            provide quotes, arrange shipment, process payment, and communicate
            with the individual about their inquiry.]
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-dark-navy">How We Share Your Information</h2>
          <p className="mt-2">
            [OWNER_INPUT: Disclose any third parties information is shared
            with, such as payment processors, shipping carriers, or service
            providers, and under what circumstances information may be
            disclosed, e.g. to comply with law.]
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-dark-navy">Data Security</h2>
          <p className="mt-2">
            [OWNER_INPUT: Describe the safeguards in place to protect
            submitted information and photos, including storage and
            transmission security measures.]
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-dark-navy">Your Rights</h2>
          <p className="mt-2">
            [OWNER_INPUT: Describe any rights individuals have regarding their
            data, such as requesting access, correction, or deletion of their
            information.]
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-dark-navy">Contact Us</h2>
          <p className="mt-2">
            If you have questions about this Privacy Policy, contact us at{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-royal-blue hover:underline">
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
