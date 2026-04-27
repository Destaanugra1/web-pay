# Dashboard Flow dan Fungsional

Dokumen ini memetakan alur dashboard admin yang ada di project ini, fungsi tiap menu, keterkaitannya ke frontend, dan catatan penting sebelum rombak UI.

## Ringkasan Utama

- Project ini punya **1 dashboard admin utama** berbasis Payload di `/admin`.
- Dashboard itu dipakai untuk mengelola:
  - collection: `Pages`, `Posts`, `Media`, `Categories`, `Users`
  - global settings: `Header`, `Footer`, `Site Settings`, `Home Page`, `News Page`, `Organization Structure`, `Gallery Page`, `Registration Page`, `Login Page`
- Halaman frontend utama yang benar-benar ditenagai dashboard:
  - `/`
  - `/berita`
  - `/berita/[slug]`
  - `/struktur`
  - `/foto`
  - `/pendaftaran`
  - `/login`
  - `/<slug>` untuk halaman generik dari collection `Pages`
- Ada beberapa route frontend tambahan yang **bukan dashboard-driven penuh**:
  - `/absensi` masih statis
  - `/stitch` adalah console internal
  - `/daftar` redirect ke `/pendaftaran`
  - `/daftar-kader` redirect ke `/pendaftaran`
  - `/foto-bph` redirect ke `/foto`

## Alur Besar Sistem

### 1. Alur akses admin

1. User masuk lewat `/login`
2. Form mengirim kredensial ke `/api/users/login`
3. Jika sukses, user diarahkan ke `/admin`
4. Di dashboard admin, user memilih menu untuk mengelola konten
5. Saat data disimpan, halaman frontend terkait direvalidate
6. User bisa pakai live preview untuk melihat draft

### 2. Alur data konten

1. Admin mengubah data di collection atau global
2. Payload menyimpan data ke SQLite
3. Hook revalidate memicu refresh halaman frontend terkait
4. Frontend mengambil data via `queryGlobal`, `payload.find`, atau `payload.findGlobal`
5. Halaman publik merender sesuai data terbaru

## Peta Menu Dashboard

## A. Login dan Dashboard Home

### 1. Login publik

- Route: `/login`
- Fungsi:
  - menampilkan branding halaman login
  - form email/password
  - opsi login sekunder bila diperlukan
- Alur UI:
  - panel kiri untuk branding
  - panel kanan untuk form login
  - jika gagal, muncul error
  - jika sukses, redirect default ke `/admin`
- Sumber konfigurasi:
  - global `Login Page`

### 2. Dashboard landing

- Route: `/admin`
- Fungsi:
  - halaman sambutan setelah login
  - tombol seed data
  - arahan awal untuk admin
- Catatan:
  - ini bukan dashboard analitik
  - saat ini hanya welcome block bawaan yang dikustom

## B. Global Navigation dan Identitas

### 3. Header

- Fungsi:
  - mengatur item navigasi utama
  - mengatur CTA di header
- Output frontend:
  - navbar utama situs
- Alur admin:
  1. tambah/edit `navItems`
  2. set CTA header
  3. simpan
  4. header frontend ikut berubah

### 4. Footer

- Fungsi:
  - mengatur daftar link footer
- Output frontend:
  - navigasi footer

### 5. Site Settings

- Fungsi:
  - identitas global website
  - nama situs
  - logo
  - deskripsi footer
  - alamat, email, telepon, copyright
- Output frontend:
  - header
  - footer
  - identitas lintas halaman
- Cocok dijadikan:
  - panel brand/settings global

## C. Dashboard Konten Halaman Utama

### 6. Home Page

- Output frontend: `/`
- Fungsi utama:
  - hero homepage
  - CTA utama
  - section about
  - kartu pengenalan
  - showcase visual
  - statistik
  - teaser berita
  - teaser struktur/BPH
  - quick links
- Alur halaman di frontend:
  1. hero + CTA
  2. pengenalan organisasi
  3. showcase visual
  4. statistik
  5. berita unggulan
  6. pimpinan/BPH
  7. quick links
- Dependensi:
  - berita diambil dari `Posts`
  - data pimpinan diambil dari `Organization Structure`
