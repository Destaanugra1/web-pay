import type { CollectionConfig } from 'payload'

import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { Banner } from '../../blocks/Banner/config'
import { Code } from '../../blocks/Code/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { populateAuthors } from './hooks/populateAuthors'
import { revalidateDelete, revalidatePost } from './hooks/revalidatePost'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { slugField } from 'payload'

export const Posts: CollectionConfig<'posts'> = {
  slug: 'posts',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  // This config controls what's populated by default when a post is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'posts'>
  defaultPopulate: {
    title: true,
    slug: true,
    categories: true,
    meta: {
      image: true,
      description: true,
    },
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    description:
      'Koleksi berita/artikel publik. Digunakan oleh halaman /berita dan /berita/[slug].',
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'posts',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'posts',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Judul berita atau artikel. Akan tampil di banner halaman detail dan listing berita.',
      },
    },
    {
      type: 'tabs',
      tabs: [
        // --- TAB 1: INFORMASI DASAR ---
        {
          label: 'Info Dasar',
          description: 'Ringkasan artikel dan kategori. Lengkapi tab ini terlebih dahulu.',
          fields: [
            {
              name: 'excerpt',
              type: 'textarea',
              admin: {
                description:
                  'Ringkasan singkat artikel (1–3 kalimat). Ditampilkan di halaman listing berita dan kartu artikel. Jika dikosongkan, sistem akan memakai deskripsi SEO.',
              },
            },
            {
              name: 'categories',
              type: 'relationship',
              hasMany: true,
              relationTo: 'categories',
              admin: {
                description: 'Pilih satu atau lebih kategori untuk artikel ini. Kategori muncul sebagai label/tag di daftar dan detail berita.',
              },
            },
          ],
        },
        // --- TAB 2: ISI ARTIKEL ---
        {
          label: 'Isi Artikel',
          description: 'Tulis konten lengkap artikel di sini menggunakan editor teks kaya.',
          fields: [
            {
              name: 'content',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                    BlocksFeature({ blocks: [Banner, Code, MediaBlock] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HorizontalRuleFeature(),
                  ]
                },
              }),
              label: false,
              required: true,
              admin: {
                description:
                  'Tulis isi lengkap artikel berita di sini. Gunakan toolbar di atas untuk heading, bold, italic, dan menyisipkan gambar atau blok khusus.',
              },
            },
          ],
        },
        // --- TAB 3: MEDIA & GAMBAR ---
        {
          label: 'Media & Gambar',
          description: 'Gambar sampul artikel. Wajib diisi agar tampilan berita lebih menarik.',
          fields: [
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description:
                  'Gambar sampul utama artikel. Ditampilkan sebagai background besar di halaman detail berita dan thumbnail di listing berita. Disarankan rasio 16:9 (mis. 1280×720px).',
              },
            },
          ],
        },
        // --- TAB 4: RELASI ---
        {
          label: 'Artikel Terkait',
          description: 'Pilih artikel lain yang relevan untuk ditampilkan di bagian bawah artikel ini.',
          fields: [
            {
              name: 'relatedPosts',
              type: 'relationship',
              filterOptions: ({ id }) => {
                return {
                  id: {
                    not_in: [id],
                  },
                }
              },
              hasMany: true,
              relationTo: 'posts',
              admin: {
                description:
                  'Pilih artikel lain yang berkaitan dengan artikel ini. Akan ditampilkan di bagian bawah halaman detail sebagai rekomendasi bagi pembaca.',
              },
            },
          ],
        },
        // --- TAB 5: SEO ---
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
        description: 'Tanggal dan waktu publikasi artikel.',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    {
      name: 'authors',
      type: 'relationship',
      admin: {
        position: 'sidebar',
        description: 'Pilih penulis artikel ini.',
      },
      hasMany: true,
      relationTo: 'users',
    },
    // This field is only used to populate the user data via the `populateAuthors` hook
    // This is because the `user` collection has access control locked to protect user privacy
    // GraphQL will also not return mutated user data that differs from the underlying schema
    {
      name: 'populatedAuthors',
      type: 'array',
      access: {
        update: () => false,
      },
      admin: {
        disabled: true,
        readOnly: true,
      },
      fields: [
        {
          name: 'id',
          type: 'text',
        },
        {
          name: 'name',
          type: 'text',
        },
      ],
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidatePost],
    afterRead: [populateAuthors],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
