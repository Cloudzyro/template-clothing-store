import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Visit and contact",
  description: `Visit the ${site.name} shop and workroom in ${site.address.city}, Oregon, or send us a note about sizing, repairs or an order.`,
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-5 pt-12 sm:px-8 md:pt-16">
      <div className="grid gap-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <h1 className="display text-5xl md:text-7xl">Visit the shop</h1>
          <p className="mt-6 max-w-md text-ink-2">
            The shop is at the front and the workroom is at the back. Come in for a fitting, or bring something that
            needs mending.
          </p>
          <dl className="mt-10 divide-y divide-line border-y border-line text-sm">
            <div className="grid grid-cols-[96px_1fr] gap-4 py-4">
              <dt className="text-muted">Address</dt>
              <dd>
                {site.address.street}
                <br />
                {site.address.city}, {site.address.region} {site.address.postal}
              </dd>
            </div>
            <div className="grid grid-cols-[96px_1fr] gap-4 py-4">
              <dt className="text-muted">Hours</dt>
              <dd>
                <ul className="space-y-1">
                  {site.hours.map((h) => (
                    <li key={h.days}>
                      {h.days}: {h.time}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
            <div className="grid grid-cols-[96px_1fr] gap-4 py-4">
              <dt className="text-muted">Phone</dt>
              <dd>
                <a href={`tel:${site.phone.replace(/[^0-9+]/g, "")}`} className="link">
                  {site.phone}
                </a>
              </dd>
            </div>
            <div className="grid grid-cols-[96px_1fr] gap-4 py-4">
              <dt className="text-muted">Email</dt>
              <dd>
                <a href={`mailto:${site.email}`} className="link">
                  {site.email}
                </a>
              </dd>
            </div>
          </dl>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <h2 className="display text-4xl">Send us a note</h2>
          <div className="mt-8">
            <ContactForm />
          </div>
        </div>
      </div>

      <section aria-labelledby="faq-title" className="mt-24 grid gap-8 border-t border-line pt-12 md:grid-cols-12">
        <h2 id="faq-title" className="display text-4xl md:col-span-4">
          Questions we get
        </h2>
        <div className="divide-y divide-line border-y border-line md:col-span-7 md:col-start-6">
          {site.faq.map((f) => (
            <details key={f.q} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-medium [&::-webkit-details-marker]:hidden">
                {f.q}
                <span aria-hidden="true" className="text-xl leading-none text-muted group-open:hidden">
                  +
                </span>
                <span aria-hidden="true" className="hidden text-xl leading-none text-muted group-open:inline">
                  -
                </span>
              </summary>
              <p className="mt-3 max-w-2xl text-ink-2">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
