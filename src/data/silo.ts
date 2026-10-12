export interface SiloNode {
  title: string;
  slug: string;
  url: string;
  description: string;
  badge?: string;
  primaryKeyword: string;
  subPages?: SiloNode[];
}

export interface NavItem {
  label: string;
  url: string;
  children?: { label: string; url: string; description?: string }[];
}

export const PRODUCT_CATEGORIES = [
  {
    slug: 'pagar',
    name: 'Pagar',
    fullName: 'Pagar Plat Cutting Laser',
    url: '/pagar/',
    image: '/produk/pagar-laser-cutting_poco.webp',
    description: 'Pagar rumah minimalis & mewah berbahan plat besi galvanis dan stainless steel pemotongan fiber laser presisi.',
    badge: 'Utama',
    icon: 'fence'
  },
  {
    slug: 'pintu',
    name: 'Pintu',
    fullName: 'Pintu Plat Cutting Laser',
    url: '/pintu/',
    image: '/produk/pintu-laser-cutting_poco.webp',
    description: 'Pintu gerbang dorong (sliding) & lipat (folding) kokoh dengan panel ornamen plat cutting laser.',
    badge: 'Populer',
    icon: 'door_front'
  },
  {
    slug: 'balkon',
    name: 'Balkon',
    fullName: 'Pagar Balkon Plat Cutting',
    url: '/balkon/',
    image: '/produk/balkon-laser-cutting_poco.webp',
    description: 'Pengaman balkon lantai 2 dengan motif laser cutting elegan dan finishing tahan cuaca outdoor.',
    badge: 'Estetik',
    icon: 'balcony'
  },
  {
    slug: 'railing',
    name: 'Railing',
    fullName: 'Railing Tangga Plat Cutting',
    url: '/railing/',
    image: '/produk/railing-tangga-laser-cutting_poco.webp',
    description: 'Railing tangga indoor & outdoor berpadu handrail kayu atau stainless steel motif presisi.',
    badge: 'Interior',
    icon: 'stairs'
  },
  {
    slug: 'kanopi',
    name: 'Kanopi',
    fullName: 'Kanopi Plat Cutting Laser',
    url: '/kanopi/',
    image: '/produk/kanopi-laser-cutting_poco.webp',
    description: 'Plafon dan atap kanopi carport dengan panel perforated/cutting laser untuk pencahayaan artistik.',
    badge: 'Modern',
    icon: 'roofing'
  },
  {
    slug: 'partisi',
    name: 'Partisi',
    fullName: 'Partisi Ruangan Laser Cutting',
    url: '/partisi/',
    image: '/produk/partisi-laser-cutting_poco.webp',
    description: 'Sekat partisi ruangan interior pembatas ruang tamu, mushola, foyer, dan kantor.',
    badge: 'Dekoratif',
    icon: 'grid_view'
  }
];

export const SILO_TREE: SiloNode[] = [
  {
    title: 'Pagar Plat Laser Cutting',
    slug: 'pagar',
    url: '/pagar/',
    description: 'Koleksi pagar plat besi dan stainless modern dengan presisi pemotongan laser fiber.',
    badge: 'Pilar 1',
    primaryKeyword: 'pagar laser cutting palembang',
    subPages: [
      {
        title: 'Pagar Cutting Minimalis',
        slug: 'minimalis',
        url: '/pagar/minimalis/',
        description: 'Desain geometris clean, elegan, dan estetik untuk perumahan modern Palembang.',
        badge: 'Favorit',
        primaryKeyword: 'pagar cutting minimalis'
      }
    ]
  },
  {
    title: 'Pintu Plat Laser Cutting',
    slug: 'pintu',
    url: '/pintu/',
    description: 'Pintu gerbang dorong (sliding) & lipat (folding) kokoh dengan panel motif laser artistik.',
    badge: 'Pilar 2',
    primaryKeyword: 'pintu laser cutting'
  },
  {
    title: 'Pagar Balkon Plat Cutting',
    slug: 'balkon',
    url: '/balkon/',
    description: 'Pengaman balkon lantai 2 bermotif mewah dengan proteksi karat cuaca tropis.',
    badge: 'Pilar 3',
    primaryKeyword: 'balkon cutting laser'
  },
  {
    title: 'Railing Tangga Laser Cutting',
    slug: 'railing',
    url: '/railing/',
    description: 'Railing tangga interior dan exterior dengan motif presisi berpadu handrail kayu atau besi.',
    badge: 'Pilar 4',
    primaryKeyword: 'pagar tangga cutting laser'
  },
  {
    title: 'Kanopi Plat Laser Cutting',
    slug: 'kanopi',
    url: '/kanopi/',
    description: 'Atap carport dan kanopi teras modern dengan bayangan motif cutting artistik.',
    badge: 'Pilar 5',
    primaryKeyword: 'kanopi laser cutting palembang'
  },
  {
    title: 'Partisi Ruangan Laser Cutting',
    slug: 'partisi',
    url: '/partisi/',
    description: 'Sekat ruangan dekoratif motif laser cutting presisi untuk rumah, cafe, dan kantor.',
    badge: 'Pilar 6',
    primaryKeyword: 'partisi laser cutting palembang'
  },
  {
    title: 'Galeri Motif Ornamen',
    slug: 'motif-laser-cutting',
    url: '/motif-laser-cutting/',
    description: 'Katalog motif daun, floral, wayang, batik Nusantara, dan ornamen geometris modern.',
    badge: 'Katalog Desain',
    primaryKeyword: 'motif pagar laser cutting'
  },
  {
    title: 'Blog & Edukasi',
    slug: 'blog',
    url: '/blog/',
    description: 'Panduan harga per meter, tips pemilihan ketebalan plat, dan tren desain pagar.',
    primaryKeyword: 'harga pagar laser cutting per meter'
  }
];

export const NAV_LINKS: NavItem[] = [
  { label: 'Beranda', url: '/' },
  {
    label: 'Produk',
    url: '/#produk',
    children: [
      { label: 'Pagar', url: '/pagar/', description: 'Pagar minimalis & mewah plat besi' },
      { label: 'Pintu', url: '/pintu/', description: 'Pintu & gerbang laser cutting' },
      { label: 'Balkon', url: '/balkon/', description: 'Pengaman lantai 2 estetis' },
      { label: 'Railing', url: '/railing/', description: 'Railing tangga interior & exterior' },
      { label: 'Kanopi', url: '/kanopi/', description: 'Atap carport motif artistik' },
      { label: 'Partisi', url: '/partisi/', description: 'Sekat ruangan interior dekoratif' },
    ]
  },
  { label: 'Motif Ornamen', url: '/motif-laser-cutting/' },
  { label: 'Blog', url: '/blog/' },
  { label: 'Kontak', url: '/kontak/' },
];