- Implikasi redesign:
  - ini bukan satu form tunggal, tapi content-builder per section
  - UI admin idealnya dipisah per blok/section agar editor tidak bingung

### 7. News Page

- Output frontend:
  - `/berita`
  - sebagian copy untuk `/berita/[slug]`
- Fungsi utama:
  - hero halaman berita
  - copy listing berita
  - placeholder search
  - label read more
  - judul arsip
  - panel tambahan untuk detail berita
- Alur listing `/berita`:
  1. hero berita
  2. heading section listing
  3. search visual placeholder
  4. featured article
  5. secondary cards
  6. arsip berita
- Alur detail `/berita/[slug]`:
  1. meta artikel
  2. judul + deskripsi
  3. hero image
  4. body artikel
  5. highlight quote/callout
  6. sidebar related/trending
  7. panel share
- Dependensi:
  - isi artikel berasal dari collection `Posts`
  - kategori dari `Categories`
  - related article dari relasi `Posts`

### 8. Organization Structure

- Output frontend:
  - `/struktur`
  - sebagian section pimpinan di homepage
- Fungsi utama:
  - hero struktur
  - data pimpinan utama
  - anggota inti
  - daftar divisi
  - tugas tiap divisi
- Alur halaman:
  1. hero
  2. card pimpinan
  3. anggota inti
  4. section divisi
  5. card divisi + koordinator + tugas
- Implikasi redesign:
  - secara informasi ini mirip org-chart + directory
  - UI admin sebaiknya dipisah antara:
    - pimpinan
    - core team
    - divisi
    - task divisi

### 9. Gallery Page

- Output frontend:
  - `/foto`
  - `/foto-bph` redirect ke `/foto`
- Fungsi utama:
  - hero galeri
  - tab label
  - judul/deskripsi galeri
  - item dokumentasi
- Alur halaman:
  1. hero
  2. tab visual
  3. intro section
  4. grid galeri
- Catatan penting:
  - tab saat ini hanya label visual
  - belum terlihat logic filtering nyata di frontend
- Implikasi redesign:
  - kalau mau UI lebih kuat, bisa naik kelas jadi gallery manager dengan kategori/filter nyata

### 10. Registration Page

- Output frontend:
  - `/pendaftaran`
  - `/daftar`
  - `/daftar-kader`
- Fungsi utama:
  - hero pendaftaran
  - judul/deskripsi form
  - step label
  - opsi fakultas
  - opsi divisi
  - label upload
  - label submit
- Alur halaman:
  1. hero
  2. stepper visual
  3. heading form
  4. input data diri
  5. pilih fakultas
  6. pilih divisi
  7. isi motivasi
  8. upload area
  9. submit
- Catatan penting:
  - saat ini form masih tampak sebagai UI statis
  - belum terlihat penyimpanan submit ke backend di komponen ini
- Implikasi redesign:
  - bedakan jelas antara:
    - pengaturan tampilan form
    - pengaturan opsi pilihan
    - hasil pendaftaran/submission
  - saat ini layer submission management belum ada di admin

## D. Collections Operasional

### 11. Posts

- Fungsi:
  - pusat konten berita/artikel
- Dipakai di:
  - `/berita`
  - `/berita/[slug]`
  - route template lama `/posts`
- Field utama:
  - title
  - content rich text
  - hero image
  - related posts
  - categories
  - SEO
  - publish date
  - authors
- Alur kerja editor:
  1. buat artikel
  2. isi body
  3. upload hero image
  4. pilih kategori
  5. atur artikel terkait
  6. set SEO
  7. publish/schedule
- Nilai UI:
  - ini layak jadi salah satu menu paling penting
  - bisa dirombak seperti newsroom CMS

### 12. Categories

- Fungsi:
  - klasifikasi artikel
- Dipakai di:
  - tag visual berita
  - pengelompokan konten
- Field utama:
  - title
  - image
  - slug

### 13. Media

- Fungsi:
  - pusat semua upload gambar/video
  - dipakai hampir semua modul
- Fitur:
  - folder
  - alt text
  - caption
  - image sizes turunan
- Nilai UI:
  - penting bila mau bikin dashboard lebih usable
  - cocok diberi mode grid, folder browser, quick insert

