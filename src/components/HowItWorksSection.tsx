import ScrollToForm from "./ScrollToForm";

const steps = [
  {
    title: "Contact Us",
    description:
      "Complete our inquiry form or send us a message through our Facebook page with the supplies you'd like to sell.",
  },
  {
    title: "Receive Your Quote",
    description:
      "Our team will review your information and provide a competitive, no-obligation offer.",
  },
  {
    title: "Ship Your Supplies",
    description:
      "Once you accept the quote, we'll provide instructions for sending your eligible supplies.",
  },
  {
    title: "Inspection & Verification",
    description:
      "After your package arrives, we'll inspect the supplies to verify they match the information provided.",
  },
  {
    title: "Get Paid",
    description:
      "Once your supplies are approved, payment is issued promptly using the agreed-upon payment method.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="bg-white px-4 py-20 md:py-[120px]">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-[28px] font-semibold text-dark-navy md:text-[36px]">
          How It Works
        </h2>

        <ol className="mt-10 space-y-8 md:space-y-10">
          {steps.map((step, i) => (
            <li key={step.title} className="flex gap-4">
              <span className="shrink-0 text-sm font-bold text-royal-blue">
                {i + 1}.
              </span>
              <div>
                <h3 className="text-lg font-semibold text-dark-navy">{step.title}</h3>
                <p className="mt-1 text-base leading-relaxed text-text-secondary">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-10 text-center">
          <ScrollToForm className="h-[52px] rounded-lg bg-royal-blue px-8 font-semibold text-white transition-colors hover:bg-royal-blue-dark">
            Get Your Free Quote
          </ScrollToForm>
        </div>
      </div>
    </section>
  );
}
