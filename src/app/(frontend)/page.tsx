import { draftMode } from 'next/headers'

import { queryGlobal, queryPublishedPosts } from '@/utilities/getFrontendData'
import { HomePageContent } from './HomePageContent'
import HomePagePreview from './page.client'

export default async function HomePage() {
  const [homePage, structure, postsResult, { isEnabled }] = await Promise.all([
    queryGlobal('home-page', 2),
    queryGlobal('organization-structure', 2),
    queryPublishedPosts(3),
    draftMode(),
  ])

  const posts = postsResult.docs

  if (isEnabled) {
    return <HomePagePreview homePage={homePage} posts={posts} structure={structure} />
  }

  return <HomePageContent homePage={homePage} posts={posts} structure={structure} />
}
