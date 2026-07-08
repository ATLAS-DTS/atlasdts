const reasons = [
  "Products that are expired or close to expiration",
  "Opened, damaged, or tampered packaging",
  "Items that differ from the information or photos submitted",
  "Products we are unable to purchase at the time of inspection",
];

const options = [
  {
    title: "Return Shipment",
    body: "We can return your supplies to you. Return shipping costs may apply and will be discussed with you before your items are shipped back.",
  },
  {
    title: "Decline Return",
    body: "If you choose not to have the items returned, we can responsibly dispose of them at your request.",
  },
];

export default function NotApprovedSection() {
  return (
    <section className="bg-white px-4 py-20 md:py-[120px]">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-[28px] font-semibold text-dark-navy md:text-[36px]">
          What Happens If My Supplies Aren&apos;t Approved?
        </h2>

        <div className="mt-6 space-y-4 text-base leading-relaxed text-text-secondary">
          <p>
            Our goal is to make every transaction fair and transparent. Once we
            receive your shipment, each item is carefully inspected to ensure it
            matches the information provided and meets our purchasing
            requirements.
          </p>
          <p>
            If any supplies cannot be approved, we&apos;ll contact you to explain
            why before any final decision is made. Common reasons include:
          </p>
        </div>

        <ul className="mt-4 space-y-2">
          {reasons.map((reason) => (
            <li key={reason} className="flex gap-2 text-base text-text-secondary">
              <span aria-hidden="true">•</span>
              <span>{reason}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {options.map((option) => (
            <div key={option.title} className="rounded-xl border border-border p-6">
              <h3 className="text-lg font-semibold text-dark-navy">{option.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-text-secondary">
                {option.body}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-6 text-base leading-relaxed text-text-secondary">
          We believe in honest communication and will never issue payment or
          dispose of your supplies without first discussing the inspection results
          with you. If only part of your shipment qualifies, we&apos;ll provide an
          updated offer based on the approved items, and you can decide whether
          you&apos;d like to proceed.
        </p>
      </div>
    </section>
  );
}
