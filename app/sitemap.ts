import type { MetadataRoute } from "next";
import { collections, products } from "@/data/products";
import { site } from "@/data/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/shop/", "/collections/", "/lookbook/", "/contact/"].map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: "weekly" as const,
    priority: path === "/" ? 1 : 0.7,
  }));
  const collectionPages = collections.map((c) => ({
    url: `${site.url}/collections/${c.slug}/`,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));
  const productPages = products.map((p) => ({
    url: `${site.url}/product/${p.slug}/`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));
  return [...pages, ...collectionPages, ...productPages];
}
