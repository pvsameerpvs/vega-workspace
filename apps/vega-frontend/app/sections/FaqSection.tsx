const FAQS = [
  {
    q: "Do you deliver to Dubai?",
    a: "Yes, delivery is available as per location.",
  },
  {
    q: "Do you install the supplied furniture?",
    a: "Yes, installation cost will be confirmed to the customer.",
  },
  {
    q: "What are the payment methods?",
    a: "Cheque and payment link.",
  },
];

export function FaqSection() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-4xl px-4">
        <h2 className="mb-8 text-center text-3xl font-bold text-vega-blue">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <div key={i} className="rounded-lg border bg-white p-4">
              <h3 className="font-semibold text-vega-blue">{faq.q}</h3>
              <p className="mt-1 text-gray-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
