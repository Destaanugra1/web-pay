import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import type { Post } from '../../../payload-types'
import { revalidatePathSafe, revalidateTagSafe } from '../../../utilities/revalidate'

export const revalidatePost: CollectionAfterChangeHook<Post> = async ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const detailPath = `/berita/${doc.slug}`

      payload.logger.info(`Revalidating post at path: ${detailPath}`)

      await revalidatePathSafe(detailPath)
      await revalidatePathSafe('/berita')
      await revalidatePathSafe(`/posts/${doc.slug}`)
      await revalidatePathSafe('/posts')
      await revalidateTagSafe('posts-sitemap', 'max')
    }

    // If the post was previously published, we need to revalidate the old path
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/berita/${previousDoc.slug}`

      payload.logger.info(`Revalidating old post at path: ${oldPath}`)

      await revalidatePathSafe(oldPath)
      await revalidatePathSafe('/berita')
      await revalidatePathSafe(`/posts/${previousDoc.slug}`)
      await revalidatePathSafe('/posts')
      await revalidateTagSafe('posts-sitemap', 'max')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Post> = async ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    const path = `/berita/${doc?.slug}`

    await revalidatePathSafe(path)
    await revalidatePathSafe('/berita')
    await revalidatePathSafe(`/posts/${doc?.slug}`)
    await revalidatePathSafe('/posts')
    await revalidateTagSafe('posts-sitemap', 'max')
  }

  return doc
}
