import type { GlobalAfterChangeHook } from 'payload'

import { revalidateTagSafe } from '../../utilities/revalidate'

export const revalidateHeader: GlobalAfterChangeHook = async ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating header`)

    await revalidateTagSafe('global_header', 'max')
  }

  return doc
}
