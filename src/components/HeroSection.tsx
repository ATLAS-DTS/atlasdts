"use client";

import { ExternalLink } from "lucide-react";
import ScrollToForm from "./ScrollToForm";
import TrustBadge from "./TrustBadge";
import { trackEvent } from "@/lib/analytics";
import { FACEBOOK_URL } from "@/lib/constants";

const badges = [
  "Competitive Offers",
  "Quick Response Times",
  "Secure & Reliable Process",
  "Fast Payment After Inspection",
];

export default function HeroSection() {
  return (
    <section className="bg-white px-4 py-20 md:py-[120px]">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-[36px] font-bold leading-[1.15] text-dark-navy md:text-[52px]">
          Turn Your Unused Diabetic Supplies Into Cash
        </h1>

        <p className="mt-4 text-lg leading-relaxed text-text-secondary md:text-xl">
          Fast Quotes. Fair Prices. Fast Payment.
        </p>

        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-text-secondary">
          Atlas DTS purchases unopened, unexpired diabetic testing supplies from
          individuals across the United States. We make the process simple, secure,
          and hassle-free. Submit your information for a free quote or send us a
          message on Facebook to get started today.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:flex sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-8 sm:gap-y-3">
          {badges.map((badge) => (
            <TrustBadge key={badge} text={badge} />
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <ScrollToForm
            className="h-[52px] rounded-lg bg-royal-blue px-8 font-semibold text-white transition-colors hover:bg-royal-blue-dark"
            onClick={() => trackEvent("cta_click_hero")}
          >
            Get Your Free Quote Today
          </ScrollToForm>
          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-medium text-dark-navy hover:underline"
          >
            Message Us on Facebook
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
