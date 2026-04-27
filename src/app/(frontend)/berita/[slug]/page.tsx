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
    return (
      <>
        {/* Banner peringatan mode pratinjau */}
        <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between gap-4 bg-[#002957] px-6 py-3 text-white shadow-lg">
          <div className="flex items-center gap-3">
            <span className="inline-block size-2 animate-pulse rounded-full bg-[#fed65b]" />
            <span className="text-sm font-medium">
              Mode Pratinjau Aktif — Anda melihat konten draft yang belum dipublish.
            </span>
          </div>
          <a
            href="/next/exit-preview"
            className="rounded-md bg-[#fed65b] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#745c00] transition hover:bg-[#ffe088]"
          >
            Keluar Pratinjau
          </a>
        </div>
        <div className="pb-14">
          <BeritaDetailPreview newsPage={newsPage} post={post} />
        </div>
      </>
    )
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
