import type { CollectionConfig } from 'payload'
import { authenticated } from '@/access/authenticated'

export const Acara: CollectionConfig = {
  slug: 'acara',
  labels: {
    singular: 'Acara',
    plural: 'Acara',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'tanggal', 'kategori', 'status'],
    group: 'Absensi',
  },
  access: {
    read: () => true,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'title',
      label: 'Nama Acara',
      type: 'text',
      required: true,
    },
    {
      name: 'tanggal',
      label: 'Tanggal Pelaksanaan',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'd MMM yyyy',
        },
      },
    },
    {
      name: 'kategori',
      label: 'Kategori Acara',
      type: 'select',
      required: true,
      defaultValue: 'internal',
      options: [
        { label: 'Internal', value: 'internal' },
        { label: 'Eksternal', value: 'eksternal' },
      ],
    },
    {
      name: 'status',
      label: 'Status Absensi',
      type: 'select',
      required: true,
      defaultValue: 'buka',
      options: [
        { label: 'Buka', value: 'buka' },
        { label: 'Tutup', value: 'tutup' },
      ],
      admin: {
        description: 'Ubah menjadi "Tutup" untuk menghentikan form absensi di website.',
      },
    },
    {
      name: 'deskripsi',
      label: 'Deskripsi Singkat (Opsional)',
      type: 'textarea',
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Pengaturan Form',
          fields: [
            {
              name: 'formTitle',
              label: 'Judul Form',
              type: 'text',
              admin: {
                description: 'Kosongkan untuk menggunakan Nama Acara sebagai judul form.',
              },
            },
            {
              name: 'formDescription',
              label: 'Deskripsi Form',
              type: 'textarea',
              admin: {
                description: 'Teks instruksi di bawah judul form. Kosongkan untuk menggunakan Deskripsi Singkat.',
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'enablePhoto',
                  label: 'Gunakan Upload Foto?',
                  type: 'checkbox',
                  defaultValue: true,
                },
                {
                  name: 'enableCatatan',
                  label: 'Gunakan Kolom Catatan?',
                  type: 'checkbox',
                  defaultValue: true,
                },
              ],
            },
            {
              name: 'customFields',
              label: 'Kolom Tambahan (Opsional)',
              type: 'array',
              labels: {
                singular: 'Kolom',
                plural: 'Kolom Tambahan',
              },
              admin: {
                description: 'Tambahkan input custom (seperti Asal Instansi, dsb).',
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'name',
                      label: 'Nama Kolom (Label)',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'type',
                      label: 'Tipe Input',
                      type: 'select',
                      required: true,
                      defaultValue: 'text',
                      options: [
                        { label: 'Teks Pendek', value: 'text' },
                        { label: 'Teks Panjang', value: 'textarea' },
                        { label: 'Checkbox (Persetujuan)', value: 'checkbox' },
                      ],
                    },
                  ],
                },
                {
                  name: 'required',
                  label: 'Wajib Diisi?',
                  type: 'checkbox',
                  defaultValue: false,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
