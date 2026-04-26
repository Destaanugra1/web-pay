import { queryGlobal } from '@/utilities/getFrontendData'
import { draftMode } from 'next/headers'

import StrukturPagePreview from './page.preview'
import { StrukturPageContent } from './StrukturPageContent'

export default async function StrukturPage() {
  const [structure, { isEnabled }] = await Promise.all([
    queryGlobal('organization-structure', 2),
    draftMode(),
  ])

  if (isEnabled) {
    return <StrukturPagePreview structure={structure} />
  }

  return <StrukturPageContent structure={structure} />
}
