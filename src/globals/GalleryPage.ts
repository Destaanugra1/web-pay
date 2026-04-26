import type { GlobalConfig } from 'payload'

import { revalidateFrontendGlobal } from './hooks/revalidateFrontendGlobal'
import { getGlobalLivePreviewURL, getGlobalPreviewPath } from './shared'

export const GalleryPage: GlobalConfig = {
  slug: 'gallery-page',
  access: {
    read: () => true,
  },
  admin: {
    description:
      'Konten halaman galeri atau Foto BPH. Isi tab, judul section, dan item dokumentasi dari sini.',
    group: 'Frontend',
    livePreview: {
      url: ({ req }) => getGlobalLivePreviewURL({ req, slug: 'gallery-page' }),
    },
    preview: (_, { req }) => getGlobalPreviewPath('gallery-page'),
  },
  fields: [
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description:
          'Gambar hero galeri. Jika kosong, halaman tetap menggunakan tampilan visual default.',
      },
    },
    {
      admin: {
        description: 'Judul hero halaman galeri.',
      },
      name: 'heroTitle',
      type: 'text',
      required: true,
    },
    {
      admin: {
        description: 'Deskripsi hero halaman galeri.',
      },
      name: 'heroDescription',
      type: 'textarea',
      required: true,
    },
    {
      admin: {
        description: 'Tab filter visual di atas galeri. Saat ini dipakai sebagai label tampilan.',
      },
      name: 'tabs',
      type: 'array',
      minRows: 0,
      maxRows: 8,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      admin: {
        description: 'Judul utama section galeri.',
      },
      name: 'sectionTitle',
      type: 'text',
      required: true,
    },
    {
      admin: {
        description: 'Deskripsi section galeri.',
      },
      name: 'sectionDescription',
      type: 'textarea',
    },
    {
      admin: {
        description: 'Daftar item galeri yang akan dirender di frontend.',
      },
      name: 'items',
      type: 'array',
      minRows: 0,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'accent',
          type: 'select',
          defaultValue: 'gold',
          options: [
            { label: 'Gold', value: 'gold' },
            { label: 'Blue', value: 'blue' },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [
      revalidateFrontendGlobal({
        paths: ['/foto', '/foto-bph'],
        tags: ['global_gallery-page'],
      }),
    ],
  },
}
