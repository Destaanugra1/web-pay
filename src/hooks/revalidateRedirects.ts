import type { CollectionAfterChangeHook } from 'payload'

import { revalidateTagSafe } from '../utilities/revalidate'

export const revalidateRedirects: CollectionAfterChangeHook = async ({ doc, req: { payload } }) => {
  payload.logger.info(`Revalidating redirects`)

  await revalidateTagSafe('redirects', 'max')

  return doc
}
