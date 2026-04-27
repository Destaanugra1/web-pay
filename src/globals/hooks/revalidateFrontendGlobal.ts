import type { GlobalAfterChangeHook } from 'payload'

import { revalidatePathSafe, revalidateTagSafe } from '../../utilities/revalidate'

type FrontendGlobalOptions = {
  paths?: string[]
  tags?: string[]
}

export const revalidateFrontendGlobal = ({
  paths = [],
  tags = [],
}: FrontendGlobalOptions): GlobalAfterChangeHook => {
  return async ({ doc, req: { payload, context } }) => {
    if (!context.disableRevalidate) {
      for (const path of paths) {
        payload.logger.info(`Revalidating global path: ${path}`)
        await revalidatePathSafe(path)
      }

      for (const tag of tags) {
        payload.logger.info(`Revalidating global tag: ${tag}`)
        await revalidateTagSafe(tag, 'max')
      }
    }

    return doc
  }
}
