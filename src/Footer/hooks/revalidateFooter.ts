import type { GlobalAfterChangeHook } from 'payload'

import { revalidateTagSafe } from '../../utilities/revalidate'

export const revalidateFooter: GlobalAfterChangeHook = async ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating footer`)

    await revalidateTagSafe('global_footer', 'max')
  }

  return doc
}
