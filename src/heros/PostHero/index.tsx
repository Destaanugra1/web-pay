import { formatDateTime } from 'src/utilities/formatDateTime'
import React from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import { formatAuthors } from '@/utilities/formatAuthors'

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const { categories, excerpt, heroImage, meta, populatedAuthors, publishedAt, title } = post

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''

  const description = excerpt || meta?.description

  return (
    <div className="relative -mt-[10.4rem] flex items-end min-h-[60vh]">
      {/* Background image or gradient */}
      <div className="absolute inset-0">
        {heroImage && typeof heroImage !== 'string' ? (
          <>
            <Media fill priority imgClassName="object-cover" resource={heroImage} />
            {/* gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
          </>
        ) : (
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#002957_0%,#003f7f_60%,#315ea0_100%)]" />
        )}
      </div>

      {/* Content */}
      <div className="container relative z-10 pb-10 pt-32">
        <div className="max-w-3xl space-y-5">
          {/* Category tags */}
          {(categories || []).length > 0 && (
            <div className="flex flex-wrap gap-2">
              {categories!.map((category, index) => {
                if (typeof category === 'object' && category !== null) {
                  return (
                    <span
                      key={index}
                      className="rounded-full bg-[#fed65b] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#745c00]"
                    >
                      {category.title || 'Tanpa Kategori'}
                    </span>
                  )
                }
                return null
              })}
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl font-semibold leading-tight text-white md:text-4xl lg:text-5xl">
            {title}
          </h1>

          {/* Description/excerpt */}
          {description && (
            <p className="max-w-2xl text-base leading-7 text-[#d6e3ff]">{description}</p>
          )}

          {/* Meta: author & date */}
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/20 pt-5">
            {hasAuthors && (
              <div className="flex flex-col gap-0.5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#fed65b]">
                  Penulis
                </p>
                <p className="text-sm text-white">{formatAuthors(populatedAuthors)}</p>
              </div>
            )}
            {publishedAt && (
              <div className="flex flex-col gap-0.5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#fed65b]">
                  Dipublikasikan
                </p>
                <time className="text-sm text-white" dateTime={publishedAt}>
                  {formatDateTime(publishedAt)}
                </time>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
