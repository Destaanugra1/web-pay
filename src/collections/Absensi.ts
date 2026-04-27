import type { CollectionConfig } from 'payload'
import { authenticated } from '@/access/authenticated'

export const Absensi: CollectionConfig = {
  slug: 'absensi',
  labels: {
    singular: 'Data Absensi',
    plural: 'Data Absensi',
  },
  admin: {
    useAsTitle: 'nama',
    defaultColumns: ['nama', 'acara', 'status', 'createdAt'],
    group: 'Absensi',
    components: {
      beforeListTable: ['@/components/AbsensiFilter'],
    },
  },
  access: {
    // Anyone can read (if you want frontend to show summary)
    read: () => true,
    // Allow public users (frontend) to submit attendance forms
    create: () => true, 
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'acara',
      label: 'Acara',
      type: 'relationship',
      relationTo: 'acara',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'nama',
      label: 'Nama Peserta',
      type: 'text',
      required: true,
    },
    {
      name: 'status',
      label: 'Status Kehadiran',
      type: 'select',
      required: true,
      options: [
        { label: 'Hadir', value: 'hadir' },
        { label: 'Terlambat', value: 'terlambat' },
        { label: 'Tidak Hadir', value: 'tidak_hadir' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'catatan',
      label: 'Catatan',
      type: 'textarea',
    },
    {
      name: 'foto',
      label: 'Bukti Foto',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'customData',
      label: 'Data Tambahan (Dinamis)',
      type: 'json',
      admin: {
        description: 'Menyimpan jawaban dari kolom tambahan form absensi.',
      },
    },
  ],
}
