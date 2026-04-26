'use client'

import { useLivePreview } from '@payloadcms/live-preview-react'

import { getClientSideURL } from '@/utilities/getURL'
import { BeritaPageContent } from './BeritaPageContent'

export default function BeritaPagePreview({
  newsPage,
  posts,
}: {
  newsPage: any
  posts: any[]
}) {
  const { data } = useLivePreview({
    depth: 1,
    initialData: newsPage,
    serverURL: getClientSideURL(),
  })

  return <BeritaPageContent newsPage={data} posts={posts} />
}
