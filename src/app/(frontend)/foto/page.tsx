import { queryGlobal } from '@/utilities/getFrontendData'
import { draftMode } from 'next/headers'

import { FotoPageContent } from './FotoPageContent'
import FotoPagePreview from './page.preview'

export default async function FotoPage() {
  const [galleryPage, { isEnabled }] = await Promise.all([
    queryGlobal('gallery-page', 2),
    draftMode(),
  ])

  if (isEnabled) {
    return <FotoPagePreview galleryPage={galleryPage} />
  }

  return <FotoPageContent galleryPage={galleryPage} />
}
