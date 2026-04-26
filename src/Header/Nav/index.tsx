'use client'

import { cn } from '@/utilities/ui'
import { resolveCMSLink } from '@/utilities/resolveCMSLink'
import Link from 'next/link'
import React from 'react'

type LinkItem = {
  id?: string | null
  link?: {
    label?: string | null
    newTab?: boolean | null
    reference?: {
      relationTo?: 'pages' | 'posts' | null
      value?: { slug?: string | null } | string | number | null
    } | null
    type?: 'custom' | 'reference' | null
    url?: string | null
  } | null
}

type HeaderNavProps = {
  cta?: LinkItem['link']
  navItems?: (LinkItem | null)[] | null
  pathname: string
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ cta, navItems, pathname }) => {
  const resolvedItems = (navItems || [])
    .map((item) => resolveCMSLink(item?.link || null))
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
  const resolvedCTA = resolveCMSLink(cta || null)

  return (
    <nav className="hidden items-center gap-5 md:flex">
      {resolvedItems.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
        const newTabProps = item.newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

        return (
          <Link
            key={item.href}
            href={item.href}
            {...newTabProps}
            className={cn(
              'border-b-2 border-transparent pb-1 font-medium tracking-[0.08em] uppercase transition hover:text-[#fed65b]',
              active && 'border-[#fed65b] text-[#fed65b]',
            )}
          >
            {item.label}
          </Link>
        )
      })}
      {resolvedCTA && (
        <Link
          href={resolvedCTA.href}
          {...(resolvedCTA.newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {})}
          className="rounded-md border border-[#fed65b] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#fed65b] transition hover:bg-[#fed65b] hover:text-[#003f7f]"
        >
          {resolvedCTA.label}
        </Link>
      )}
    </nav>
  )
}
