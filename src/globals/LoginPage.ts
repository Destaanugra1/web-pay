import type { GlobalConfig } from 'payload'

import { revalidateFrontendGlobal } from './hooks/revalidateFrontendGlobal'
import { getGlobalLivePreviewURL, getGlobalPreviewPath } from './shared'

export const LoginPage: GlobalConfig = {
  slug: 'login-page',
  access: {
    read: () => true,
  },
  admin: {
    description:
      'Konten halaman login publik. Mengatur branding panel kiri, panel form kanan, dan opsi login sekunder.',
    group: 'Frontend',
    livePreview: {
      url: ({ req }) => getGlobalLivePreviewURL({ req, slug: 'login-page' }),
    },
    preview: (_, { req }) => getGlobalPreviewPath('login-page'),
  },
  fields: [
    {
      name: 'brandImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description:
          'Gambar/ilustrasi branding untuk panel kiri halaman login. Opsional, jika kosong tetap pakai style default.',
      },
    },
    {
      admin: {
        description: 'Judul besar pada panel branding sebelah kiri.',
      },
      name: 'brandTitle',
      type: 'text',
      required: true,
    },
    {
      admin: {
        description: 'Deskripsi branding atau konteks akses portal.',
      },
      name: 'brandDescription',
      type: 'textarea',
      required: true,
    },
    {
      admin: {
        description: 'Judul utama panel form login.',
      },
      name: 'panelTitle',
      type: 'text',
      required: true,
    },
    {
      admin: {
        description: 'Deskripsi singkat di atas form login.',
      },
      name: 'panelDescription',
      type: 'textarea',
    },
    {
      admin: {
        description: 'Label tombol submit login.',
      },
      name: 'submitLabel',
      type: 'text',
      defaultValue: 'Masuk',
    },
    {
      admin: {
        description: 'Path tujuan setelah login berhasil, misalnya /admin.',
      },
      name: 'successRedirect',
      type: 'text',
      defaultValue: '/admin',
    },
    {
      admin: {
        description: 'Label pemisah untuk opsi login alternatif.',
      },
      name: 'secondaryAuthLabel',
      type: 'text',
    },
    {
      admin: {
        description: 'Tombol login alternatif seperti SSO atau portal lain.',
      },
      name: 'secondaryAuthOptions',
      type: 'array',
      minRows: 0,
      maxRows: 4,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
        {
          name: 'icon',
          type: 'select',
          defaultValue: 'shield',
          options: [
            { label: 'Shield', value: 'shield' },
            { label: 'Globe', value: 'globe' },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [
      revalidateFrontendGlobal({
        paths: ['/login'],
        tags: ['global_login-page'],
      }),
    ],
  },
}
