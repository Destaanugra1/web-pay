import type { GlobalConfig } from 'payload'

import { revalidateFrontendGlobal } from './hooks/revalidateFrontendGlobal'
import { getGlobalLivePreviewURL, getGlobalPreviewPath } from './shared'

export const NewsPage: GlobalConfig = {
  slug: 'news-page',
  access: {
    read: () => true,
  },
  admin: {
    description:
      'Pengaturan visual dan copy untuk halaman listing berita serta sebagian panel di detail berita.',
    group: 'Frontend',
    livePreview: {
      url: ({ req }) => getGlobalLivePreviewURL({ req, slug: 'news-page' }),
    },
    preview: (_, { req }) => getGlobalPreviewPath('news-page'),
  },
  fields: [
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description:
          'Gambar hero halaman berita. Jika kosong, halaman tetap memakai gaya visual default.',
      },
    },
    {
      name: 'bannerBackgroundImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description:
          'Gambar background transparan untuk banner halaman berita. Jika kosong, banner memakai warna biru solid.',
      },
    },
    {
      admin: {
        description: 'Judul hero di halaman berita.',
      },
      name: 'heroTitle',
      type: 'text',
      required: true,
    },
    {
      admin: {
        description: 'Deskripsi hero di halaman berita.',
      },
      name: 'heroDescription',
      type: 'textarea',
      required: true,
    },
    {
      admin: {
        description: 'Pengaturan copy untuk listing artikel.',
      },
      name: 'listing',
      type: 'group',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'searchPlaceholder',
          type: 'text',
        },
        {
          name: 'archiveTitle',
          type: 'text',
        },
        {
          name: 'readMoreLabel',
          type: 'text',
        },
      ],
    },
    {
      admin: {
        description: 'Pengaturan copy panel tambahan di halaman detail berita.',
      },
      name: 'detail',
      type: 'group',
      fields: [
        {
          name: 'trendingTitle',
          type: 'text',
        },
        {
          name: 'shareTitle',
          type: 'text',
        },
        {
          name: 'shareDescription',
          type: 'textarea',
        },
        {
          name: 'highlightText',
          type: 'textarea',
        },
      ],
    },
  ],
  hooks: {
    afterChange: [
      revalidateFrontendGlobal({
        paths: ['/berita'],
        tags: ['global_news-page'],
      }),
    ],
  },
}
