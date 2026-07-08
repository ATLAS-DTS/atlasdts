"use client";

import ScrollToForm from "./ScrollToForm";
import { trackEvent } from "@/lib/analytics";
import { FACEBOOK_URL } from "@/lib/constants";

export default function CtaSection() {
  return (
    <section className="bg-dark-navy px-4 py-20 md:py-[100px]">
      <div className="mx-auto max-w-xl text-center">
        <h2 className="text-[28px] font-semibold text-white md:text-[36px]">
          Ready to Turn Your Unused Diabetic Supplies Into Cash?
        </h2>

        <p className="mt-4 text-base leading-relaxed text-white/80">
          Complete our inquiry form above or send us a message on Facebook. Once
          we review your information, we&apos;ll contact you with a competitive,
          no-obligation offer.
        </p>

        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <ScrollToForm
            className="h-[52px] rounded-lg bg-white px-8 font-semibold text-dark-navy transition-opacity hover:opacity-90"
            onClick={() => trackEvent("cta_click_bottom")}
          >
            Get Your Free Quote
          </ScrollToForm>
          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-white hover:underline"
          >
            Message Us on Facebook →
          </a>
        </div>
      </div>
    </section>
  );
}
