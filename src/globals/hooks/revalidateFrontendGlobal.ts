import type { GlobalAfterChangeHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

type FrontendGlobalOptions = {
  paths?: string[]
  tags?: string[]
}

export const revalidateFrontendGlobal = ({
  paths = [],
  tags = [],
}: FrontendGlobalOptions): GlobalAfterChangeHook => {
  return ({ doc, req: { payload, context } }) => {
    if (!context.disableRevalidate) {
      for (const path of paths) {
        payload.logger.info(`Revalidating global path: ${path}`)
        revalidatePath(path)
      }

      for (const tag of tags) {
        payload.logger.info(`Revalidating global tag: ${tag}`)
        revalidateTag(tag, 'max')
      }
    }

    return doc
  }
}
