import type { Field, GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFrontendGlobal } from './hooks/revalidateFrontendGlobal'
import { getGlobalLivePreviewURL, getGlobalPreviewPath } from './shared'

const infoCardFields: Field[] = [
  {
    name: 'icon',
    type: 'select' as const,
    defaultValue: 'users',
    options: [
      { label: 'Users', value: 'users' },
      { label: 'Building', value: 'building' },
      { label: 'Calendar', value: 'calendar' },
      { label: 'News', value: 'news' },
      { label: 'Sailboat', value: 'sailboat' },
    ],
  },
  {
    name: 'title',
    type: 'text' as const,
    required: true,
  },
  {
    name: 'description',
    type: 'textarea' as const,
    required: true,
  },
]

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  access: {
    read: () => true,
  },
  admin: {
    description:
      'Konten untuk halaman beranda. Semua hero, statistik, quick links, dan section utama diatur dari sini.',
    group: 'Frontend',
    livePreview: {
      url: ({ req }) => getGlobalLivePreviewURL({ req, slug: 'home-page' }),
    },
    preview: (_, { req }) => getGlobalPreviewPath('home-page'),
  },
  fields: [
    {
      admin: {
        description: 'Teks singkat di badge bulat area hero, misalnya singkatan organisasi.',
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
          'Gambar hero beranda. Jika diisi, gambar ini ditampilkan sebagai badge visual utama.',
      },
    },
    {
      admin: {
        description: 'Judul besar utama di halaman home.',
      },
      name: 'heroTitle',
      type: 'text',
      required: true,
    },
    {
      admin: {
        description: 'Deskripsi utama hero untuk menjelaskan organisasi atau misi utama.',
      },
      name: 'heroDescription',
      type: 'textarea',
      required: true,
    },
    link({
      appearances: false,
      overrides: {
        admin: {
          description: 'Tombol utama di hero beranda, misalnya ke pendaftaran atau halaman penting.',
        },
        name: 'heroCTA',
        label: 'Hero CTA',
      },
    }),
    {
      admin: {
        description: 'Section pengenalan organisasi di bawah hero.',
      },
      name: 'aboutSection',
      type: 'group',
      fields: [
        {
          admin: {
            description: 'Label kecil di atas judul section.',
          },
          name: 'eyebrow',
          type: 'text',
        },
        {
          admin: {
            description: 'Judul utama section pengenalan.',
          },
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          admin: {
            description: 'Paragraf penjelasan ringkas tentang organisasi.',
          },
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          admin: {
            description:
              'Kartu-kartu pengenalan beranda. Cocok untuk menampilkan keunggulan organisasi.',
          },
          name: 'cards',
          type: 'array',
          minRows: 0,
          maxRows: 4,
          fields: [...infoCardFields],
        },
      ],
    },
    {
      admin: {
        description: 'Panel visual besar di samping section pengenalan.',
      },
      name: 'showcase',
      type: 'group',
      fields: [
        {
          admin: {
            description: 'Label kecil untuk panel showcase.',
          },
          name: 'label',
          type: 'text',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description:
              'Gambar panel showcase. Jika kosong, halaman tetap memakai gradient visual.',
          },
        },
        {
          admin: {
            description: 'Teks isi panel showcase.',
          },
          name: 'description',
          type: 'textarea',
        },
      ],
    },
    {
      admin: {
        description: 'Statistik ringkas yang tampil dalam bentuk kartu di home.',
      },
      name: 'stats',
      type: 'array',
      minRows: 0,
      maxRows: 8,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'value',
          type: 'text',
          required: true,
        },
        {
          name: 'icon',
          type: 'select',
          defaultValue: 'users',
          options: [
            { label: 'Users', value: 'users' },
            { label: 'Calendar', value: 'calendar' },
            { label: 'News', value: 'news' },
            { label: 'Building', value: 'building' },
          ],
        },
      ],
    },
    {
      admin: {
        description: 'Pengaturan section teaser berita di beranda.',
      },
      name: 'newsSection',
      type: 'group',
      fields: [
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
          name: 'ctaLabel',
          type: 'text',
        },
      ],
    },
    {
      admin: {
        description: 'Judul dan deskripsi area BPH di beranda.',
      },
      name: 'leadershipSection',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
      ],
    },
    {
      admin: {
        description: 'Daftar tautan cepat yang tampil sebagai panel navigasi di bagian bawah home.',
      },
      name: 'quickLinks',
      type: 'array',
      minRows: 0,
      maxRows: 8,
      fields: [
        link({
          appearances: false,
        }),
      ],
    },
  ],
  hooks: {
    afterChange: [
      revalidateFrontendGlobal({
        paths: ['/'],
        tags: ['global_home-page'],
      }),
    ],
  },
}
