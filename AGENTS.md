# AGENTS.md — Pagar Modern Palembang (pagarmodernpalembang.com)

> **Komunikasi & Bahasa:** Selalu balas, berkomunikasi, dan menulis pesan dalam **Bahasa Indonesia** yang singkat, padat, dan profesional.

---

## 1. Project Overview & Posisi Brand

Website ini adalah **Pagar Modern Palembang** (`pagarmodernpalembang.com`), website spesialisasi etalase hasil produk jadi arsitektural logam modern (6 Kategori: Pagar, Pintu Gerbang, Balkon, Railing Tangga, Kanopi, dan Partisi Ruangan Plat Cutting Laser) yang diproduksi oleh **Sriwijaya Grafika** (Workshop: Talang Jambe, Sukarami, Palembang).

### Hubungan Ekosistem 3 Website
1. **`sriwijayagrafika.com`** — Website korporat & percetakan/advertising induk.
2. **`laserindopalembang.com`** — Website jasa mesin cutting laser maklon/mentah.
3. **`pagarmodernpalembang.com` (Project Ini)** — Website produk jadi pagar & pintu gerbang modern berbahan plat cutting laser siap pasang.

---

## 2. Sumber Kebenaran Tunggal & Aturan Konten

- **SUMBER-PENGETAHUAN.md:** Wajib dibaca sebelum memodifikasi kode atau menambah halaman baru. Berisi spesifikasi 3 jenis mesin workshop (Laser Fiber untuk logam, CNC Router untuk kayu/ACP/PVC, Laser CO2 untuk akrilik), ketebalan material, estimasi harga, daftar 90+ keyword, dan arsitektur SILO.
- **Skill Penulisan Artikel:** Setiap pembuatan, pengeditan, atau ideasi artikel blog **WAJIB** menggunakan **skill `penulis-ahli`** (standar Google AI 2026, humanizer, anti-klise, dan E-E-A-T lokal Palembang).

---

## 3. Tech Stack & Perintah

| Layer | Teknologi |
|---|---|
| Framework | Astro 5 (Static Site Generation / SSG) |
| Styling | Tailwind CSS v4 + `@tailwindcss/vite` + `@tailwindcss/typography` |
| Sitemap | `@astrojs/sitemap` |
| MDX | `@astrojs/mdx` |
| Deployment | Netlify (`netlify.toml` -> `npm run build` -> publish `dist`) |
| Font | Plus Jakarta Sans (Body & Headings modern clean) |

### Perintah Utama
```bash
npm run dev      # Jalankan local development server
npm run build    # Build static site ke folder dist/
npm run preview  # Pratinjau hasil build dist/
```

---

## 4. Arsitektur Struktur Folder

```
src/
├── config/
│   └── site.ts             # Data tunggal NAP, URL, kontak, medsos
├── data/
│   ├── silo.ts             # Peta lengkap SILO & navigasi internal
│   ├── keywords.ts         # Master list 90+ keyword SEO
│   └── materials.ts        # Data material & ketebalan plat
├── content.config.ts       # Schema Zod untuk content collections (Astro 5)
├── content/
│   └── blog/               # Koleksi artikel & motif Markdown (penulis-ahli)
├── layouts/
│   ├── BaseLayout.astro    # Shell HTML, Navbar, Footer, Floating WA
│   └── SEOHead.astro       # Meta tags, OpenGraph, Canonical, Twitter Card
├── components/
│   ├── Header.astro        # Navigasi responsif desktop & mobile
│   ├── Footer.astro        # Footer lengkap NAP & tautan ekosistem
│   ├── Schema.astro        # JSON-LD (LocalBusiness, Breadcrumb, Article, FAQ)
│   ├── CtaWhatsapp.astro   # Tombol / Banner WhatsApp konversi tinggi
│   ├── Breadcrumb.astro    # Navigasi remah roti untuk hierarki SILO
│   ├── ArticleCard.astro   # Kartu artikel blog edukasi rasio 4:3
│   ├── MotifCard.astro     # Kartu desain motif rasio 4:3
│   └── MaterialTable.astro # Tabel kapasitas ketebalan material workshop
└── pages/
    ├── index.astro         # Beranda (Hero, SILO Grid, Keunggulan, FAQ)
    ├── pagar/
    │   └── index.astro         # Hub Silo Pagar
    ├── pintu/
    │   └── index.astro         # Hub Silo Pintu
    ├── balkon/
    │   └── index.astro         # Hub Silo Balkon
    ├── railing/
    │   └── index.astro         # Hub Silo Railing Tangga
    ├── kanopi/
    │   └── index.astro         # Hub Silo Kanopi
    ├── partisi/
    │   └── index.astro         # Hub Silo Partisi Ruangan
    ├── [kategori]/
    │   └── [id].astro          # Halaman konten blog produk (/[kategori]/[slug]) & blog umum (/blog/[slug])
    ├── motif-laser-cutting/
    │   └── index.astro         # Hub Silo Motif (Daun, Bunga, Wayang, Batik)
    ├── blog/
    │   └── index.astro         # Direktori arsip artikel & panduan (artikel non-produk ber-permalink /blog/[slug])
    ├── tentang-sriwijaya-grafika.astro # Profil & sejarah workshop sejak 2008
    ├── kontak.astro        # Kontak resmi, peta workshop, form inquiry
    └── area-layanan/
        └── palembang.astro # Halaman otoritas lokal Palembang & sekitarnya
```

---

## 5. Konvensi SEO & Aturan SILO (Ketat)

1. **Struktur SILO Rapat:**
   - Halaman sub-silo (misal `/pagar/minimalis`) harus memiliki breadcrumb dan link balik ke Hub Silo (`/pagar`).
   - Jangan membuat halaman yatim piatu (*orphan page*). Setiap halaman baru harus didaftarkan di navigasi atau di-link dari hub-nya.
2. **Anchor Text Bernilai Keyword:**
   - Gunakan anchor text deskriptif berbasis keyword (contoh: *"lihat model pagar laser cutting minimalis"*, bukan *"klik di sini"*).
3. **Structured Data JSON-LD:**
   - Setiap halaman wajib menyertakan schema `BreadcrumbList`.
   - Halaman utama dan kontak wajib memiliki schema `LocalBusiness` / `HomeAndConstructionBusiness` dengan data NAP konsisten.
   - Halaman blog otomatis merender schema `Article` dan `FAQPage`.
4. **Harga:**
   - Selalu sertakan kata "Mulai Dari" atau instruksi "Hubungi WhatsApp untuk perhitungan volume". Jangan pernah mengunci harga flat tanpa syarat.
5. **Larangan Titik Dua (:) pada Heading:**
   - DILARANG menggunakan tanda titik dua (`:`) pada heading manapun (H1, H2, H3, H4, dst.) baik pada file Markdown (.md) maupun komponen Astro (.astro).
   - Ganti tanda titik dua dengan tanda koma (`,`), tanda titik (`.`), tanda pisah (`—`), atau susun ulang kalimat secara alami tanpa tanda titik dua.

---

## 6. Checklist Sebelum Menyelesaikan Tugas

- [ ] Jalankan `npm run build` untuk memverifikasi tidak ada error sintaks atau rute rusak.
- [ ] Pastikan sitemap XML terbuat di `dist/sitemap-index.xml`.
- [ ] Cek file `SUMBER-PENGETAHUAN.md` jika ada penambahan produk/harga baru.
- [ ] Jaga konsistensi data NAP: `0852-1511-1125` dan `Jl. AMD Jl. Pertanian No.105, Talang Jambe, Sukarami, Palembang`.
