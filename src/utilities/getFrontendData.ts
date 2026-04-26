import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import { cache } from 'react'

export const queryGlobal = cache(async (slug: string, depth = 1): Promise<any> => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  return (payload as any).findGlobal({
    slug: slug as never,
    depth,
    draft,
  })
})

export const queryPublishedPosts = cache(async (limit = 9) => {
  const payload = await getPayload({ config: configPromise })

  return payload.find({
    collection: 'posts',
    depth: 1,
    draft: false,
    limit,
    overrideAccess: false,
    sort: '-publishedAt',
  })
})
