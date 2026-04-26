import { PayloadRedirects } from '@/components/PayloadRedirects'
import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import React, { cache } from 'react'

import configPromise from '@payload-config'
import { queryGlobal } from '@/utilities/getFrontendData'
import { BeritaDetailContent } from './BeritaDetailContent'
import BeritaDetailPreview from './page.preview'

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  return posts.docs.map(({ slug }) => ({ slug }))
}

export default async function BeritaDetailPage({ params: paramsPromise }: Args) {
  const [{ slug = '' }, newsPage, { isEnabled }] = await Promise.all([
    paramsPromise,
    queryGlobal('news-page', 1),
    draftMode(),
  ])
  const decodedSlug = decodeURIComponent(slug)
  const url = '/berita/' + decodedSlug
  const post = await queryPostBySlug({ slug: decodedSlug })

  if (!post) {
    return <PayloadRedirects url={url} />
  }

  if (isEnabled) {
    return <BeritaDetailPreview newsPage={newsPage} post={post} />
  }

  return <BeritaDetailContent newsPage={newsPage} post={post} />
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const post = await queryPostBySlug({ slug: decodeURIComponent(slug) })

  return {
    title: post?.title || 'Detail Berita',
  }
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'posts',
    draft,
    depth: 1,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
