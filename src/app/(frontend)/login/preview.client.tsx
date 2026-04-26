'use client'

import { useLivePreview } from '@payloadcms/live-preview-react'

import { getClientSideURL } from '@/utilities/getURL'
import { LoginPageContent } from './LoginPageContent'

export default function LoginPagePreview({ loginPage }: { loginPage: any }) {
  const { data } = useLivePreview({
    depth: 1,
    initialData: loginPage,
    serverURL: getClientSideURL(),
  })

  return <LoginPageContent loginPage={data} />
}
