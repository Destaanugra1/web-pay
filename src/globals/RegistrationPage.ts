import type { GlobalConfig } from 'payload'

import { revalidateFrontendGlobal } from './hooks/revalidateFrontendGlobal'
import { getGlobalLivePreviewURL, getGlobalPreviewPath } from './shared'

export const RegistrationPage: GlobalConfig = {
  slug: 'registration-page',
  access: {
    read: () => true,
  },
  admin: {
    description:
      'Konten halaman pendaftaran kader. Mengatur copy, pilihan fakultas/divisi, dan label form.',
    group: 'Frontend',
    livePreview: {
      url: ({ req }) => getGlobalLivePreviewURL({ req, slug: 'registration-page' }),
    },
    preview: (_, { req }) => getGlobalPreviewPath('registration-page'),
  },
  fields: [
    {
      admin: {
        description: 'Teks kecil di badge hero pendaftaran.',
      },
      name: 'heroBadgeText',
      type: 'text',
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description:
          'Gambar hero halaman pendaftaran. Opsional untuk visual tambahan jika dibutuhkan.',
      },
    },
    {
      admin: {
        description: 'Judul hero halaman pendaftaran.',
      },
      name: 'heroTitle',
      type: 'text',
      required: true,
    },
    {
      admin: {
        description: 'Deskripsi hero yang menjelaskan tujuan pendaftaran.',
      },
      name: 'heroDescription',
      type: 'textarea',
      required: true,
    },
    {
      admin: {
        description: 'Judul utama kartu/form pendaftaran.',
      },
      name: 'formTitle',
      type: 'text',
      required: true,
    },
    {
      admin: {
        description: 'Deskripsi singkat yang muncul di atas form.',
      },
      name: 'formDescription',
      type: 'textarea',
    },
    {
      admin: {
        description: 'Label stepper visual di bagian atas form.',
      },
      name: 'stepLabels',
      type: 'array',
      minRows: 0,
      maxRows: 6,
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
        description: 'Daftar pilihan fakultas/asal yang tampil di select form.',
      },
      name: 'facultyOptions',
      type: 'array',
      minRows: 0,
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
        description: 'Daftar divisi yang bisa dipilih calon kader.',
      },
      name: 'divisionOptions',
      type: 'array',
      minRows: 0,
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
        description: 'Teks penjelasan area upload dokumen.',
      },
      name: 'uploadLabel',
      type: 'text',
    },
    {
      admin: {
        description: 'Label tombol submit utama.',
      },
      name: 'submitLabel',
      type: 'text',
    },
  ],
  hooks: {
    afterChange: [
      revalidateFrontendGlobal({
        paths: ['/pendaftaran', '/daftar-kader'],
        tags: ['global_registration-page'],
      }),
    ],
  },
}
