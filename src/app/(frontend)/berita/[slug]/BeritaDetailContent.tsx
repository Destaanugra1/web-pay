import { Media } from '@/components/Media'
import { MaritimeEmptyState, MaritimePanel } from '@/components/maritime/site'
import RichText from '@/components/RichText'
import type { Post } from '@/payload-types'
import { CalendarDays, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { ShareButtons } from './ShareButtons'

export function BeritaDetailContent({
  newsPage,
  post,
}: {
  newsPage: any
  post: Post
}) {
  const related = (post.relatedPosts || []).filter(isPost).slice(0, 3)

  return (
    <article className="px-6 py-16 md:px-8">
      <div className="container grid gap-8 lg:grid-cols-12">
        <div className="space-y-8 lg:col-span-8">
          <MaritimePanel className="overflow-hidden p-0">
            <div className="p-8 md:p-10">
              <div className="flex flex-wrap items-center gap-4 text-sm text-[#737781]">
                <Tag text={getCategory(post)} />
                <span className="inline-flex items-center gap-2">
                  <CalendarDays className="size-4" />
                  {formatDate(post.publishedAt || post.createdAt)}
                </span>
              </div>
              <h1 className="mt-6 text-5xl font-semibold leading-tight text-[#1c1b1b]">
                {post.title}
              </h1>
              {(post.excerpt || post.meta?.description) && (
                <p className="mt-4 max-w-3xl text-base leading-8 text-[#434750]">
                  {post.excerpt || post.meta?.description}
                </p>
              )}
            </div>
            <NewsMedia post={post} className="aspect-[16/8]" />
            <div className="p-8 md:p-10">
              <RichText
                className="max-w-none prose-headings:font-serif prose-p:text-[#434750]"
                data={post.content}
                enableGutter={false}
              />
              {newsPage.detail?.highlightText && (
                <div className="mt-8 rounded-lg border-l-4 border-[#fed65b] bg-[#f0eded] p-6 text-[#434750]">
                  {newsPage.detail.highlightText}
                </div>
              )}
            </div>
          </MaritimePanel>
        </div>

        <aside className="space-y-6 lg:col-span-4">
          <MaritimePanel className="p-6">
            <div className="flex items-center gap-2 text-lg font-semibold text-[#1c1b1b]">
              <TrendingUp className="size-5 text-[#735c00]" />
              {newsPage.detail?.trendingTitle || 'Trending'}
            </div>
            <div className="mt-5 space-y-4">
              {related.length > 0 ? (
                related.map((item) => (
                  <Link
                    key={item.id}
                    href={`/berita/${item.slug}`}
                    className="block rounded-lg bg-[#f6f3f2] p-4 transition hover:bg-[#f0eded]"
                  >
                    <div className="text-sm font-semibold text-[#1c1b1b]">{item.title}</div>
                    {getCategory(item) && (
                      <div className="mt-2 text-xs uppercase tracking-[0.16em] text-[#737781]">
                        {getCategory(item)}
                      </div>
                    )}
                  </Link>
                ))
              ) : (
                <MaritimeEmptyState
                  title="Belum ada berita terkait"
                  description="Tambahkan relasi artikel pada koleksi Berita untuk mengisi panel ini."
                />
              )}
            </div>
          </MaritimePanel>
          <ShareButtons
            title={post.title}
            shareTitle={newsPage.detail?.shareTitle}
            shareDescription={newsPage.detail?.shareDescription}
          />
        </aside>
      </div>
    </article>
  )
}

function NewsMedia({ post, className }: { post: Post; className: string }) {
  const image = post.heroImage || post.meta?.image

  if (image && typeof image !== 'string') {
    return <Media resource={image} className={className} />
  }

  return <div className={`${className} bg-[linear-gradient(135deg,#d6e3ff_0%,#315ea0_50%,#002957_100%)]`} />
}

function Tag({ text }: { text: string }) {
  if (!text) return null

  return (
    <span className="rounded-full bg-[#d6e3ff] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#003f7f]">
      {text}
    </span>
  )
}

function getCategory(post: Post) {
  const category = post.categories?.[0]
  return typeof category === 'object' && category?.title ? category.title : ''
}

function formatDate(value: string | null | undefined) {
  if (!value) return '—'
  const date = new Date(value)
  if (isNaN(date.getTime())) return '—'
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

function isPost(value: number | Post): value is Post {
  return typeof value === 'object'
}
