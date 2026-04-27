'use client'

import { useLivePreview } from '@payloadcms/live-preview-react'
import { getClientSideURL } from '@/utilities/getURL'
import { RenderBlocksPreview } from '@/blocks/RenderBlocksPreview'
import { PageHero } from '@/components/maritime/site'
import React from 'react'
import type { Page } from '@/payload-types'

export default function PagePreview({ initialPage }: { initialPage: Page }) {
  const { data: page } = useLivePreview<Page>({
    initialData: initialPage,
    serverURL: getClientSideURL(),
    depth: 2,
  })

  return (
    <>
      <PageHero 
        title={page.title} 
        description={page.bannerDescription || page.meta?.description || ''} 
        image={page.featuredImage} 
      />
      <RenderBlocksPreview blocks={page.layout} />
    </>
  )
}
