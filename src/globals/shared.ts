import type { PayloadRequest } from 'payload'

import { getServerSideURL } from '@/utilities/getURL'

const globalRouteMap = {
  'gallery-page': '/foto',
  'home-page': '/',
  'login-page': '/login',
  'news-page': '/berita',
  'organization-structure': '/struktur',
  'registration-page': '/pendaftaran',
  'site-settings': '/',
} as const

export const getGlobalPreviewPath = (slug: keyof typeof globalRouteMap) => {
  const path = globalRouteMap[slug]
  const encodedParams = new URLSearchParams({
    path,
    previewSecret: process.env.PREVIEW_SECRET || '',
  })

  return `/next/preview?${encodedParams.toString()}`
}

export const getGlobalLivePreviewURL = ({
  slug,
}: {
  req: PayloadRequest
  slug: keyof typeof globalRouteMap
}) => {
  return `${getServerSideURL()}${getGlobalPreviewPath(slug)}`
}
