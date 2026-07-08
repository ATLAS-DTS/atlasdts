import type { Metadata } from "next";
import { CONTACT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Service | Atlas DTS",
  description: "Atlas DTS terms of service.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:py-24">
      <h1 className="text-3xl font-bold text-dark-navy">Terms of Service</h1>
      <p className="mt-2 text-sm text-text-muted">Last updated: July 8, 2026</p>

      {/* OWNER_INPUT: Real terms of service content needed here. Should be
      reviewed by an attorney given the medical supply nature of the
      business, including eligibility requirements, payment terms, and
      liability limitations. */}

      <div className="mt-8 space-y-8 text-base leading-relaxed text-text-secondary">
        <section>
          <h2 className="text-xl font-semibold text-dark-navy">Acceptance of Terms</h2>
          <p className="mt-2">
            [OWNER_INPUT: Describe what it means for a user to submit an
            inquiry or otherwise use the site, and that doing so constitutes
            acceptance of these terms.]
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-dark-navy">Eligible Supplies</h2>
          <p className="mt-2">
            [OWNER_INPUT: Describe the requirements supplies must meet to be
            eligible for purchase — unopened, unexpired, and matching the
            information and photos submitted.]
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-dark-navy">Quotes and Payment</h2>
          <p className="mt-2">
            [OWNER_INPUT: Describe how quotes are provided, that they are
            non-binding until items are inspected, and how and when payment is
            issued after approval.]
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-dark-navy">Inspection and Rejection</h2>
          <p className="mt-2">
            [OWNER_INPUT: Describe the inspection process and what happens if
            supplies are not approved, including return or disposal options.]
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-dark-navy">Limitation of Liability</h2>
          <p className="mt-2">
            [OWNER_INPUT: Standard limitation of liability language, to be
            drafted by an attorney.]
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-dark-navy">Contact Us</h2>
          <p className="mt-2">
            If you have questions about these Terms, contact us at{" "}
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
