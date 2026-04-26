import clsx from 'clsx'
import type { Media as MediaType } from '@/payload-types'
import { Media } from '@/components/Media'
import React from 'react'

interface Props {
  ariaLabel?: string
  className?: string
  loading?: 'lazy' | 'eager'
  markText?: string
  media?: MediaType | null
  priority?: 'auto' | 'high' | 'low'
  subtitle?: string
  title?: string
}

export const Logo = (props: Props) => {
  const {
    ariaLabel = 'IKMA',
    className,
    markText = 'IK',
    media,
    subtitle = 'Maritime Portal',
    title = 'IKMA',
  } = props

  return (
    <div
      aria-label={ariaLabel}
      className={clsx('flex items-center gap-3 text-left text-white', className)}
      role="img"
    >
      {media ? (
        <div className="size-10 overflow-hidden rounded-full border-2 border-[#fed65b] bg-white">
          <Media resource={media} className="h-full w-full object-cover" />
        </div>
      ) : (
        <div className="flex size-10 items-center justify-center rounded-full border-2 border-[#fed65b] bg-white/10 text-lg font-semibold text-[#fed65b]">
          {markText}
        </div>
      )}
      <div className="leading-tight">
        <div className="font-serif text-lg font-semibold tracking-[0.08em]">{title}</div>
        <div className="text-[10px] uppercase tracking-[0.28em] text-white/75">{subtitle}</div>
      </div>
    </div>
  )
}
