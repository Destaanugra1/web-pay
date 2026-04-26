'use client'

import type { Header, Footer } from '@/payload-types'

import { FooterClient } from '@/Footer/Component.client'
import { HeaderClient } from '@/Header/Component.client'
import { getClientSideURL } from '@/utilities/getURL'
import { useLivePreview } from '@payloadcms/live-preview-react'
import { usePathname } from 'next/navigation'
import React from 'react'

type SiteSettingsData = {
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

const authRoutes = new Set(['/login'])

export const FrontendChrome: React.FC<{
  children: React.ReactNode
  footer: Footer
  header: Header
  preview?: boolean
  siteSettings: SiteSettingsData
}> = ({ children, footer, header, preview, siteSettings }) => {
  if (preview) {
    return (
      <FrontendChromePreview footer={footer} header={header} siteSettings={siteSettings}>
        {children}
      </FrontendChromePreview>
    )
  }

  return <FrontendChromeStatic footer={footer} header={header} siteSettings={siteSettings}>{children}</FrontendChromeStatic>
}

const FrontendChromeStatic: React.FC<{
  children: React.ReactNode
  footer: Footer
  header: Header
  siteSettings: SiteSettingsData
}> = ({ children, footer, header, siteSettings }) => {
  const pathname = usePathname()
  const hideChrome = authRoutes.has(pathname)

  return (
    <>
      {!hideChrome && <HeaderClient header={header} siteSettings={siteSettings} />}
      {children}
      {!hideChrome && <FooterClient footer={footer} siteSettings={siteSettings} />}
    </>
  )
}

const FrontendChromePreview: React.FC<{
  children: React.ReactNode
  footer: Footer
  header: Header
  siteSettings: SiteSettingsData
}> = ({ children, footer, header, siteSettings }) => {
  const liveHeader = useLivePreview({
    depth: 1,
    initialData: header as any,
    serverURL: getClientSideURL(),
  })
  const liveFooter = useLivePreview({
    depth: 1,
    initialData: footer as any,
    serverURL: getClientSideURL(),
  })
  const liveSiteSettings = useLivePreview({
    depth: 1,
    initialData: siteSettings as any,
    serverURL: getClientSideURL(),
  })

  return (
    <FrontendChromeStatic
      footer={liveFooter.data as Footer}
      header={liveHeader.data as Header}
      siteSettings={liveSiteSettings.data as SiteSettingsData}
    >
      {children}
    </FrontendChromeStatic>
  )
}
