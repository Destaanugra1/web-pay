import { FooterClient } from './Component.client'
import { queryGlobal } from '@/utilities/getFrontendData'

export async function Footer() {
  const [footer, siteSettings] = await Promise.all([
    queryGlobal('footer', 1),
    queryGlobal('site-settings', 1),
  ])

  return <FooterClient footer={footer} siteSettings={siteSettings} />
}
