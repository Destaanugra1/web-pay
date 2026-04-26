'use client'

import Link from 'next/link'
import React from 'react'

import { Logo } from '@/components/Logo/Logo'
import { resolveCMSLink } from '@/utilities/resolveCMSLink'

type FooterClientProps = {
  footer: {
    navItems?: ({
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
    } | null)[] | null
  }
  siteSettings: {
    address?: string | null
    contactSectionTitle?: string | null
    copyright?: string | null
    email?: string | null
    footerDescription?: string | null
    logoImage?: { url?: string | null } | null
    logoMark?: string | null
    logoSubtitle?: string | null
    logoTitle?: string | null
    phone?: string | null
    siteName?: string | null
  }
}

export const FooterClient: React.FC<FooterClientProps> = ({ footer, siteSettings }) => {
  const footerLinks = (footer.navItems || [])
    .map((item) => resolveCMSLink(item?.link || null))
    .filter((item): item is NonNullable<typeof item> => Boolean(item))

  return (
    <footer className="mt-auto border-t-4 border-[#d4af37] bg-[#003f7f] text-white">
      <div className="container grid gap-10 py-14 md:grid-cols-3">
        <div className="space-y-4">
          <Logo
            ariaLabel={siteSettings.siteName || 'Site'}
            markText={siteSettings.logoMark || 'IK'}
            media={siteSettings.logoImage && 'url' in siteSettings.logoImage ? (siteSettings.logoImage as any) : null}
            subtitle={siteSettings.logoSubtitle || ''}
            title={siteSettings.logoTitle || siteSettings.siteName || 'Site'}
          />
          <p className="max-w-xs text-sm leading-6 text-white/75">
            {siteSettings.footerDescription || ''}
          </p>
        </div>
        <div className="space-y-3">
          <h4 className="text-sm font-semibold uppercase tracking-[0.22em] text-[#fed65b]">
            Navigasi
          </h4>
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              {...(link.newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {})}
              className="block text-sm text-white/80 transition hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="space-y-3">
          <h4 className="text-sm font-semibold uppercase tracking-[0.22em] text-[#fed65b]">
            {siteSettings.contactSectionTitle || 'Kontak'}
          </h4>
          {siteSettings.address && <p className="text-sm text-white/80">{siteSettings.address}</p>}
          {siteSettings.email && <p className="text-sm text-white/80">{siteSettings.email}</p>}
          {siteSettings.phone && <p className="text-sm text-white/80">{siteSettings.phone}</p>}
          {siteSettings.copyright && (
            <p className="text-sm text-white/80">{siteSettings.copyright}</p>
          )}
        </div>
      </div>
    </footer>
  )
}
