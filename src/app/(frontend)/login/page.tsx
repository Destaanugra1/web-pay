import { queryGlobal } from '@/utilities/getFrontendData'
import { draftMode } from 'next/headers'

import { LoginPageContent } from './LoginPageContent'
import LoginPagePreview from './preview.client'

export default async function LoginPage() {
  const [loginPage, { isEnabled }] = await Promise.all([
    queryGlobal('login-page', 1),
    draftMode(),
  ])

  if (isEnabled) {
    return <LoginPagePreview loginPage={loginPage} />
  }

  return <LoginPageContent loginPage={loginPage} />
}
