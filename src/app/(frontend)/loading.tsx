import { MaritimePanel } from '@/components/maritime/site'

export default function FrontendLoading() {
  return (
    <main className="px-6 py-16 md:px-8">
      <div className="container space-y-6">
        <div className="h-12 w-64 animate-pulse rounded bg-[#d6e3ff]" />
        <div className="h-6 w-full max-w-3xl animate-pulse rounded bg-[#e5e2e1]" />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <MaritimePanel key={index} className="overflow-hidden p-0">
              <div className="aspect-[16/10] animate-pulse bg-[#d6e3ff]" />
              <div className="space-y-3 p-5">
                <div className="h-4 w-24 animate-pulse rounded bg-[#e5e2e1]" />
                <div className="h-6 w-3/4 animate-pulse rounded bg-[#e5e2e1]" />
                <div className="h-4 w-full animate-pulse rounded bg-[#f0eded]" />
              </div>
            </MaritimePanel>
          ))}
        </div>
      </div>
    </main>
  )
}
