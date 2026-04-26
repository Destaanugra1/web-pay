import type { GlobalConfig } from 'payload'

import { revalidateFrontendGlobal } from './hooks/revalidateFrontendGlobal'
import { getGlobalLivePreviewURL, getGlobalPreviewPath } from './shared'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
  },
  admin: {
    description:
      'Pengaturan identitas utama website. Konten di sini dipakai lintas halaman untuk logo, footer, dan informasi kontak.',
    group: 'Frontend',
    livePreview: {
      url: ({ req }) => getGlobalLivePreviewURL({ req, slug: 'site-settings' }),
    },
    preview: (_, { req }) => getGlobalPreviewPath('site-settings'),
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          admin: {
            description: 'Nama lengkap organisasi atau situs untuk metadata dan identitas utama.',
          },
          name: 'siteName',
          type: 'text',
          required: true,
        },
        {
          admin: {
            description: 'Versi singkat nama situs, berguna untuk label kecil atau singkatan.',
          },
          name: 'shortName',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'logoImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description:
          'Logo utama organisasi. Jika diisi, logo ini akan diprioritaskan di header dan footer.',
      },
    },
    {
      type: 'row',
      fields: [
        {
          admin: {
            description: 'Teks utama di logo jika tidak memakai gambar.',
          },
          name: 'logoTitle',
          type: 'text',
        },
        {
          admin: {
            description: 'Teks kecil di bawah judul logo.',
          },
          name: 'logoSubtitle',
          type: 'text',
        },
        {
          admin: {
            description: 'Inisial atau monogram singkat untuk badge/logo bulat.',
          },
          name: 'logoMark',
          type: 'text',
        },
      ],
    },
    {
      admin: {
        description: 'Deskripsi singkat situs yang ditampilkan di area footer.',
      },
      name: 'footerDescription',
      type: 'textarea',
    },
    {
      admin: {
        description: 'Judul blok kontak di footer.',
      },
      name: 'contactSectionTitle',
      type: 'text',
      defaultValue: 'Kontak',
    },
    {
      type: 'row',
      fields: [
        {
          admin: {
            description: 'Alamat sekretariat atau kantor utama organisasi.',
          },
          name: 'address',
          type: 'textarea',
        },
        {
          admin: {
            description: 'Email publik yang tampil di footer.',
          },
          name: 'email',
          type: 'email',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          admin: {
            description: 'Nomor kontak utama organisasi.',
          },
          name: 'phone',
          type: 'text',
        },
        {
          admin: {
            description: 'Teks copyright yang muncul di footer.',
          },
          name: 'copyright',
          type: 'text',
        },
      ],
    },
  ],
  hooks: {
    afterChange: [
      revalidateFrontendGlobal({
        paths: ['/', '/berita', '/struktur', '/foto', '/pendaftaran', '/login'],
        tags: ['global_site-settings'],
      }),
    ],
  },
}
