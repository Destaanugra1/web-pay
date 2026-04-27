'use client'

import { useLivePreview } from '@payloadcms/live-preview-react'
import { getClientSideURL } from '@/utilities/getURL'
import React from 'react'
import type { Post } from '@/payload-types'
import { PostHero } from '@/heros/PostHero'
import RichText from '@/components/RichText'
import { RelatedPosts } from '@/blocks/RelatedPosts/Component'

export default function PostPreview({ initialPost }: { initialPost: Post }) {
  const { data: post } = useLivePreview<Post>({
    initialData: initialPost,
    serverURL: getClientSideURL(),
    depth: 2,
  })

  return (
    <>
      <PostHero post={post} />

      <div className="flex flex-col items-center gap-4 pt-8">
        <div className="container">
          <RichText className="max-w-[48rem] mx-auto" data={post.content} enableGutter={false} />
          {post.relatedPosts && post.relatedPosts.length > 0 && (
            <RelatedPosts
              className="mt-12 max-w-[52rem] lg:grid lg:grid-cols-subgrid col-start-1 col-span-3 grid-rows-[2fr]"
              docs={post.relatedPosts.filter((post) => typeof post === 'object')}
            />
          )}
        </div>
      </div>
    </>
  )
}
