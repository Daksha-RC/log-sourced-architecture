#!/usr/bin/env node
/**
 * promote.mjs — Promotes current docs to a frozen versioned snapshot.
 * Usage: npm run promote -- --version=X.Y.Z
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// ============================================================
// Helpers
// ============================================================

function parseArgs(argv) {
  const versionArg = argv.find(arg => arg.startsWith('--version='));
  if (!versionArg) {
    console.error('Usage: npm run promote -- --version=X.Y.Z');
    process.exit(1);
  }
  const version = versionArg.split('=')[1];
  if (!/^\d+\.\d+\.\d+$/.test(version)) {
    console.error(`Invalid version format: "${version}". Expected: X.Y.Z (e.g., 0.2.0)`);
    process.exit(1);
  }
  return { version };
}

function toFolderName(version) {
  return `v${version.replace(/\./g, '-')}`;
}

function copyDirFiltered(srcDir, destDir, fileList) {
  fs.mkdirSync(destDir, { recursive: true });
  const entries = fs.readdirSync(srcDir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory()) {
      copyDirFiltered(path.join(srcDir, entry.name), path.join(destDir, entry.name), fileList);
    } else if (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) {
      fs.copyFileSync(path.join(srcDir, entry.name), path.join(destDir, entry.name));
      fileList.push(entry.name);
    }
  }
}

function cloneDocs(docsDir, targetDir) {
  fs.mkdirSync(targetDir, { recursive: true });

  const rootFiles = [];
  const conceptFiles = [];
  const exampleFiles = [];

  // Clone root-level .md/.mdx files (excluding index.mdx and version folders)
  const rootEntries = fs.readdirSync(docsDir, { withFileTypes: true });
  for (const entry of rootEntries) {
    if (entry.isDirectory()) continue;
    if (entry.name === 'index.mdx') continue;
    if (entry.name === '.DS_Store') continue;
    if (!entry.name.endsWith('.md') && !entry.name.endsWith('.mdx')) continue;

    fs.copyFileSync(path.join(docsDir, entry.name), path.join(targetDir, entry.name));
    rootFiles.push(entry.name);
  }

  // Clone concepts/
  const conceptsDir = path.join(docsDir, 'concepts');
  if (fs.existsSync(conceptsDir)) {
    copyDirFiltered(conceptsDir, path.join(targetDir, 'concepts'), conceptFiles);
  }

  // Clone examples/
  const examplesDir = path.join(docsDir, 'examples');
  if (fs.existsSync(examplesDir)) {
    copyDirFiltered(examplesDir, path.join(targetDir, 'examples'), exampleFiles);
  }

  return { rootFiles, conceptFiles, exampleFiles };
}

function generateIndexPage(version, folderName, files) {
  const lines = [
    '---',
    `title: DeQL v${version}`,
    `description: DeQL language specification version ${version}`,
    '---',
    '',
    `# DeQL v${version}`,
    '',
    `This is the archived documentation for DeQL version **${version}**.`,
    '',
    'For the latest documentation, see the [current version](/).',
    '',
    '## Contents',
    '',
  ];

  // Root files
  for (const f of files.rootFiles) {
    const slug = f.replace(/\.mdx?$/, '');
    const label = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    lines.push(`- [${label}](/${folderName}/${slug}/)`);
  }

  // Concepts
  if (files.conceptFiles.length > 0) {
    lines.push('', '### Language Reference', '');
    for (const f of files.conceptFiles) {
      const slug = f.replace(/\.mdx?$/, '');
      const label = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      lines.push(`- [${label}](/${folderName}/concepts/${slug}/)`);
    }
  }

  // Examples
  if (files.exampleFiles.length > 0) {
    lines.push('', '### Examples', '');
    for (const f of files.exampleFiles) {
      const slug = f.replace(/\.mdx?$/, '');
      const label = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      lines.push(`- [${label}](/${folderName}/examples/${slug}/)`);
    }
  }

  lines.push('');
  return lines.join('\n');
}

function findMdxFiles(dir) {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findMdxFiles(fullPath));
    } else if (entry.name.endsWith('.mdx')) {
      results.push(fullPath);
    }
  }
  return results;
}

function findAllContentFiles(dir) {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findAllContentFiles(fullPath));
    } else if (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) {
      results.push(fullPath);
    }
  }
  return results;
}

function injectVersionBanner(targetDir, version, folderName) {
  const files = findAllContentFiles(targetDir);
  const bannerLine = `banner:\n  content: "You are viewing docs for v${version}. <a href='/'>Switch to latest</a>"`;

  for (const filePath of files) {
    const content = fs.readFileSync(filePath, 'utf-8');
    // Insert banner after the opening frontmatter delimiter
    const fixed = content.replace(/^---\n/, `---\n${bannerLine}\n`);
    if (fixed !== content) {
      fs.writeFileSync(filePath, fixed, 'utf-8');
    }
  }
}

function fixImportPaths(filePath, additionalDepth) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const prefix = '../'.repeat(additionalDepth);

  // Match: import X from '../...' (relative imports starting with ../)
  const importRegex = /(import\s+.+\s+from\s+['"])(\.\.\/)/g;

  const fixed = content.replace(importRegex, `$1${prefix}$2`);

  if (fixed !== content) {
    fs.writeFileSync(filePath, fixed, 'utf-8');
    return true;
  }
  return false;
}

function updateSidebar(configPath, version, folderName) {
  let content = fs.readFileSync(configPath, 'utf-8');

  const versionEntry = `\t\t\t\t\t\t{ label: 'v${version}', link: '/${folderName}/' },\n`;

  // Find the Versions items array and insert new entry at the top
  const versionsItemsRegex = /(label:\s*'Versions',\s*\n\s*items:\s*\[\s*\n)/;

  if (versionsItemsRegex.test(content)) {
    content = content.replace(versionsItemsRegex, `$1${versionEntry}`);
    fs.writeFileSync(configPath, content, 'utf-8');
    return true;
  } else {
    console.warn('  Warning: Could not find Versions section in astro.config.mjs. Manual update needed.');
    return false;
  }
}

function updateNavDropdown(navPath, version, folderName) {
  // No-op: dropdown is now dynamic, reads from versions.json generated at build time
  return true;
}

function printSummary(version, folderName, files, fixCount, sidebarUpdated, navUpdated) {
  console.log(`  Created: site/src/content/docs/${folderName}/`);
  console.log(`  Copied:  ${files.rootFiles.join(', ')}`);
  console.log(`  Copied:  concepts/ (${files.conceptFiles.length} files)`);
  console.log(`  Copied:  examples/ (${files.exampleFiles.length} files)`);
  console.log(`  Created: ${folderName}/index.md`);
  console.log(`  Fixed:   ${fixCount} .mdx import path(s)`);
  if (sidebarUpdated) console.log('  Updated: astro.config.mjs (sidebar)');
  if (navUpdated) console.log('  Updated: docs-nav.js (version dropdown)');
  console.log('');
  console.log(`Done. Version v${version} frozen at /${folderName}/`);
  console.log('Build with: cd site && npm run build');
}

// ============================================================
// Main
// ============================================================

async function main() {
  // Step 1: Parse and validate arguments
  const { version } = parseArgs(process.argv.slice(2));
  const folderName = toFolderName(version);

  // Step 2: Resolve paths
  const scriptDir = path.dirname(fileURLToPath(import.meta.url));
  const siteDir = path.resolve(scriptDir, '..');
  const docsDir = path.join(siteDir, 'src', 'content', 'docs');
  const targetDir = path.join(docsDir, folderName);
  const configPath = path.join(siteDir, 'astro.config.mjs');
  const navPath = path.join(siteDir, 'public', 'docs-nav.js');

  // Step 3: Guard — fail if version already exists
  if (fs.existsSync(targetDir)) {
    console.error(`Error: Version folder "${folderName}" already exists. Cannot overwrite frozen versions.`);
    process.exit(1);
  }

  console.log(`Promoting current docs to v${version}...`);

  // Step 4: Clone docs
  const cloneResult = cloneDocs(docsDir, targetDir);

  // Step 5: Generate index page
  const indexContent = generateIndexPage(version, folderName, cloneResult);
  fs.writeFileSync(path.join(targetDir, 'index.md'), indexContent);

  // Step 5.5: Inject version banner into all cloned pages
  injectVersionBanner(targetDir, version, folderName);

  // Step 6: Fix .mdx import paths
  const mdxFiles = findMdxFiles(targetDir);
  let fixCount = 0;
  for (const mdxFile of mdxFiles) {
    if (fixImportPaths(mdxFile, 1)) fixCount++;
  }

  // Step 7: Update astro.config.mjs sidebar
  const sidebarUpdated = updateSidebar(configPath, version, folderName);

  // Step 8: Update docs-nav.js dropdown
  const navUpdated = updateNavDropdown(navPath, version, folderName);

  // Step 9: Print summary
  printSummary(version, folderName, cloneResult, fixCount, sidebarUpdated, navUpdated);

  process.exit(0);
}

main();
