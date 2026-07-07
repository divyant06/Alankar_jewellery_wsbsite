/**
 * loading.tsx — Shop Catalog Suspense Skeleton
 *
 * Next.js App Router automatically renders this file while the page
 * is fetching server data. It perfectly mimics the shape of the
 * Shop page layout: editorial banner → sidebar + product grid.
 *
 * Design: animate-pulse Tailwind skeleton using bg-champagne-bg and
 * bg-gray-200 tones that match the brand palette — no jarring grey boxes.
 */

export default function ShopLoading() {
  return (
    <div className="flex flex-col w-full animate-pulse">

      {/* ── Editorial Banner Skeleton ─────────────────────────────────── */}
      <div className="bg-champagne-bg py-16 px-8 border-b border-gray-200/40">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-4">
          {/* Eyebrow label */}
          <div className="h-2.5 w-48 bg-gray-200 rounded-full" />
          {/* H1 headline */}
          <div className="h-10 w-72 bg-gray-200 rounded-sm mt-1" />
          {/* Sub-copy — two lines */}
          <div className="flex flex-col items-center gap-2 mt-2 w-full max-w-md">
            <div className="h-3 w-full bg-gray-200/70 rounded-full" />
            <div className="h-3 w-4/5 bg-gray-200/70 rounded-full" />
          </div>
        </div>
      </div>

      {/* ── Main Content — Sidebar + Grid ─────────────────────────────── */}
      <div className="max-w-7xl mx-auto w-full px-8 py-14 flex flex-col lg:flex-row gap-10 items-start">

        {/* ── Sidebar skeleton ─────────────────────────────────────────── */}
        <aside className="w-full lg:w-[22%] shrink-0 flex flex-col gap-8">
          {/* Result count */}
          <div className="h-3 w-16 bg-gray-200 rounded-full" />

          {[0, 1, 2].map((group) => (
            <div key={group} className="flex flex-col gap-4">
              {/* Filter group header */}
              <div className="h-2.5 w-20 bg-brand-gold/20 rounded-full" />
              <div className="h-px w-full bg-gray-200" />
              {/* Filter options */}
              {Array.from({ length: 4 + group }).map((_, i) => (
                <div key={i} className="h-3 bg-gray-200/70 rounded-full" style={{ width: `${60 + i * 8}%` }} />
              ))}
            </div>
          ))}
        </aside>

        {/* ── Product Grid skeleton ─────────────────────────────────────── */}
        <main className="flex-1 min-w-0">
          {/* Sort row */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200/40">
            <div className="h-3 w-32 bg-gray-200 rounded-full" />
            <div className="h-6 w-28 bg-gray-200 rounded-sm" />
          </div>

          {/* Grid — 3 columns on xl, 2 on md, 1 on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col bg-white border border-gray-200/60 overflow-hidden"
              >
                {/* Product image placeholder — strict 4:5 ratio */}
                <div className="aspect-4/5 bg-champagne-bg w-full" />

                {/* Metadata block */}
                <div className="flex flex-col gap-3 p-5 border-t border-gray-100">
                  {/* Product name */}
                  <div className="h-4 w-3/4 bg-gray-200 rounded-sm" />
                  {/* Weight spec */}
                  <div className="h-3 w-1/2 bg-gray-200/70 rounded-full" />

                  {/* Price row */}
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex flex-col gap-1.5">
                      <div className="h-4 w-24 bg-gray-200 rounded-sm" />
                      <div className="h-2.5 w-16 bg-gray-200/60 rounded-full" />
                    </div>
                    {/* CTA button ghost */}
                    <div className="h-8 w-24 bg-champagne-bg border border-gray-200 rounded-sm" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
