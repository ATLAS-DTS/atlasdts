import { Suspense } from "react";
import AboutSection from "@/components/AboutSection";
import CtaSection from "@/components/CtaSection";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import InquiryForm from "@/components/InquiryForm";
import NotApprovedSection from "@/components/NotApprovedSection";
import ProductsSection from "@/components/ProductsSection";

function InquiryFormFallback() {
  return (
    <section
      id="inquiry-form"
      className="bg-light-grey px-4 py-20 md:py-[120px]"
    >
      <div className="mx-auto h-[600px] max-w-[640px] rounded-2xl bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)]" />
    </section>
  );
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <HowItWorksSection />
      <ProductsSection />
      <NotApprovedSection />
      <Suspense fallback={<InquiryFormFallback />}>
        <InquiryForm />
      </Suspense>
      <CtaSection />
    </>
  );
}
