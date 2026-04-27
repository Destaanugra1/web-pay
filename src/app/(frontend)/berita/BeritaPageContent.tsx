import { Media } from '@/components/Media'
import {
  MaritimeEmptyState,
  MaritimePanel,
  PageHero,
  SectionHeading,
} from '@/components/maritime/site'
import type { Post } from '@/payload-types'
import { ArrowRight, CalendarDays } from 'lucide-react'
import Link from 'next/link'

export function BeritaPageContent({
  newsPage,
  posts,
}: {
  newsPage: any
  posts: Post[]
}) {
  const [featured, ...rest] = posts
  const secondary = rest.slice(0, 2)
  const archive = rest.slice(2)
  const readMoreLabel = newsPage.listing?.readMoreLabel || 'Baca selengkapnya'

  return (
    <>
      <PageHero
        image={newsPage.bannerBackgroundImage}
        badge={
          typeof newsPage.heroImage === 'object' && newsPage.heroImage?.url ? (
            <div className="size-24 overflow-hidden rounded-full border-4 border-[#fed65b] bg-white shadow-xl">
              <Media resource={newsPage.heroImage} className="h-full w-full object-cover" />
            </div>
          ) : undefined
        }
        title={newsPage.heroTitle || ''}
        description={newsPage.heroDescription || ''}
      />

      <section className="px-6 py-16 md:px-8">
        <div className="container space-y-14">

          {/* Header listing */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <SectionHeading
              eyebrow={newsPage.listing?.eyebrow || undefined}
              title={newsPage.listing?.title || ''}
              description={newsPage.listing?.description || undefined}
            />
          </div>

          {featured ? (
            <div className="grid gap-8 lg:grid-cols-3">

              {/* Featured post — gambar penuh dengan overlay */}
              <Link
                href={`/berita/${featured.slug}`}
                className="group relative lg:col-span-2 overflow-hidden rounded-2xl shadow-lg"
              >
                <div className="aspect-[16/9] w-full overflow-hidden">
                  <NewsMedia post={featured} className="h-full w-full transition duration-500 group-hover:scale-105" />
                </div>
                {/* Gradient overlay dari bawah */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                  <Tag text={getCategory(featured)} variant="gold" />
                  <h2 className="mt-3 text-2xl font-semibold leading-snug text-white md:text-3xl line-clamp-2">
                    {featured.title}
                  </h2>
                  {(featured.excerpt || featured.meta?.description) && (
                    <p className="mt-2 text-sm leading-6 text-white/75 line-clamp-2">
                      {featured.excerpt || featured.meta?.description}
                    </p>
                  )}
                  <div className="mt-4 flex items-center gap-3">
                    <DateBadge value={featured.publishedAt || featured.createdAt} />
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#fed65b]">
                      {readMoreLabel} <ArrowRight className="size-3" />
                    </span>
                  </div>
                </div>
              </Link>

              {/* 2 kartu sisi */}
              <div className="flex flex-col gap-6">
                {secondary.length > 0 ? secondary.map((post) => (
                  <Link key={post.id} href={`/berita/${post.slug}`} className="group flex-1">
                    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-[#e0e2e8] bg-white shadow-sm transition hover:shadow-md">
                      <div className="aspect-[16/8] w-full overflow-hidden">
                        <NewsMedia post={post} className="h-full w-full transition duration-500 group-hover:scale-105" />
                      </div>
                      <div className="flex flex-1 flex-col gap-2 p-5">
                        <Tag text={getCategory(post)} />
                        <h3 className="line-clamp-2 text-base font-semibold text-[#1c1b1b] transition group-hover:text-[#003f7f]">
                          {post.title}
                        </h3>
                        {(post.excerpt || post.meta?.description) && (
                          <p className="line-clamp-2 text-xs leading-5 text-[#737781]">
                            {post.excerpt || post.meta?.description}
                          </p>
                        )}
                        <DateBadge value={post.publishedAt || post.createdAt} className="mt-auto pt-2" />
                      </div>
                    </div>
                  </Link>
                )) : (
                  <div className="flex flex-1 items-center justify-center rounded-2xl border border-dashed border-[#c3c6d2] p-8 text-center text-sm text-[#737781]">
                    Tambah lebih banyak artikel untuk mengisi kolom ini.
                  </div>
                )}
              </div>
            </div>
          ) : (
            <MaritimeEmptyState
              title="Belum ada berita terbit"
              description="Publikasikan artikel pertama pada koleksi Berita untuk mengisi halaman ini."
            />
          )}

          {/* Arsip berita — grid 3 kolom */}
          {archive.length > 0 && (
            <section className="space-y-8">
              <div className="flex items-center gap-4">
                <SectionHeading title={newsPage.listing?.archiveTitle || 'Semua Berita'} />
                <div className="flex-1 border-t border-[#e0e2e8]" />
              </div>
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {archive.map((post) => (
                  <Link key={post.id} href={`/berita/${post.slug}`} className="group">
                    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-[#e0e2e8] bg-white shadow-sm transition hover:shadow-md">
                      <div className="aspect-[16/9] w-full overflow-hidden">
                        <NewsMedia post={post} className="h-full w-full transition duration-500 group-hover:scale-105" />
                      </div>
                      <div className="flex flex-1 flex-col gap-2 p-5">
                        <Tag text={getCategory(post)} />
                        <h3 className="line-clamp-2 text-lg font-semibold text-[#1c1b1b] transition group-hover:text-[#003f7f]">
                          {post.title}
                        </h3>
                        {(post.excerpt || post.meta?.description) && (
                          <p className="line-clamp-3 text-sm leading-6 text-[#434750]">
                            {post.excerpt || post.meta?.description}
                          </p>
                        )}
                        <div className="mt-auto flex items-center justify-between pt-3">
                          <DateBadge value={post.publishedAt || post.createdAt} />
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#003f7f]">
                            {readMoreLabel} <ArrowRight className="size-3" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

        </div>
      </section>
    </>
  )
}

// ─── Helper components ────────────────────────────────────────────────────────

function NewsMedia({ post, className }: { post: Post; className: string }) {
  const image = post.heroImage || post.meta?.image
  if (image && typeof image !== 'string') {
    return <Media resource={image} className={className} imgClassName="object-cover w-full h-full" />
  }
  return <div className={`${className} bg-[linear-gradient(135deg,#d6e3ff_0%,#315ea0_50%,#002957_100%)]`} />
}

function Tag({
  text,
  variant = 'blue',
}: {
  text: string
  variant?: 'blue' | 'gold'
}) {
  if (!text) return null
  const cls =
    variant === 'gold'
      ? 'bg-[#fed65b] text-[#745c00]'
      : 'bg-[#d6e3ff] text-[#003f7f]'
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${cls}`}
    >
      {text}
    </span>
  )
}

function DateBadge({
  value,
  className = '',
}: {
  value?: string | null
  className?: string
}) {
  if (!value) return null
  const date = new Date(value)
  if (isNaN(date.getTime())) return null
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs text-[#737781] ${className}`}>
      <CalendarDays className="size-3.5" />
      {new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(date)}
    </span>
  )
}

function getCategory(post: Post) {
  const category = post.categories?.[0]
  return typeof category === 'object' && category?.title ? category.title : ''
}
