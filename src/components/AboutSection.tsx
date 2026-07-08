const paragraphs = [
  `Atlas DTS is dedicated to providing a safe, honest, and convenient way for people to sell their unused diabetic testing supplies. We purchase eligible, unopened, and unexpired diabetic products including test strips, CGM sensors, insulin pump supplies, lancets, and other qualifying diabetic supplies.`,
  `We understand that extra supplies can accumulate due to prescription changes, insurance coverage, or lifestyle changes. Rather than letting them expire, we offer a simple solution that helps you recover value while reducing unnecessary waste.`,
  `Our commitment is to provide competitive offers, clear communication, and prompt payment. Whether you're selling a single box or multiple supplies, our goal is to make every transaction straightforward, secure, and stress-free.`,
];

export default function AboutSection() {
  return (
    <section className="bg-light-grey px-4 py-20 md:py-[120px]">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-[28px] font-semibold text-dark-navy md:text-[36px]">
          About Atlas DTS
        </h2>
        <div className="mt-6 space-y-4">
          {paragraphs.map((p) => (
            <p key={p.slice(0, 20)} className="text-base leading-relaxed text-text-secondary">
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
