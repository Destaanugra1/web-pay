# Dynamic Payload Refactor

Dokumen ini menjelaskan perubahan yang dilakukan agar frontend tidak lagi memakai konten hardcoded dari Stitch, tetapi mengambil data dinamis dari Payload CMS + Next.js.

## Tujuan

Perubahan ini dibuat untuk:

- mempertahankan desain visual hasil Stitch
- memindahkan sumber konten frontend ke Payload CMS
- membuat halaman aman saat data kosong
- memakai server-side fetching di Next.js
- tetap membiarkan `/absensi` sebagai halaman custom/manual

## Halaman Yang Diubah

Halaman berikut sekarang membaca data dari Payload:

- `/` atau home
- `/berita`
- `/berita/[slug]`
- `/struktur`
- `/foto`
- `/pendaftaran`
- `/login`

Alias tambahan:

- `/foto-bph` diarahkan ke `/foto`
- `/daftar-kader` diarahkan ke `/pendaftaran`
- `/daftar` juga diarahkan ke `/pendaftaran`

Halaman yang tidak diubah ke CMS:

- `/absensi` tetap manual/custom

## Yang Sebelumnya Hardcoded

Sebelum refactor, beberapa halaman maritim/Stitch masih memakai data dari file:

- `src/components/maritime/content.ts`
- sebagian header/footer/nav/logo masih hardcoded
- beberapa CTA, teks hero, galeri, struktur organisasi, dan daftar link masih ditulis langsung di komponen

Sekarang file itu tidak lagi menjadi sumber konten utama frontend.

## Schema Payload Baru

Saya menambahkan beberapa global Payload baru di folder:

- [src/globals](/D:/projek/test-payload/website/src/globals)

Global yang ditambahkan:

1. `site-settings`
   - nama situs
   - logo text/mark/subtitle
   - deskripsi footer
   - kontak, email, telepon, copyright

2. `home-page`
   - hero home
   - about section
   - cards info
   - showcase panel
   - stats
   - section berita
   - section leadership
   - quick links

3. `news-page`
   - hero halaman berita
   - judul/deskripsi listing
   - placeholder search
   - judul arsip
   - label read more
   - teks panel detail berita

4. `organization-structure`
   - hero struktur
   - leader
   - core members
   - daftar divisi
   - tugas per divisi

5. `gallery-page`
   - hero galeri
   - tab label
   - judul/deskripsi section
   - item galeri
   - gambar galeri

6. `registration-page`
   - hero pendaftaran
   - form heading
   - step labels
   - pilihan fakultas
   - pilihan divisi
   - label upload
   - label submit

7. `login-page`
   - branding panel kiri
   - judul/deskripsi panel kanan
   - label submit
   - redirect setelah login
   - opsi auth sekunder

## Collection Yang Dipakai

Collection existing yang tetap dipakai:

- `posts` untuk berita
- `media` untuk gambar
- `users` untuk auth Payload
- `pages`, `categories` tetap ada sebagai bawaan template

Saya tidak membuat duplikasi collection berita baru karena `posts` sudah ada dan cukup dipakai untuk `/berita` dan `/berita/[slug]`.

## File Penting Yang Diubah

### Config Payload

- [src/payload.config.ts](/D:/projek/test-payload/website/src/payload.config.ts)
  - mendaftarkan global baru

### Globals baru

- [src/globals/SiteSettings.ts](/D:/projek/test-payload/website/src/globals/SiteSettings.ts)
- [src/globals/HomePage.ts](/D:/projek/test-payload/website/src/globals/HomePage.ts)
- [src/globals/NewsPage.ts](/D:/projek/test-payload/website/src/globals/NewsPage.ts)
- [src/globals/OrganizationStructure.ts](/D:/projek/test-payload/website/src/globals/OrganizationStructure.ts)
- [src/globals/GalleryPage.ts](/D:/projek/test-payload/website/src/globals/GalleryPage.ts)
- [src/globals/RegistrationPage.ts](/D:/projek/test-payload/website/src/globals/RegistrationPage.ts)
- [src/globals/LoginPage.ts](/D:/projek/test-payload/website/src/globals/LoginPage.ts)
- [src/globals/hooks/revalidateFrontendGlobal.ts](/D:/projek/test-payload/website/src/globals/hooks/revalidateFrontendGlobal.ts)

### Shared frontend/data helpers

- [src/utilities/getFrontendData.ts](/D:/projek/test-payload/website/src/utilities/getFrontendData.ts)
  - helper query global dan posts

- [src/utilities/resolveCMSLink.ts](/D:/projek/test-payload/website/src/utilities/resolveCMSLink.ts)
  - normalisasi link Payload jadi href frontend

### Header/Footer/Logo

- [src/app/(frontend)/layout.tsx](/D:/projek/test-payload/website/src/app/(frontend)/layout.tsx)
  - layout server mengambil `header`, `footer`, `site-settings`

- [src/components/maritime/FrontendChrome.tsx](/D:/projek/test-payload/website/src/components/maritime/FrontendChrome.tsx)
  - menerima data header/footer/site settings

- [src/Header/config.ts](/D:/projek/test-payload/website/src/Header/config.ts)
  - menambah CTA header

