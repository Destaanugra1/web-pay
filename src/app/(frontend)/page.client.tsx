'use client'

import { useLivePreview } from '@payloadcms/live-preview-react'

import { getClientSideURL } from '@/utilities/getURL'
import { HomePageContent } from './HomePageContent'

export default function HomePagePreview({
  homePage,
  posts,
  structure,
}: {
  homePage: any
  posts: any[]
  structure: any
}) {
  const { data } = useLivePreview({
    depth: 2,
    initialData: homePage,
    serverURL: getClientSideURL(),
  })

  return <HomePageContent homePage={data} posts={posts} structure={structure} />
}
