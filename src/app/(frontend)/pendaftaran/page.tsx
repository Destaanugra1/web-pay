import { queryGlobal } from '@/utilities/getFrontendData'
import { draftMode } from 'next/headers'

import { PendaftaranPageContent } from './PendaftaranPageContent'
import PendaftaranPagePreview from './page.preview'

export default async function PendaftaranPage() {
  const [registrationPage, { isEnabled }] = await Promise.all([
    queryGlobal('registration-page', 1),
    draftMode(),
  ])

  if (isEnabled) {
    return <PendaftaranPagePreview registrationPage={registrationPage} />
  }

  return <PendaftaranPageContent registrationPage={registrationPage} />
}