### 14. Pages

- Fungsi:
  - halaman generik berbasis block builder
- Output frontend:
  - `/<slug>`
- Struktur:
  - title
  - hero
  - blocks content
  - featured image
  - SEO
  - publish date
- Alur editor:
  1. buat halaman
  2. isi hero
  3. susun block content
  4. isi SEO
  5. preview
  6. publish
- Catatan:
  - ini area paling fleksibel
  - cocok untuk halaman custom selain homepage khusus

### 15. Users

- Fungsi:
  - akun admin/pengguna internal
  - autentikasi dashboard
- Field utama:
  - nama
  - email/login
  - foto profil
- Catatan:
  - ini bukan member directory publik
  - ini user admin/auth

## E. Halaman Khusus yang Perlu Diketahui

### 16. Absensi

- Route: `/absensi`
- Status:
  - frontend statis
  - belum tersambung ke data Payload
- Isi:
  - form kehadiran
  - pilihan status hadir
  - area catatan
  - upload bukti
  - panel ringkasan
- Implikasi:
  - jika ingin jadi dashboard nyata, perlu collection/global/submission model baru

### 17. Stitch Console

- Route: `/stitch`
- Status:
  - utility page internal
  - bukan modul dashboard konten utama

### 18. Route template lama

- Route `/posts` dan `/posts/[slug]` masih ada dari template awal.
- Collection yang dipakai tetap `posts`, tapi jalur publik utama project ini sekarang jelas diarahkan ke `/berita`.
- Sebelum redesign besar, sebaiknya diputuskan:
  - tetap dipakai
  - di-redirect
  - atau dihapus

## Rekomendasi Struktur UI Dashboard Baru

Kalau dashboard mau dirombak, struktur yang paling masuk akal:

### Group 1. Content

- Beranda
- Berita
- Struktur Organisasi
- Galeri
- Pendaftaran
- Halaman Umum

### Group 2. Library

- Media
- Kategori

### Group 3. Navigation

- Header
- Footer

### Group 4. Settings

- Site Settings
- Login Page

### Group 5. Access

- Users

## Rekomendasi UX Per Modul

- `Home Page`: gunakan section-based editor, bukan satu form panjang.
- `News Page + Posts`: pisahkan pengaturan halaman listing dengan manajemen artikel.
- `Organization Structure`: tampilkan seperti org chart manager atau team directory editor.
- `Gallery Page`: ubah dari sekadar array menjadi gallery collection jika item akan banyak.
- `Registration Page`: pisahkan antara form schema, opsi pilihan, dan submission results.
- `Media`: jadikan media browser yang cepat, karena ini dependency semua modul.

## Masalah Produk yang Terlihat Saat Ini

- Dashboard home belum berisi ringkasan KPI, hanya welcome block.
- `/absensi` belum punya backend/dashboard management.
- `/pendaftaran` tampak belum menyimpan submission nyata dari form publik.
- tab pada galeri masih visual, belum fungsional sebagai filter.
- ada sisa route template `posts` yang bisa membingungkan arsitektur konten.

## File Referensi Penting

- `src/payload.config.ts`
- `src/collections/Pages/index.ts`
- `src/collections/Posts/index.ts`
- `src/collections/Media.ts`
- `src/collections/Categories.ts`
- `src/collections/Users/index.ts`
- `src/globals/HomePage.ts`
- `src/globals/NewsPage.ts`
- `src/globals/OrganizationStructure.ts`
- `src/globals/GalleryPage.ts`
- `src/globals/RegistrationPage.ts`
- `src/globals/LoginPage.ts`
- `src/globals/SiteSettings.ts`
- `src/app/(frontend)/HomePageContent.tsx`
- `src/app/(frontend)/berita/BeritaPageContent.tsx`
- `src/app/(frontend)/berita/[slug]/BeritaDetailContent.tsx`
- `src/app/(frontend)/struktur/StrukturPageContent.tsx`
- `src/app/(frontend)/foto/FotoPageContent.tsx`
- `src/app/(frontend)/pendaftaran/PendaftaranPageContent.tsx`
- `src/app/(frontend)/login/LoginPageContent.tsx`

