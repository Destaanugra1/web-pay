import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest): Promise<Response> {
  const draft = await draftMode()
  draft.disable()

  // Redirect back to the page the user was on, or home
  const referer = req.headers.get('referer')
  const url = referer ? new URL(referer) : null
  const path = url?.pathname || '/'

  redirect(path)
}
