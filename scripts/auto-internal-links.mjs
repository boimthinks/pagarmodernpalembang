#!/usr/bin/env node

/**
 * Script Mekanisme Auto Internal Linking untuk Artikel dan Katalog Motif
 *
 * Aturan:
 * 1. Menemukan kata kunci produk (pagar, pintu, balkon, railing, kanopi, partisi) dan homepage (/).
 * 2. Hanya kata PERTAMA yang ditemukan yang diberi link (first occurrence only) per target URL.
 * 3. JANGAN menginjeksi link ke dalam HEADING (H1, H2, H3, dst).
 * 4. JANGAN menginjeksi link di dalam link yang sudah ada, gambar, kode inline, atau tag HTML.
 * 5. Minimal 2 internal link di setiap artikel dan motif (1 ke homepage, 1 ke produk relevan, plus produk lain jika dibahas).
 */

import fs from 'fs';
import path from 'path';
import { INTERNAL_LINK_TARGETS } from '../src/data/internal-link-keywords.mjs';

const BLOG_DIR = path.resolve('src/content/blog');

// Siapkan entri yang diurutkan dari keyword terpanjang ke terpendek
function prepareKeywordEntries() {
  const entries = [];
  for (const item of INTERNAL_LINK_TARGETS) {
    const allKws = [...item.primaryKeywords, ...item.similarKeywords];
    for (const kw of allKws) {
      const escaped = kw.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      // Word boundary regex
      const regex = new RegExp(`\\b(${escaped})\\b`, 'i');
      entries.push({
        keyword: kw,
        targetUrl: item.targetUrl,
        name: item.name,
        category: item.category,
        regex,
      });
    }
  }
  // Sort descending by keyword length
  entries.sort((a, b) => b.keyword.length - a.keyword.length);
  return entries;
}

const ALL_ENTRIES = prepareKeywordEntries();

/**
 * Tokenize baris teks biasa agar link lama, inline code, dan tag HTML tidak tersentuh.
 */
