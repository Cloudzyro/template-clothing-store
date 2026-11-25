import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductBuy from "@/components/ProductBuy";
import ProductCard from "@/components/ProductCard";
import { getCollection, getProduct, products } from "@/data/products";
import { site } from "@/data/site";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getProduct((await params).slug);
  return p ? { title: p.name, description: p.description, openGraph: { title: `${p.name} | ${site.name}`, description: p.description } } : {};
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const product = getProduct((await params).slug);
  if (!product) notFound();
  const collection = getCollection(product.collection);
  const related = products.filter((p) => p.slug !== product.slug && p.collection === product.collection);
  const more = [...related, ...products.filter((p) => p.collection !== product.collection && p.slug !== product.slug)].slice(0, 4);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    brand: { "@type": "Brand", name: site.name },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${site.url}/product/${product.slug}/`,
    },
  };

  return (
    <div className="mx-auto max-w-[1440px] px-5 pt-8 sm:px-8 md:pt-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted">
        <Link href="/shop/" className="link">
          Shop
        </Link>
        {collection && (
          <>
            <span className="mx-2" aria-hidden="true">
              /
            </span>
            <Link href={`/collections/${collection.slug}/`} className="link">
              {collection.name}
            </Link>
          </>
        )}
      </nav>
      <ProductBuy product={product} />
      <section aria-labelledby="more-title" className="mt-24 border-t border-line pt-12">
        <h2 id="more-title" className="display text-4xl">
          Wear it with
        </h2>
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
          {more.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
