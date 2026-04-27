import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/utilities/ui'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import type { Media as MediaType } from '@/payload-types'
import { Media } from '@/components/Media'

export const maritimeLinks = [
  { href: '/berita', label: 'Baca Berita' },
  { href: '/struktur', label: 'Struktur' },
  { href: '/pendaftaran', label: 'Daftar Kader' },
  { href: '/absensi', label: 'Absen' },
]

export const SectionHeading: React.FC<{
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
}> = ({ eyebrow, title, description, align = 'left' }) => {
  return (
    <div className={cn('space-y-3', align === 'center' && 'text-center')}>
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#735c00]">
          {eyebrow}
        </p>
      )}
      <h2 className="font-serif text-4xl font-semibold tracking-tight text-[#1c1b1b]">{title}</h2>
      {description && <p className="max-w-2xl text-base leading-7 text-[#434750]">{description}</p>}
    </div>
  )
}

export const PageHero: React.FC<{
  badge?: React.ReactNode
  title: string
  description?: string
  cta?: { href: string; label: string }
  image?: MediaType | string | number | null
  size?: 'home' | 'inner'
}> = ({ badge, title, description, cta, image, size = 'inner' }) => {
  const paddingClass = size === 'home' ? 'py-24 md:py-32' : 'py-14 md:py-20'
  const headingClass = size === 'home' ? 'text-5xl md:text-6xl' : 'text-4xl md:text-5xl'

  return (
    <section className={`relative overflow-hidden bg-[linear-gradient(135deg,#002957_0%,#003f7f_100%)] px-6 text-center text-white md:px-8 ${paddingClass}`}>
      {image && typeof image === 'object' && 'url' in image && image.url && (
        <div className="absolute inset-0 overflow-hidden">
          <Media resource={image} fill imgClassName="object-cover opacity-25" />
        </div>
      )}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,224,136,0.15),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(214,227,255,0.16),transparent_30%)]" />
      <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-6">
        {badge}
        <h1 className={`font-serif font-semibold tracking-tight ${headingClass}`}>{title}</h1>
        {description && <p className="max-w-2xl text-lg leading-8 text-[#d6e3ff]">{description}</p>}
        {cta && (
          <Button
            asChild
            className="h-auto rounded-md bg-[#fed65b] px-6 py-4 text-xs font-semibold tracking-[0.22em] text-[#745c00] uppercase hover:bg-[#ffe088]"
            size="clear"
          >
            <Link href={cta.href}>
              {cta.label}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        )}
      </div>
    </section>
  )
}

export const MaritimePanel: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return (
    <Card
      className={cn(
        'rounded-xl border border-[#c3c6d2] bg-white shadow-[0_4px_12px_rgba(28,27,27,0.05)]',
        className,
      )}
      {...props}
    />
  )
}

export const QuickLinks: React.FC = () => {
  return <QuickLinksList items={maritimeLinks} />
}

export const QuickLinksList: React.FC<{
  items: Array<{
    href: string
    label: string
  }>
}> = ({ items }) => {
  return (
    <section className="relative overflow-hidden bg-[#e5e2e1] px-6 py-16 md:px-8">
      <div className="absolute right-0 top-0 size-72 translate-x-1/3 -translate-y-1/3 rounded-full bg-[#d6e3ff] blur-3xl" />
      <div className="container relative grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {items.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-xl border border-[#315ea0] bg-[#002957]/95 p-6 text-center text-white shadow-md transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="mb-4 inline-flex size-12 items-center justify-center rounded-full bg-[#fed65b]/15 text-[#fed65b]">
              <ArrowRight className="size-5" />
            </div>
            <h3 className="text-lg font-semibold">{link.label}</h3>
          </Link>
        ))}
      </div>
    </section>
  )
}

export const MaritimeEmptyState: React.FC<{
  description: string
  title: string
}> = ({ description, title }) => {
  return (
    <MaritimePanel className="p-8 text-center">
      <h3 className="text-2xl font-semibold text-[#1c1b1b]">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-[#434750]">{description}</p>
    </MaritimePanel>
  )
}
