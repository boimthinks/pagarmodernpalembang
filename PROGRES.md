# Laporan Progres Pengembangan pagarmodernpalembang.com

Tanggal Pembaruan: 07 Oktober 2026

---

## 1. Identitas & Posisi Proyek

- **Nama Domain:** `pagarmodernpalembang.com`
- **Brand Pemilik:** Sriwijaya Grafika (Workshop: Jl. AMD Pertanian No.105, Talang Jambe, Sukarami, Palembang)
- **Kontak Resmi:** WhatsApp `0852-1511-1125`
- **Posisi Ekosistem:**
  1. `sriwijayagrafika.com` — Website korporat & percetakan/advertising induk.
  2. `laserindopalembang.com` — Website jasa maklon mesin potong laser mentah.
  3. `pagarmodernpalembang.com` (Proyek Ini) — Website spesialis produk jadi arsitektural logam cutting laser siap pasang.

---

## 2. Arsitektur Rute & Struktur URL Aktif

Arsitektur URL dirapikan menjadi struktur bersih tingkat root (tanpa prefiks `/produk`):

### 6 Halaman Pilar Produk (Root Level)
1. `/pagar` (`src/pages/pagar/index.astro`)
2. `/pintu` (`src/pages/pintu/index.astro`)
3. `/balkon` (`src/pages/balkon/index.astro`)
4. `/railing` (`src/pages/railing/index.astro`)
5. `/kanopi` (`src/pages/kanopi/index.astro`)
6. `/partisi` (`src/pages/partisi/index.astro`)

### Halaman Direktori Index
- `/blog` (`src/pages/blog/index.astro`) — Index khusus konten dengan frontmatter `tipe: "artikel"`.
- `/motif-laser-cutting` (`src/pages/motif-laser-cutting/index.astro`) — Index khusus konten dengan frontmatter `tipe: "motif"`.
- `/#produk` — Navigasi menu header Produk langsung mengarah ke section katalog 6 kategori di homepage.

### Halaman Konten Dinamis
- `/[kategori]/[id]` (`src/pages/[kategori]/[id].astro`) — Menangani render konten Markdown dari `src/content/blog/` berdasarkan field `label_produk` (contoh: `/pagar/minimalis`, `/pagar/harga-pagar-laser-cutting-per-meter-palembang`).

---

## 3. Skema Content Collection (`src/content.config.ts`)

Koleksi tunggal: `blog` (`src/content/blog/*.md`) dengan skema Zod:
- `title`: String (maks 80 karakter)
- `titleSeo`: String (maks 120 karakter)
- `tipe`: Enum `['artikel', 'motif']` (default: `'artikel'`)
- `label_produk`: Enum `['pagar', 'pintu', 'balkon', 'railing', 'kanopi', 'partisi']`
- `excerpt`: String (20–350 karakter)
- `date`: String
- `topik`: Enum opsional (`panduan`, `tips`, `studi kasus`, `harga`, `kabar`, `motif`)
- `imgurl`: String (path gambar 4:3, sementara default `/og-default.svg`)
- `imgalt`: String opsional
- `pengantar`: String opsional (min 30 karakter)
- `kesimpulan`: String opsional (min 30 karakter)
- `published`: Boolean (default: true)
- `faq`: Array object `[{ question, answer }]` (otomatis dirender ke FAQ schema & accordion)

### Daftar Konten Markdown yang Sudah Terbit (5 File)
1. `src/content/blog/harga-pagar-laser-cutting-per-meter-palembang.md`
   - URL: `/pagar/harga-pagar-laser-cutting-per-meter-palembang` | Tipe: `artikel` | Label: `pagar`
2. `src/content/blog/panduan-memilih-ketebalan-plat-pagar-cutting.md`
   - URL: `/pagar/panduan-memilih-ketebalan-plat-pagar-cutting` | Tipe: `artikel` | Label: `pagar`
3. `src/content/blog/minimalis.md`
   - URL: `/pagar/minimalis` | Tipe: `motif` | Label: `pagar`
4. `src/content/blog/pagar-cutting-motif-songket-palembang.md`
   - URL: `/pagar/pagar-cutting-motif-songket-palembang` | Tipe: `motif` | Label: `pagar`
5. `src/content/blog/kombinasi-woodplank.md`
   - URL: `/pagar/kombinasi-woodplank` | Tipe: `motif` | Label: `pagar`

---

## 4. Standar Visual & Komponen Terbaru

1. **Komponen Cardview Berasio 4:3:**
   - `src/components/ArticleCard.astro` — Untuk artikel panduan dan edukasi biaya, kontainer gambar `aspect-[4/3]`, badge topik, dan tombol baca lengkap.
   - `src/components/MotifCard.astro` — Untuk kartu galeri desain motif, kontainer gambar `aspect-[4/3]`, badge kategori, tombol detail, dan tombol request mockup WhatsApp.
2. **Pola Hero 2 Kolom di Seluruh 6 Halaman Pilar:**
   - Kolom kiri: Badge pilar, H1 berbobot SEO lokal, deskripsi, dan 2 tombol CTA.
   - Kolom kanan: Kontainer gambar `aspect-[4/3]` berbingkai modern dengan badge fitur dan teks workshop.
   - Langsung diikuti section **"Desain Motif"** di bawah hero.
3. **Penyelarasan Tabel Kapasitas Bahan (`src/data/materials.ts`):**
   - Keterangan dalam kurung pada rentang ketebalan plat besi telah dihapus agar tabel bersih dan konsisten dengan material lain.

---

## 5. Kepatuhan Aturan & Standar Proyek

- **Heading Bebas Titik Dua:** Seluruh H1 hingga H4 di halaman `.astro` dan file `.md` bebas tanda titik dua (`:`).
- **Humanizer & Bebas Tanda Pisah:** Tidak menggunakan em dash (`—`) atau en dash (`–`) dalam konten teks.
- **Verifikasi Build:** `npm run build` sukses 100% (18 halaman statis terbuat sempurna).

---

## 6. Agenda Langkah Selanjutnya (Untuk Sesi Besok)

1. **Penggantian Gambar Placeholder:** Mengganti gambar default `/og-default.svg` dengan foto asli hasil pengerjaan workshop Sriwijaya Grafika (rasio 4:3) untuk artikel dan motif.
2. **Pembuatan Konten Motif untuk 5 Kategori Lainnya:**
   - Pintu (`label_produk: "pintu"`, `tipe: "motif"`)
   - Balkon (`label_produk: "balkon"`, `tipe: "motif"`)
   - Railing (`label_produk: "railing"`, `tipe: "motif"`)
   - Kanopi (`label_produk: "kanopi"`, `tipe: "motif"`)
   - Partisi (`label_produk: "partisi"`, `tipe: "motif"`)
3. **Penulisan Artikel Edukasi Baru:** Membuat artikel panduan teknis/biaya untuk kategori pintu gerbang dan kanopi menggunakan skill `penulis-ahli`.
