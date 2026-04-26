'use client'

import { useLivePreview } from '@payloadcms/live-preview-react'

import { getClientSideURL } from '@/utilities/getURL'
import { BeritaDetailContent } from './BeritaDetailContent'

export default function BeritaDetailPreview({
  newsPage,
  post,
}: {
  newsPage: any
  post: any
}) {
  const liveNewsPage = useLivePreview({
    depth: 1,
    initialData: newsPage,
    serverURL: getClientSideURL(),
  })
  const livePost = useLivePreview({
    depth: 1,
    initialData: post,
    serverURL: getClientSideURL(),
  })

  return <BeritaDetailContent newsPage={liveNewsPage.data} post={livePost.data} />
}
