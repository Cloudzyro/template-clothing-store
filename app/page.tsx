import Link from "next/link";
import GarmentArt from "@/components/GarmentArt";
import LookArt from "@/components/LookArt";
import ProductCard from "@/components/ProductCard";
import { collections, formatPrice, getProduct, products, productsIn } from "@/data/products";
import { lookbook, site } from "@/data/site";

export default function Home() {
  const featured = getProduct(site.home.featured) ?? products[0];
  const featuredColor = featured.colors.find((c) => c.name === site.home.featuredColor) ?? featured.colors[0];
  const newest = [...products].sort((a, b) => b.added.localeCompare(a.added)).slice(0, 4);
  const look = lookbook.looks[0];

  return (
    <>
      <section className="mx-auto grid max-w-[1440px] items-center gap-10 px-5 pb-16 pt-10 sm:px-8 md:grid-cols-12 md:gap-8 md:pb-24 md:pt-12">
        <div className="md:col-span-6 md:pr-4">
          <h1 className="display text-[42px] sm:text-6xl lg:text-[68px]">{site.home.headline}</h1>
          <p className="mt-6 max-w-[34rem] text-lg leading-8 text-ink-2">{site.home.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/shop/" className="btn btn-primary">
              Shop the season
            </Link>
            <Link href="/lookbook/" className="btn btn-secondary">
              See the lookbook
            </Link>
          </div>
        </div>
        <figure className="relative md:col-span-6">
          <Link href={`/product/${featured.slug}/?color=${featuredColor.name}`} className="block">
            <GarmentArt
              garment={featured.garment}
              hex={featuredColor.hex}
              label={`${featured.name} in ${featuredColor.name.toLowerCase()}, laid flat`}
              className="aspect-[4/5] w-full md:aspect-square"
            />
          </Link>
          <figcaption className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6">
            <span className="care-label">
              {featured.name}, {featuredColor.name.toLowerCase()}
              <span aria-hidden="true" className="h-3 w-px bg-ink/20" />
              {formatPrice(featured.price)}
            </span>
          </figcaption>
        </figure>
      </section>

      <section aria-labelledby="collections-title" className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <div className="grid gap-8 border-t border-line pt-12 md:grid-cols-12">
          <h2 id="collections-title" className="display text-4xl md:col-span-4 md:text-5xl">
            Collections
          </h2>
          <ul className="divide-y divide-line border-y border-line md:col-span-8">
            {collections.map((c) => {
              const first = productsIn(c.slug)[0];
              return (
                <li key={c.slug}>
                  <Link href={`/collections/${c.slug}/`} className="group grid grid-cols-[1fr_auto] items-center gap-6 py-5 sm:grid-cols-[64px_1fr_auto]">
                    {first && (
                      <GarmentArt
                        garment={first.garment}
                        hex={first.colors[0].hex}
                        label=""
                        className="hidden aspect-[4/5] w-16 sm:block"
                      />
                    )}
                    <span>
                      <span className="display block text-2xl group-hover:text-oxblood sm:text-3xl">{c.name}</span>
                      <span className="mt-1 block max-w-xl text-sm text-ink-2">{c.description}</span>
                    </span>
                    <span className="text-sm tabular-nums text-muted">{productsIn(c.slug).length} {productsIn(c.slug).length === 1 ? "piece" : "pieces"}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section aria-labelledby="new-title" className="mx-auto mt-24 max-w-[1440px] px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
          <h2 id="new-title" className="display text-4xl md:text-5xl">
            New this season
          </h2>
          <Link href="/shop/?sort=newest" className="link text-sm">
            Everything new
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
          {newest.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      <section aria-labelledby="lookbook-title" className="mx-auto mt-24 max-w-[1440px] px-5 sm:px-8">
        <div className="grid items-center gap-10 md:grid-cols-12">
          <LookArt look={look} className="aspect-[4/3] md:col-span-8" />
          <div className="md:col-span-4">
            <p className="text-sm text-muted">Lookbook, {lookbook.title.toLowerCase()}</p>
            <h2 id="lookbook-title" className="display mt-3 text-4xl md:text-5xl">
              {look.title}
            </h2>
            <p className="mt-4 text-ink-2">{look.caption}</p>
            <Link href="/lookbook/" className="btn btn-secondary mt-8">
              See all five looks
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="story-title" className="mx-auto mt-24 max-w-[1440px] px-5 sm:px-8">
        <div className="grid gap-10 border-t border-line pt-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <h2 id="story-title" className="display text-4xl md:text-5xl">
              {site.home.story.title}
            </h2>
            {site.home.story.body.map((p) => (
              <p key={p} className="mt-5 max-w-md text-ink-2">
                {p}
              </p>
            ))}
          </div>
          <dl className="grid gap-8 sm:grid-cols-3 md:col-span-7 md:col-start-6">
            {site.home.notes.map((n) => (
              <div key={n.title} className="border-t border-ink pt-4">
                <dt className="font-medium">{n.title}</dt>
                <dd className="mt-2 text-sm text-ink-2">{n.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
