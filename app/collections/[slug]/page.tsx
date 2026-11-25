import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Catalog from "@/components/Catalog";
import { collections, getCollection } from "@/data/products";

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const c = getCollection((await params).slug);
  return c ? { title: c.name, description: c.description } : {};
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const collection = getCollection((await params).slug);
  if (!collection) notFound();
  return (
    <div className="mx-auto max-w-[1440px] px-5 pt-12 sm:px-8 md:pt-16">
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <Link href="/collections/" className="link">
          Collections
        </Link>
      </nav>
      <div className="mb-12 mt-4 grid gap-4 md:grid-cols-12">
        <h1 className="display text-5xl md:col-span-6 md:text-7xl">{collection.name}</h1>
        <p className="self-end text-ink-2 md:col-span-5 md:col-start-8">{collection.description}</p>
      </div>
      <Catalog fixedCollection={collection.slug} />
    </div>
  );
}
