'use client'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

type HeaderClientProps = {
  header: {
    cta?: {
      label?: string | null
      newTab?: boolean | null
      reference?: {
        relationTo?: 'pages' | 'posts' | null
        value?: { slug?: string | null } | string | number | null
      } | null
      type?: 'custom' | 'reference' | null
      url?: string | null
    } | null
    navItems?: {
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
    }[] | null
  }
  siteSettings: {
    logoImage?: { url?: string | null } | null
    logoMark?: string | null
    logoSubtitle?: string | null
    logoTitle?: string | null
    siteName?: string | null
  }
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ header, siteSettings }) => {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 border-b border-blue-900/60 bg-[#003f7f] text-white shadow-lg">
      <div className="container flex h-20 items-center justify-between gap-6">
        <Link href="/">
          <Logo
            ariaLabel={siteSettings.siteName || 'Ikma SII'}
            markText={siteSettings.logoMark || 'IK'}
            media={siteSettings.logoImage && 'url' in siteSettings.logoImage ? (siteSettings.logoImage as any) : null}
            subtitle={siteSettings.logoSubtitle || ''}
            title={siteSettings.logoTitle || siteSettings.siteName || 'Ikma SII'}
          />
        </Link>
        <HeaderNav cta={header.cta} navItems={header.navItems} pathname={pathname} />
      </div>
    </header>
  )
}
