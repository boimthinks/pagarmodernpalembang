import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string().max(80),
    titleSeo: z.string().max(120),
    tipe: z.enum(['artikel', 'motif']).default('artikel'),
    label_produk: z.enum(['pagar', 'pintu', 'balkon', 'railing', 'kanopi', 'partisi', 'blog']),
    excerpt: z.string().min(20).max(350),
    date: z.string(),
    topik: z.enum(['panduan', 'tips', 'studi kasus', 'harga', 'kabar', 'motif']).optional(),
    imgurl: z.string(),
    imgalt: z.string().optional(),
    pengantar: z.string().min(30).optional(),
    kesimpulan: z.string().min(30).optional(),
    published: z.boolean().default(true),
    faq: z.array(z.object({
      question: z.string().min(10),
      answer: z.string().min(15),
    })).optional().default([]),
  }),
});

export const collections = { blog };
