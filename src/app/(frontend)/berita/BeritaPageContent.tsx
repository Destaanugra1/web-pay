import { Media } from '@/components/Media'
import {
  MaritimeEmptyState,
  MaritimePanel,
  PageHero,
  SectionHeading,
} from '@/components/maritime/site'
import type { Post } from '@/payload-types'
import { ArrowRight, Search } from 'lucide-react'
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
  const readMoreLabel = newsPage.listing?.readMoreLabel || ''

  return (
    <>
      <PageHero
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
        <div className="container space-y-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <SectionHeading
              eyebrow={newsPage.listing?.eyebrow || undefined}
              title={newsPage.listing?.title || ''}
              description={newsPage.listing?.description || undefined}
            />
            <div className="relative w-full md:w-72">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#737781]" />
              <input
                className="h-11 w-full rounded-lg border border-[#c3c6d2] bg-white pl-10 pr-4 outline-none ring-[#315ea0] transition focus:ring-2"
                placeholder={newsPage.listing?.searchPlaceholder || ''}
                readOnly
              />
            </div>
          </div>

          {featured ? (
            <div className="grid gap-6 lg:grid-cols-3">
              <Link
                href={`/berita/${featured.slug}`}
                className="group overflow-hidden rounded-xl border-t-4 border-[#fed65b] bg-white shadow-[0_4px_12px_rgba(28,27,27,0.05)] lg:col-span-2"
              >
                <NewsMedia post={featured} className="aspect-[16/9]" />
                <div className="space-y-4 p-6 md:p-8">
                  <Tag text={getCategory(featured)} />
                  <h2 className="text-4xl font-semibold text-[#1c1b1b] transition group-hover:text-[#003f7f]">
                    {featured.title}
                  </h2>
                  {featured.meta?.description && (
                    <p className="max-w-3xl text-sm leading-7 text-[#434750]">
                      {featured.meta.description}
                    </p>
                  )}
                  {readMoreLabel && (
                    <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#003f7f]">
                      {readMoreLabel}
                      <ArrowRight className="size-4" />
                    </span>
                  )}
                </div>
              </Link>

              <div className="space-y-6">
                {secondary.map((post, index) => (
                  <NewsCard
                    key={post.id}
                    post={post}
                    accent={index === 0 ? '#003f7f' : '#394146'}
                    readMoreLabel={readMoreLabel}
                  />
                ))}
              </div>
            </div>
          ) : (
            <MaritimeEmptyState
              title="Belum ada berita terbit"
              description="Publikasikan artikel pertama pada koleksi Berita untuk mengisi halaman ini."
            />
          )}

          {archive.length > 0 && (
            <section className="space-y-6">
              <SectionHeading title={newsPage.listing?.archiveTitle || 'Arsip berita'} />
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {archive.map((post) => (
                  <NewsCard key={post.id} post={post} accent="#003f7f" readMoreLabel={readMoreLabel} />
                ))}
              </div>
            </section>
          )}
        </div>
      </section>
    </>
  )
}

function NewsCard({
  post,
  accent,
  readMoreLabel,
}: {
  accent: string
  post: Post
  readMoreLabel: string
}) {
  return (
    <Link href={`/berita/${post.slug}`}>
      <MaritimePanel className="group h-full overflow-hidden border-t-4" style={{ borderTopColor: accent }}>
        <NewsMedia post={post} className="aspect-[16/10]" />
        <div className="space-y-3 p-5">
          <Tag text={getCategory(post)} />
          <h3 className="text-2xl font-semibold text-[#1c1b1b] transition group-hover:text-[#003f7f]">
            {post.title}
          </h3>
          {post.meta?.description && (
            <p className="text-sm leading-6 text-[#434750]">{post.meta.description}</p>
          )}
          {readMoreLabel && (
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#003f7f]">
              {readMoreLabel}
              <ArrowRight className="size-4" />
            </span>
          )}
        </div>
      </MaritimePanel>
    </Link>
  )
}

function NewsMedia({ post, className }: { post: Post; className: string }) {
  const image = post.meta?.image

  if (image && typeof image !== 'string') {
    return <Media resource={image} className={className} />
  }

  return <div className={`${className} bg-[linear-gradient(135deg,#d6e3ff_0%,#315ea0_50%,#002957_100%)]`} />
}

function Tag({ text }: { text: string }) {
  if (!text) return null

  return (
    <span className="inline-flex rounded-full bg-[#d6e3ff] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#003f7f]">
      {text}
    </span>
  )
}

function getCategory(post: Post) {
  const category = post.categories?.[0]
  return typeof category === 'object' && category?.title ? category.title : ''
}