- [src/Header/Component.client.tsx](/D:/projek/test-payload/website/src/Header/Component.client.tsx)
- [src/Header/Nav/index.tsx](/D:/projek/test-payload/website/src/Header/Nav/index.tsx)
- [src/Footer/Component.client.tsx](/D:/projek/test-payload/website/src/Footer/Component.client.tsx)
- [src/components/Logo/Logo.tsx](/D:/projek/test-payload/website/src/components/Logo/Logo.tsx)

Semua ini sekarang membaca konten dari Payload, bukan array hardcoded.

### Halaman frontend

- [src/app/(frontend)/page.tsx](/D:/projek/test-payload/website/src/app/(frontend)/page.tsx)
  - home dinamis dari `home-page` + `organization-structure` + `posts`

- [src/app/(frontend)/berita/page.tsx](/D:/projek/test-payload/website/src/app/(frontend)/berita/page.tsx)
  - listing berita dinamis dari `posts` + `news-page`

- [src/app/(frontend)/berita/[slug]/page.tsx](/D:/projek/test-payload/website/src/app/(frontend)/berita/[slug]/page.tsx)
  - detail berita dinamis berdasarkan slug

- [src/app/(frontend)/struktur/page.tsx](/D:/projek/test-payload/website/src/app/(frontend)/struktur/page.tsx)
  - struktur dinamis dari `organization-structure`

- [src/app/(frontend)/foto/page.tsx](/D:/projek/test-payload/website/src/app/(frontend)/foto/page.tsx)
  - galeri dinamis dari `gallery-page`

- [src/app/(frontend)/pendaftaran/page.tsx](/D:/projek/test-payload/website/src/app/(frontend)/pendaftaran/page.tsx)
  - konten form dinamis dari `registration-page`

- [src/app/(frontend)/login/page.tsx](/D:/projek/test-payload/website/src/app/(frontend)/login/page.tsx)
  - layout login dinamis dari `login-page`

- [src/app/(frontend)/login/page.client.tsx](/D:/projek/test-payload/website/src/app/(frontend)/login/page.client.tsx)
  - form login ke `/api/users/login`

### Loading/Error/Fallback

- [src/app/(frontend)/loading.tsx](/D:/projek/test-payload/website/src/app/(frontend)/loading.tsx)
- [src/app/(frontend)/error.tsx](/D:/projek/test-payload/website/src/app/(frontend)/error.tsx)
- [src/components/maritime/site.tsx](/D:/projek/test-payload/website/src/components/maritime/site.tsx)
  - menambah empty state dan quick link list reusable

## Routing Berita

Saya juga merapikan agar frontend publik untuk berita konsisten memakai `/berita`, bukan `/posts`.

File yang ikut disesuaikan:

- [src/collections/Posts/hooks/revalidatePost.ts](/D:/projek/test-payload/website/src/collections/Posts/hooks/revalidatePost.ts)
- [src/utilities/generatePreviewPath.ts](/D:/projek/test-payload/website/src/utilities/generatePreviewPath.ts)
- [src/plugins/index.ts](/D:/projek/test-payload/website/src/plugins/index.ts)
- [src/components/Link/index.tsx](/D:/projek/test-payload/website/src/components/Link/index.tsx)

Artinya:

- preview post mengarah ke `/berita/[slug]`
- revalidate post juga menyentuh route `/berita`
- link reference ke `posts` akan diarahkan ke `/berita/...`

## Auth Login

Halaman login sekarang relevan dengan auth Payload:

- form submit ke endpoint bawaan Payload: `/api/users/login`
- memakai cookie auth Payload
- setelah sukses redirect ke path yang diatur di global `login-page`

Saya tidak menaruh secret apa pun di kode.

## Fallback Saat Data Kosong

Agar frontend tidak rusak jika admin belum mengisi data:

- section yang kosong akan tampil empty state yang rapi
- gambar yang kosong akan memakai gradient placeholder
- berita yang kosong tidak membuat page crash
- galeri/struktur/divisi yang kosong tetap render aman

## Hal Yang Tidak Saya Ubah

- `/absensi` tetap custom/manual
- collection `posts` tetap dipakai, tidak diduplikasi
- desain visual Stitch tidak saya rombak total, hanya sumber datanya yang dipindahkan

## Verifikasi Yang Sudah Dilakukan

Berikut validasi yang berhasil:

- `npm.cmd run generate:types`
- `npm.cmd run generate:importmap`
- `npx.cmd tsc --noEmit`
- `npm.cmd run build`

Catatan:

- `npm.cmd run lint` belum bisa dipakai sebagai acuan karena config ESLint project crash lebih dulu dengan error circular structure yang sudah ada di repo

## Yang Perlu Anda Lakukan Setelah Ini

1. Buka admin Payload.
2. Isi global:
   - Site Settings
   - Home Page
   - News Page
   - Organization Structure
   - Gallery Page
   - Registration Page
   - Login Page
3. Upload media ke collection `Media`.
4. Buat/publish artikel di collection `Posts`.
5. Cek halaman frontend hasilnya.

## Ringkasan Singkat

Secara praktis, perubahan utamanya adalah:

- frontend maritim tidak lagi membaca teks/list/gambar dari file hardcoded
- semua konten penting sekarang berasal dari Payload globals + collection existing
- berita sudah punya dynamic detail route berbasis slug
- login sudah tersambung ke auth Payload
- UI tetap mengikuti desain Stitch
