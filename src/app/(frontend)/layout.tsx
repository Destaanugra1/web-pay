import type { Metadata } from 'next'

import { FrontendChrome } from '@/components/maritime/FrontendChrome'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { queryGlobal } from '@/utilities/getFrontendData'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()
  const [header, footer, siteSettings] = await Promise.all([
    queryGlobal('header', 1),
    queryGlobal('footer', 1),
    queryGlobal('site-settings', 1),
  ])

  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />
          {isEnabled && <LivePreviewListener />}

          <FrontendChrome
            footer={footer}
            header={header}
            preview={isEnabled}
            siteSettings={siteSettings}
          >
            {children}
          </FrontendChrome>
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
