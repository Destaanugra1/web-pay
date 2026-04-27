'use client'

import type { Post, ArchiveBlock as ArchiveBlockProps } from '@/payload-types'

import React from 'react'
import RichText from '@/components/RichText'

import { CollectionArchive } from '@/components/CollectionArchive'

export const ArchiveBlockPreview: React.FC<
  ArchiveBlockProps & {
    id?: string
  }
> = (props) => {
  const { id, introContent, selectedDocs } = props

  const posts =
    selectedDocs?.map((post) => {
      if (typeof post.value === 'object') return post.value
      return null
    }).filter(Boolean) as Post[]

  return (
    <div className="my-16" id={`block-${id}`}>
      {introContent && (
        <div className="container mb-16">
          <RichText className="ms-0 max-w-[48rem]" data={introContent} enableGutter={false} />
        </div>
      )}
      <CollectionArchive posts={posts} />
    </div>
  )
}
