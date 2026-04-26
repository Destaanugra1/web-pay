'use client'

import { useLivePreview } from '@payloadcms/live-preview-react'

import { getClientSideURL } from '@/utilities/getURL'
import { PendaftaranPageContent } from './PendaftaranPageContent'

export default function PendaftaranPagePreview({
  registrationPage,
}: {
  registrationPage: any
}) {
  const { data } = useLivePreview({
    depth: 1,
    initialData: registrationPage,
    serverURL: getClientSideURL(),
  })

  return <PendaftaranPageContent registrationPage={data} />
}
