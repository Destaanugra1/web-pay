import { HeaderClient } from './Component.client'
import { queryGlobal } from '@/utilities/getFrontendData'
import React from 'react'

export async function Header() {
  const [header, siteSettings] = await Promise.all([
    queryGlobal('header', 1),
    queryGlobal('site-settings', 1),
  ])

  return <HeaderClient header={header} siteSettings={siteSettings} />
}
