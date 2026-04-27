import type { GlobalConfig } from 'payload'

import { revalidateFrontendGlobal } from './hooks/revalidateFrontendGlobal'
import { getGlobalLivePreviewURL, getGlobalPreviewPath } from './shared'

const memberFields = [
  {
    name: 'name',
    type: 'text',
    required: true,
  },
  {
    name: 'role',
    type: 'text',
    required: true,
  },
  {
    name: 'photo',
    type: 'upload',
    relationTo: 'media',
  },
] as const

export const OrganizationStructure: GlobalConfig = {
  slug: 'organization-structure',
  access: {
    read: () => true,
  },
  admin: {
    description:
      'Data struktur organisasi, pimpinan, anggota inti, dan divisi. Dipakai untuk halaman struktur dan sebagian beranda.',
    group: 'Frontend',
    livePreview: {
      url: ({ req }) => getGlobalLivePreviewURL({ req, slug: 'organization-structure' }),
    },
    preview: (_, { req }) => getGlobalPreviewPath('organization-structure'),
  },
  fields: [
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description:
          'Gambar hero halaman struktur. Opsional, untuk memperjelas identitas halaman.',
      },
    },
    {
      name: 'bannerBackgroundImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description:
          'Gambar background transparan untuk banner halaman struktur. Jika kosong, banner memakai warna biru solid.',
      },
    },
    {
      admin: {
        description: 'Judul hero halaman struktur.',
      },
      name: 'heroTitle',
      type: 'text',
      required: true,
    },
    {
      admin: {
        description: 'Deskripsi hero halaman struktur.',
      },
      name: 'heroDescription',
      type: 'textarea',
      required: true,
    },
    {
      admin: {
        description: 'Data pimpinan utama organisasi.',
      },
      name: 'leader',
      type: 'group',
      fields: [...memberFields],
    },
    {
      admin: {
        description: 'Anggota inti yang tampil di bawah pimpinan utama.',
      },
      name: 'coreMembers',
      type: 'array',
      minRows: 0,
      fields: [...memberFields],
    },
    {
      admin: {
        description: 'Judul section daftar divisi.',
      },
      name: 'divisionsSectionTitle',
      type: 'text',
      required: true,
    },
    {
      admin: {
        description: 'Deskripsi singkat section divisi.',
      },
      name: 'divisionsSectionDescription',
      type: 'textarea',
    },
    {
      admin: {
        description: 'Daftar divisi/bidang kerja organisasi.',
      },
      name: 'divisions',
      type: 'array',
      minRows: 0,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'leadName',
          type: 'text',
          required: true,
        },
        {
          name: 'leadRole',
          type: 'text',
        },
        {
          name: 'leadPhoto',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'tasks',
          type: 'array',
          minRows: 0,
          fields: [
            {
              name: 'task',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [
      revalidateFrontendGlobal({
        paths: ['/', '/struktur'],
        tags: ['global_organization-structure'],
      }),
    ],
  },
}
