import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    description: 'Manajemen akun pengguna dan profil admin.',
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      admin: {
        description: 'Masukkan nama lengkap pengguna.',
      },
    },
    {
      name: 'profilePicture',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_data, _siblingData, { user }) => Boolean(user),
        description: 'Unggah foto profil pengguna di sini.',
      },
    },
  ],
  timestamps: true,
}
