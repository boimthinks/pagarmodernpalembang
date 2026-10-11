export interface MachineType {
  id: 'laser-fiber' | 'cnc-router' | 'laser-co2';
  name: string;
  shortName: string;
  specialty: string;
  badgeColor: string;
  image: string;
  articleUrl: string;
  materials: string[];
}

export interface MaterialGroup {
  name: string;
  machine: 'Laser Fiber' | 'CNC Router' | 'Laser CO2';
  machineId: 'laser-fiber' | 'cnc-router' | 'laser-co2';
  category: 'logam-utama' | 'logam-ringan' | 'non-logam' | 'komposit';
  description: string;
  application: string;
  thicknesses: string[];
  recommendedForFence: boolean;
}

export const WORKSHOP_MACHINES: MachineType[] = [
  {
    id: 'laser-fiber',
    name: 'Mesin Potong Laser Fiber',
    shortName: 'Laser Fiber',
    specialty: 'Khusus pemotongan lembaran logam presisi 0.1 mm, tepian halus tanpa gerinda (burr-free).',
    badgeColor: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
    image: '/mesin/mesin-potong-laser-fiber_poco.webp',
    articleUrl: '/blog/mesin-potong-laser-fiber-palembang',
    materials: ['Plat Besi & Galvanis (0.6-12mm)', 'Stainless Steel (0.6-3mm)', 'Aluminium Plate (1.2-3mm)']
  },
  {
    id: 'cnc-router',
    name: 'Mesin Potong CNC Router',
    shortName: 'CNC Router',
    specialty: 'Khusus material kayu lapis, komposit panel, dan plastik sintetis dengan pahat router presisi.',
    badgeColor: 'border-amber-500/40 bg-amber-500/10 text-amber-400',
    image: '/mesin/mesin-potong-CNC-router_poco.webp',
    articleUrl: '/blog/mesin-potong-cnc-router-palembang',
    materials: ['Plywood (3-20mm)', 'MDF / MHR (3-20mm)', 'PVC Board (3-20mm)', 'ACP (3-4mm)']
  },
  {
    id: 'laser-co2',
    name: 'Mesin Potong Laser CO2',
    shortName: 'Laser CO2',
    specialty: 'Khusus lembaran akrilik transparan dan warna dengan tepian potongan bening mengkilap.',
    badgeColor: 'border-cyan-500/40 bg-cyan-500/10 text-cyan-400',
    image: '/mesin/mesin-potong-laser-CO2_poco.webp',
    articleUrl: '/blog/mesin-potong-laser-co2-palembang',
    materials: ['Akrilik / Acrylic (2-10mm)']
  }
];

export const MATERIALS: MaterialGroup[] = [
  {
    name: 'Plat Besi & Galvanis (Mild Steel)',
    machine: 'Laser Fiber',
    machineId: 'laser-fiber',
    category: 'logam-utama',
    description: 'Material paling kokoh dan populer untuk pagar luar ruangan, pintu gerbang lipat/dorong, dan ornamen arsitektural.',
    application: 'Pagar utama hunian, pintu gerbang dorong/lipat, balkon lantai 2, teralis pengaman.',
    recommendedForFence: true,
    thicknesses: [
      '0.6 - 1.1 mm',
      '1.4 - 2.0 mm',
      '2.4 - 3.4 mm',
      '3.8 - 5.0 mm',
      '6.0 - 8.0 mm',
      '8.1 - 9.0 mm',
      '9.1 - 10.0 mm',
      '10.1 - 11.0 mm',
      '11.1 - 12.0 mm'
    ]
  },
  {
    name: 'Stainless Steel (304 / 201)',
    machine: 'Laser Fiber',
    machineId: 'laser-fiber',
    category: 'logam-utama',
    description: 'Material premium anti karat dengan kilau mewah, sangat tahan cuaca hujan dan kelembaban tropis Palembang.',
    application: 'Pagar mewah tahan korosi, railing tangga indoor/outdoor, balkon eksklusif, aksen gerbang.',
    recommendedForFence: true,
    thicknesses: [
      '0.6 - 1.2 mm',
      '1.5 - 2.0 mm',
      '2.1 - 3.0 mm'
    ]
  },
  {
    name: 'Aluminium Plate',
    machine: 'Laser Fiber',
    machineId: 'laser-fiber',
    category: 'logam-ringan',
    description: 'Logam ringan, bebas karat, ideal untuk pintu gerbang otomatis elektrik yang membutuhkan beban ringan.',
    application: 'Pagar modern minimalis, gerbang sliding otomatis, railing balkon ringan, panel kanopi.',
    recommendedForFence: true,
    thicknesses: [
      '1.2 - 1.6 mm',
      '1.5 - 2.0 mm',
      '2.1 - 3.0 mm'
    ]
  },
  {
    name: 'Plywood & Kayu Olahan',
    machine: 'CNC Router',
    machineId: 'cnc-router',
    category: 'non-logam',
    description: 'Papan kayu lapis presisi untuk perpaduan elemen industrial tropis dan partisi interior.',
    application: 'Aksen panel kisi-kisi interior, partisi rumah, ornamen tangga.',
    recommendedForFence: false,
    thicknesses: [
      '3.0 mm',
      '4.0 - 6.0 mm',
      '7.0 - 9.0 mm',
      '10.0 - 12.0 mm',
      '13.0 - 20.0 mm'
    ]
  },
  {
    name: 'MDF / MHR & PVC Board',
    machine: 'CNC Router',
    machineId: 'cnc-router',
    category: 'non-logam',
    description: 'Material komposit serat kayu dan PVC padat tahan rayap untuk panel ornamen interior.',
    application: 'Partisi ruangan mushola, kisi dinding ruang tamu, ornamen plafon interior.',
    recommendedForFence: false,
    thicknesses: [
      '3.0 mm',
      '4.0 - 6.0 mm',
      '7.0 - 9.0 mm',
      '10.0 - 12.0 mm',
      '13.0 - 20.0 mm'
    ]
  },
  {
    name: 'ACP (Aluminium Composite Panel)',
    machine: 'CNC Router',
    machineId: 'cnc-router',
    category: 'komposit',
    description: 'Panel komposit aluminium dengan inti polyethylene, tahan cuaca outdoor dengan aneka pilihan warna modern.',
    application: 'Kombinasi panel pagar modern, fasad depan rumah, backdrop nomor rumah cutting laser.',
    recommendedForFence: false,
    thicknesses: [
      '3.0 mm',
      '4.0 mm'
    ]
  },
  {
    name: 'Akrilik (Acrylic)',
    machine: 'Laser CO2',
    machineId: 'laser-co2',
    category: 'non-logam',
    description: 'Material polimer tembus cahaya atau solid untuk aksen artistik, nomor rumah laser cut, dan backlit LED gerbang.',
    application: 'Logo plat gerbang, nomor rumah menyala, ornamen dekoratif indoor.',
    recommendedForFence: false,
    thicknesses: [
      '2.0 - 10.0 mm'
    ]
  }
];
