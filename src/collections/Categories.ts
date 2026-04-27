import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    description: 'Kategori untuk mengelompokkan artikel/postingan.',
    useAsTitle: 'title',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Informasi',
          description: 'Data utama kategori.',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              admin: {
                description: 'Masukkan nama kategori baru.',
              },
            },
          ],
        },
        {
          label: 'Media & Gambar',
          description: 'Gambar ilustrasi untuk kategori.',
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Unggah gambar ikon atau cover kategori di sini.',
              },
            },
          ],
        },
      ],
    },
    slugField({
      position: undefined,
    }),
  ],
}
