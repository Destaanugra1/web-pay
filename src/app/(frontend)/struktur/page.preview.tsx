'use client'

import { useLivePreview } from '@payloadcms/live-preview-react'

import { getClientSideURL } from '@/utilities/getURL'
import { StrukturPageContent } from './StrukturPageContent'

export default function StrukturPagePreview({ structure }: { structure: any }) {
  const { data } = useLivePreview({
    depth: 2,
    initialData: structure,
    serverURL: getClientSideURL(),
  })

  return <StrukturPageContent structure={data} />
}
