import Link from "next/link";
import { collections } from "@/data/products";
import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="mt-32 border-t border-line">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-16 sm:px-8 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="display text-4xl">{site.name}</p>
          <p className="mt-4 max-w-sm text-sm text-ink-2">{site.footer.note}</p>
        </div>
        <div className="md:col-span-3">
          <h2 className="text-sm text-muted">Collections</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {collections.map((c) => (
              <li key={c.slug}>
                <Link href={`/collections/${c.slug}/`} className="hover:text-oxblood">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-4">
          <h2 className="text-sm text-muted">The shop</h2>
          <address className="mt-4 text-sm not-italic leading-6">
            {site.address.street}
            <br />
            {site.address.city}, {site.address.region} {site.address.postal}
          </address>
          <ul className="mt-4 space-y-1 text-sm text-ink-2">
            {site.hours.map((h) => (
              <li key={h.days}>
                {h.days}: {h.time}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm">
            <a href={`mailto:${site.email}`} className="link">
              {site.email}
            </a>
          </p>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1440px] flex-wrap justify-between gap-4 border-t border-line px-5 py-6 text-xs text-muted sm:px-8">
        <p>&copy; {new Date().getFullYear()} {site.name}</p>
        <p>Made in small runs in {site.address.city}, Oregon</p>
      </div>
    </footer>
  );
}
