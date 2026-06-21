#!/usr/bin/env node
/**
 * gen-versions.mjs — Reads the Versions sidebar section from astro.config.mjs
 * and generates public/versions.json for the client-side dropdown.
 *
 * Run automatically via prebuild/predev hooks.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const siteDir = path.resolve(scriptDir, '..');
const configPath = path.join(siteDir, 'astro.config.mjs');
const outputPath = path.join(siteDir, 'public', 'versions.json');

const content = fs.readFileSync(configPath, 'utf-8');

// Extract all version entries: { label: 'vX.Y.Z', link: '/vX-Y-Z/' }
const versionRegex = /label:\s*'(v[\d.]+)',\s*link:\s*'\/(v[\d-]+)\/'/g;
const versions = [];
let match;

while ((match = versionRegex.exec(content)) !== null) {
  versions.push({ label: match[1], value: match[2] });
}

const output = { versions };
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
console.log(`Generated versions.json with ${versions.length} version(s): ${versions.map(v => v.label).join(', ') || '(none)'}`);
