import { Media } from '@/components/Media'
import {
  MaritimeEmptyState,
  MaritimePanel,
  PageHero,
  QuickLinksList,
  SectionHeading,
} from '@/components/maritime/site'
import type { Media as MediaType, Post } from '@/payload-types'
import { resolveCMSLink } from '@/utilities/resolveCMSLink'
import { ArrowRight, Building2, CalendarDays, Newspaper, Sailboat, Users } from 'lucide-react'
import Link from 'next/link'

const iconMap = {
  building: Building2,
  calendar: CalendarDays,
  news: Newspaper,
  sailboat: Sailboat,
  users: Users,
}

export function HomePageContent({
  homePage,
  posts,
  structure,
}: {
  homePage: any
  posts: Post[]
  structure: any
}) {
  const heroCTA = resolveCMSLink(homePage.heroCTA || null)
  const quickLinks = (homePage.quickLinks || [])
    .map((item: { link?: Parameters<typeof resolveCMSLink>[0] }) =>
      resolveCMSLink(item?.link || null),
    )
    .filter(
      (
        item: ReturnType<typeof resolveCMSLink>,
      ): item is NonNullable<ReturnType<typeof resolveCMSLink>> => Boolean(item),
    )
  const boardMembers = [structure.leader, ...(structure.coreMembers || [])].filter(
    (member?: { name?: string | null }) => Boolean(member?.name),
  )
  const featuredPost = posts[0]
  const sidePosts = posts.slice(1, 3)

  return (
    <>
      <PageHero
        badge={
          typeof homePage.heroImage === 'object' && homePage.heroImage?.url ? (
            <div className="size-28 overflow-hidden rounded-full border-4 border-[#fed65b] bg-white shadow-xl">
              <Media resource={homePage.heroImage} className="h-full w-full object-cover" />
            </div>
          ) : (
            <div className="flex size-28 items-center justify-center rounded-full border-4 border-[#fed65b] bg-white/10 text-3xl font-semibold text-[#fed65b] shadow-xl">
              {homePage.heroBadgeText || 'IKMA'}
            </div>
          )
        }
        title={homePage.heroTitle || ''}
        description={homePage.heroDescription || ''}
        cta={heroCTA ? { href: heroCTA.href, label: heroCTA.label } : undefined}
      />

      <section className="bg-[#f6f3f2] px-6 py-20 md:px-8">
        <div className="container grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <SectionHeading
              eyebrow={homePage.aboutSection?.eyebrow || undefined}
              title={homePage.aboutSection?.title || ''}
              description={homePage.aboutSection?.description || undefined}
            />
            {(homePage.aboutSection?.cards || []).length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {homePage.aboutSection.cards.map(
                  (card: {
                    description?: string | null
                    icon?: keyof typeof iconMap | null
                    id?: string | null
                    title?: string | null
                  }) => {
                    const Icon = iconMap[card.icon || 'users'] || Users

                    return (
                      <MaritimePanel
                        key={card.id || card.title}
                        className="border-t-4 border-[#003f7f] p-5"
                      >
                        <div className="mb-3 inline-flex size-11 items-center justify-center rounded-full bg-[#d6e3ff] text-[#003f7f]">
                          <Icon className="size-5" />
                        </div>
                        <h3 className="text-xl font-semibold text-[#1c1b1b]">{card.title}</h3>
                        {card.description && (
                          <p className="mt-2 text-sm leading-6 text-[#434750]">{card.description}</p>
                        )}
                      </MaritimePanel>
                    )
                  },
                )}
              </div>
            ) : (
              <MaritimeEmptyState
                title="Konten pengenalan belum diisi"
                description="Tambahkan kartu pengenalan di global Home Page agar bagian ini tampil lengkap."
              />
            )}
          </div>
          <MaritimePanel className="overflow-hidden p-2">
            <div className="relative aspect-[4/3] rounded-lg bg-[linear-gradient(135deg,#003f7f_0%,#315ea0_45%,#d6e3ff_100%)] p-8 text-white">
              {typeof homePage.showcase?.image === 'object' && homePage.showcase?.image?.url && (
                <div className="absolute inset-0">
                  <Media
                    resource={homePage.showcase.image}
                    className="h-full w-full object-cover opacity-30"
                  />
                </div>
              )}
              <div className="relative flex h-full flex-col justify-between rounded-lg border border-white/20 bg-black/10 p-6 backdrop-blur-sm">
                {homePage.showcase?.label && (
                  <p className="max-w-sm text-sm uppercase tracking-[0.22em] text-[#fed65b]">
                    {homePage.showcase.label}
                  </p>
                )}
                {homePage.showcase?.description && (
                  <p className="max-w-md text-lg leading-8 text-[#f3f0ef]">
                    {homePage.showcase.description}
                  </p>
                )}
              </div>
            </div>
          </MaritimePanel>
        </div>
      </section>

      {(homePage.stats || []).length > 0 && (
        <section className="px-6 py-16 md:px-8">
          <div className="container grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {homePage.stats.map(
              (stat: {
                icon?: keyof typeof iconMap | null
                id?: string | null
                label?: string | null
                value?: string | null
              }) => {
                const Icon = iconMap[stat.icon || 'users'] || Users

                return (
                  <MaritimePanel
                    key={stat.id || stat.label}
                    className="border-none bg-[#002957] p-6 text-center text-white shadow-md"
                  >
                    <div className="mb-4 inline-flex size-12 items-center justify-center rounded-full bg-white/10 text-[#fed65b]">
                      <Icon className="size-5" />
                    </div>
                    <div className="font-serif text-4xl text-[#fed65b]">{stat.value}</div>
                    <div className="mt-2 text-xs uppercase tracking-[0.24em] text-[#d6e3ff]">
                      {stat.label}
                    </div>
                  </MaritimePanel>
                )
              },
            )}
          </div>
        </section>
      )}

      <section className="bg-[#f6f3f2] px-6 py-20 md:px-8">
        <div className="container space-y-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              title={homePage.newsSection?.title || ''}
              description={homePage.newsSection?.description || undefined}
            />
            {homePage.newsSection?.ctaLabel && (
              <Link
                href="/berita"
                className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#003f7f]"
              >
                {homePage.newsSection.ctaLabel}
                <ArrowRight className="size-4" />
              </Link>
            )}
          </div>
          {featuredPost ? (
            <div className="grid gap-6 md:grid-cols-3">
              <Link
                href={`/berita/${featuredPost.slug}`}
                className="group relative min-h-[22rem] overflow-hidden rounded-xl border-t-4 border-[#fed65b] bg-[linear-gradient(135deg,#002957_0%,#315ea0_100%)] p-8 text-white shadow-md md:col-span-2"
              >
                <div className="absolute inset-0 opacity-20">
                  <PostMedia post={featuredPost} className="h-full w-full object-cover" />
                </div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_35%)]" />
                <div className="relative flex h-full flex-col justify-end">
                  {getCategory(featuredPost) && (
                    <span className="mb-4 w-fit rounded-full bg-[#fed65b] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#745c00]">
                      {getCategory(featuredPost)}
                    </span>
                  )}
                  <h3 className="max-w-xl text-3xl font-semibold">{featuredPost.title}</h3>
                  {featuredPost.meta?.description && (
                    <p className="mt-3 max-w-lg text-sm leading-7 text-[#d6e3ff]">
                      {featuredPost.meta.description}
                    </p>
                  )}
                </div>
              </Link>
              <div className="space-y-6">
                {sidePosts.map((post) => (
                  <Link key={post.id} href={`/berita/${post.slug}`}>
                    <MaritimePanel className="border-t-4 border-[#003f7f] p-5">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#003f7f]">
                        {getCategory(post)}
                      </span>
                      <h3 className="mt-3 text-xl font-semibold text-[#1c1b1b]">{post.title}</h3>
                      {post.meta?.description && (
                        <p className="mt-2 text-sm leading-6 text-[#434750]">
                          {post.meta.description}
                        </p>
                      )}
                    </MaritimePanel>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <MaritimeEmptyState
              title="Belum ada berita terbit"
              description="Konten berita akan muncul di sini setelah koleksi Berita memiliki artikel yang dipublikasikan."
            />
          )}
        </div>
      </section>

      <section className="px-6 py-20 md:px-8">
        <div className="container space-y-10">
          <SectionHeading
            align="center"
            title={homePage.leadershipSection?.title || ''}
            description={homePage.leadershipSection?.description || undefined}
          />
          {boardMembers.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-5">
              {boardMembers.slice(0, 5).map(
                (member: {
                  id?: string | null
                  name?: string | null
                  photo?: MediaType | number | null
                  role?: string | null
                }) => (
                  <div key={member.id || member.name} className="text-center">
                    <MemberAvatar
                      name={member.name || ''}
                      photo={typeof member.photo === 'object' ? member.photo : null}
                    />
                    <h3 className="mt-5 text-xl font-semibold text-[#1c1b1b]">{member.name}</h3>
                    {member.role && (
                      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.22em] text-[#003f7f]">
                        {member.role}
                      </p>
                    )}
                  </div>
                ),
              )}
            </div>
          ) : (
            <MaritimeEmptyState
              title="Struktur pengurus belum diisi"
              description="Tambahkan data pimpinan dan anggota inti pada global Struktur Organisasi untuk menampilkan BPH di beranda."
            />
          )}
        </div>
      </section>

      <QuickLinksList
        items={quickLinks.length > 0 ? quickLinks : [{ href: '/berita', label: 'Berita' }]}
      />
    </>
  )
}

function PostMedia({ post, className }: { post: Post; className: string }) {
  const image = post.heroImage || post.meta?.image

  if (image && typeof image === 'object') {
    return <Media resource={image} className={className} />
  }

  return <div className={`${className} bg-[linear-gradient(135deg,#d6e3ff_0%,#315ea0_50%,#002957_100%)]`} />
}

function MemberAvatar({
  name,
  photo,
}: {
  name: string
  photo?: MediaType | null
}) {
  if (photo?.url) {
    return (
      <div className="mx-auto size-28 overflow-hidden rounded-full border-2 border-[#fed65b] bg-white">
        <Media resource={photo} className="h-full w-full object-cover" />
      </div>
    )
  }

  return (
    <div className="mx-auto flex size-28 items-center justify-center rounded-full border-2 border-[#fed65b] bg-[linear-gradient(135deg,#d6e3ff,#ffffff)] text-2xl font-semibold text-[#003f7f]">
      {name
        .split(' ')
        .map((part) => part[0])
        .slice(0, 2)
        .join('')}
    </div>
  )
}

function getCategory(post: Post) {
  const category = post.categories?.[0]
  return typeof category === 'object' && category?.title ? category.title : ''
}
