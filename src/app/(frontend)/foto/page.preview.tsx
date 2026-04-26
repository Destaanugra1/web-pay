'use client'

import { useLivePreview } from '@payloadcms/live-preview-react'

import { getClientSideURL } from '@/utilities/getURL'
import { FotoPageContent } from './FotoPageContent'

export default function FotoPagePreview({ galleryPage }: { galleryPage: any }) {
  const { data } = useLivePreview({
    depth: 2,
    initialData: galleryPage,
    serverURL: getClientSideURL(),
  })

  return <FotoPageContent galleryPage={data} />
}
