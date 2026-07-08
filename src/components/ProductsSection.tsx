const products = [
  {
    title: "Continuous Glucose Monitoring (CGM) Supplies",
    description:
      "We regularly purchase eligible CGM products, including sensors, transmitters, and receivers from brands such as:",
    brands: "Dexcom®, FreeStyle Libre®",
  },
  {
    title: "Blood Glucose Test Strips",
    description:
      "We purchase unopened, unexpired test strips from many leading brands, including:",
    brands: "OneTouch®, Accu-Chek®, FreeStyle®, Contour®",
  },
  {
    title: "Insulin Pump Supplies",
    description:
      "We purchase select unopened insulin pump products and accessories, including:",
    brands: "Omnipod® Pods, Omnipod® Starter Kits, Other eligible insulin pump supplies",
  },
  {
    title: "Lancets",
    description:
      "We purchase select unopened lancets from several major manufacturers, including:",
    brands: "OneTouch®, Accu-Chek®, FreeStyle®, Microlet®",
  },
];

export default function ProductsSection() {
  return (
    <section className="bg-light-grey px-4 py-20 md:py-[120px]">
      <div className="mx-auto max-w-[900px]">
        <h2 className="text-[28px] font-semibold text-dark-navy md:text-[36px]">
          Products We Purchase
        </h2>

        <p className="mb-10 mt-6 text-base leading-relaxed text-text-secondary">
          Atlas DTS purchases a broad range of eligible diabetic testing supplies
          from many of the nation&apos;s leading manufacturers. Our purchasing needs
          are updated regularly based on current market demand, so the products
          listed below are examples of what we commonly buy — not a complete list.
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {products.map((product) => (
            <div
              key={product.title}
              className="rounded-xl border border-border bg-white p-6"
            >
              <h3 className="text-lg font-semibold text-dark-navy">{product.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-text-secondary">
                {product.description}
              </p>
              <p className="mt-2 text-[15px] font-medium text-dark-navy">
                {product.brands}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-xl border-l-4 border-royal-blue bg-royal-blue/5 p-6">
          <h3 className="text-lg font-semibold text-dark-navy">
            Not Sure If We Buy Your Product?
          </h3>
          <p className="mt-2 text-[15px] leading-relaxed text-text-secondary">
            If you have unopened, unexpired diabetic testing supplies and
            aren&apos;t sure whether they&apos;re eligible, we&apos;d be happy to
            help. Simply send us photos of the front and back of the box, the
            expiration date, and the quantity you have available. Our team will
            review your information and provide a free, no-obligation quote. Even
            if your product isn&apos;t listed above, it may still qualify for
            purchase.
          </p>
        </div>
      </div>
    </section>
  );
}
