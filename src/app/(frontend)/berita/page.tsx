import { queryGlobal, queryPublishedPosts } from '@/utilities/getFrontendData'
import type { Metadata } from 'next'
import { draftMode } from 'next/headers'

import { BeritaPageContent } from './BeritaPageContent'
import BeritaPagePreview from './page.preview'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function BeritaPage() {
  const [newsPage, postsResult, { isEnabled }] = await Promise.all([
    queryGlobal('news-page', 1),
    queryPublishedPosts(9),
    draftMode(),
  ])

  const posts = postsResult.docs

  if (isEnabled) {
    return <BeritaPagePreview newsPage={newsPage} posts={posts} />
  }

  return <BeritaPageContent newsPage={newsPage} posts={posts} />
}

export async function generateMetadata(): Promise<Metadata> {
  const newsPage = await queryGlobal('news-page', 1)

  return {
    title: newsPage.heroTitle || 'Berita',
  }
}