function tokenizeLine(line) {
  const tokens = [];
  let remaining = line;
  const specialRegex = /(!?\[[^\]]+\]\([^)]+\)|`[^`]+`|<[^>]+>)/;

  while (remaining.length > 0) {
    const match = specialRegex.exec(remaining);
    if (!match) {
      tokens.push({ type: 'text', value: remaining });
      break;
    }
    const index = match.index;
    if (index > 0) {
      tokens.push({ type: 'text', value: remaining.slice(0, index) });
    }
    tokens.push({ type: 'protected', value: match[0] });
    remaining = remaining.slice(index + match[0].length);
  }
  return tokens;
}

/**
 * Memproses file markdown individual
 */
export function processMarkdownFile(filePath, dryRun = false) {
  const content = fs.readFileSync(filePath, 'utf8');

  // Pisahkan frontmatter dan body
  const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!fmMatch) {
    return { file: path.basename(filePath), changed: false, linksInjected: [] };
  }

  const frontmatter = fmMatch[1];
  const body = fmMatch[2];

  // Kumpulkan target URL yang sudah ada di dokumen (manual link)
  const usedTargets = new Set();
  const existingLinks = [...body.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)];
  for (const match of existingLinks) {
    let url = match[2].split('#')[0].split('?')[0];
    if (url.startsWith('/') && !url.endsWith('/') && !url.includes('.')) {
      url += '/';
    }
    usedTargets.add(url);
  }

  const lines = body.split('\n');
  const newLines = [];
  const injectedLinks = [];
  let inCodeBlock = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Deteksi toggle code block
    if (trimmed.startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      newLines.push(line);
      continue;
    }

    // Lewatkan code block
    if (inCodeBlock) {
      newLines.push(line);
      continue;
    }

    // ATURAN KRUSIAL: JANGAN INJEK LINK KE HEADING
    if (trimmed.startsWith('#') || /^<h[1-6]/i.test(trimmed)) {
      newLines.push(line);
      continue;
    }

    // Lewatkan tag gambar atau komponen multi-baris murni
    if (trimmed.startsWith('<img') || trimmed.startsWith('<CtaWhatsapp') || trimmed.startsWith('<TableOfContents')) {
      newLines.push(line);
      continue;
    }

    // Tokenize baris teks biasa
    const tokens = tokenizeLine(line);
    const newTokens = [];

    for (const token of tokens) {
      if (token.type === 'protected') {
        newTokens.push(token.value);
        continue;
      }

      // Proses token teks biasa
      let textSegment = token.value;

      function replaceFirstKeywords(text) {
        if (!text) return '';

        let bestMatch = null;
        let bestEntry = null;

        // Cari kecocokan paling awal di dalam teks dari seluruh keyword
        for (const entry of ALL_ENTRIES) {
          if (usedTargets.has(entry.targetUrl)) continue;

          const match = entry.regex.exec(text);
          if (match) {
            if (!bestMatch || match.index < bestMatch.index) {
              bestMatch = match;
              bestEntry = entry;
            }
          }
        }

        if (!bestMatch || !bestEntry) {
          return text;
        }

        // Tandai target URL agar hanya kata pertama yang diberi link
        usedTargets.add(bestEntry.targetUrl);
        injectedLinks.push({
          targetUrl: bestEntry.targetUrl,
          keyword: bestMatch[0],
          name: bestEntry.name,
        });

        const before = text.slice(0, bestMatch.index);
        const matched = bestMatch[0];
        const after = text.slice(bestMatch.index + matched.length);

        return (
          replaceFirstKeywords(before) +
          `[${matched}](${bestEntry.targetUrl})` +
          replaceFirstKeywords(after)
        );
      }

      newTokens.push(replaceFirstKeywords(textSegment));
    }

    newLines.push(newTokens.join(''));
  }

  const newBody = newLines.join('\n');
  const hasChanged = newBody !== body;

  if (hasChanged && !dryRun) {
    const updatedContent = `---\n${frontmatter}\n---\n${newBody}`;
    fs.writeFileSync(filePath, updatedContent, 'utf8');
  }

  return {
    file: path.basename(filePath),
    changed: hasChanged,
    injectedLinks,
    totalExisting: existingLinks.length,
    finalTargets: Array.from(usedTargets),
  };
}

/**
 * Jalankan proses untuk seluruh artikel dan katalog motif
 */
export function runAutoInternalLinks(dryRun = false) {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.md'));
  console.log(`\n======================================================`);
  console.log(`🔍 Menjalankan Mekanisme Auto Internal Linking (${files.length} dokumen)`);
  console.log(`======================================================\n`);

  let totalInjected = 0;
  let totalModifiedFiles = 0;

  for (const file of files) {
    const filePath = path.join(BLOG_DIR, file);
    const result = processMarkdownFile(filePath, dryRun);

    if (result.changed) {
      totalModifiedFiles++;
      totalInjected += result.injectedLinks.length;
      console.log(`✓ [MODIFIED] ${result.file}:`);
      result.injectedLinks.forEach((l) => {
        console.log(`   ➔ ${l.targetUrl.padEnd(22)}: "${l.keyword}" (${l.name})`);
      });
      console.log(`   Total link aktif: ${result.finalTargets.length} link (${result.finalTargets.join(', ')})\n`);
    } else {
      console.log(`• [SKIP / SUDAH LENGKAP] ${result.file} (Total link aktif: ${result.finalTargets.length})`);
    }
  }

  console.log(`\n======================================================`);
  console.log(`Selesai: ${totalModifiedFiles} dokumen diperbarui, ${totalInjected} link otomatis ditambahkan.`);
  console.log(`======================================================\n`);
}

// Eksekusi jika dijalankan langsung via CLI
if (process.argv[1] && process.argv[1].endsWith('auto-internal-links.mjs')) {
  const isDry = process.argv.includes('--dry-run');
  runAutoInternalLinks(isDry);
}
