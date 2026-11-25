import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 md:py-32">
      <p className="text-sm text-muted">Page not found</p>
      <h1 className="display mt-4 max-w-3xl text-5xl md:text-7xl">This one has gone back to the workroom</h1>
      <p className="mt-6 max-w-md text-ink-2">The page may have moved, or the piece sold out for the season.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/shop/" className="btn btn-primary">
          Go to the shop
        </Link>
        <Link href="/" className="btn btn-secondary">
          Home
        </Link>
      </div>
    </div>
  );
}
