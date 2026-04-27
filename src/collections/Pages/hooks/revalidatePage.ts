import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import type { Page } from '../../../payload-types'
import { revalidatePathSafe, revalidateTagSafe } from '../../../utilities/revalidate'

export const revalidatePage: CollectionAfterChangeHook<Page> = async ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = doc.slug === 'home' ? '/' : `/${doc.slug}`

      payload.logger.info(`Revalidating page at path: ${path}`)

      await revalidatePathSafe(path)
      await revalidateTagSafe('pages-sitemap', 'max')
    }

    // If the page was previously published, we need to revalidate the old path
    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      const oldPath = previousDoc.slug === 'home' ? '/' : `/${previousDoc.slug}`

      payload.logger.info(`Revalidating old page at path: ${oldPath}`)

      await revalidatePathSafe(oldPath)
      await revalidateTagSafe('pages-sitemap', 'max')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Page> = async ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    const path = doc?.slug === 'home' ? '/' : `/${doc?.slug}`
    await revalidatePathSafe(path)
    await revalidateTagSafe('pages-sitemap', 'max')
  }

  return doc
}
