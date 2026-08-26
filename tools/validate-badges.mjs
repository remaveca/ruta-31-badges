#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const rootDir = process.cwd();
const ignoredDirs = new Set(['.git', '.github', 'node_modules', 'tools', 'tmp', 'scratch']);
const badgeFolders = fs
  .readdirSync(rootDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && !ignoredDirs.has(entry.name))
  .map((entry) => entry.name);

let totalBadges = 0;
let errors = 0;

console.log('🔍 Validating Ruta 31 Shields.io Badges across all directories...\n');

for (const folder of badgeFolders) {
  const folderPath = path.join(rootDir, folder);
  if (!fs.existsSync(folderPath)) {
    console.warn(`⚠️ Warning: Directory '${folder}' does not exist.`);
    continue;
  }

  const files = fs.readdirSync(folderPath).filter((f) => f.endsWith('.json'));
  console.log(`📁 Checking [${folder}/] (${files.length} badges)...`);

  for (const file of files) {
    const filePath = path.join(folderPath, file);
    totalBadges++;

    try {
      const content = fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, '');
      const json = JSON.parse(content);

      if (json.schemaVersion !== 1) {
        console.error(`❌ [${folder}/${file}]: 'schemaVersion' must be 1, found '${json.schemaVersion}'`);
        errors++;
      }

      if (typeof json.label !== 'string' || json.label.trim() === '') {
        console.error(`❌ [${folder}/${file}]: 'label' must be a non-empty string`);
        errors++;
      }

      if (typeof json.message !== 'string' || json.message.trim() === '') {
        console.error(`❌ [${folder}/${file}]: 'message' must be a non-empty string`);
        errors++;
      }

      if (typeof json.color !== 'string' || json.color.trim() === '') {
        console.error(`❌ [${folder}/${file}]: 'color' must be a non-empty string`);
        errors++;
      }
    } catch (err) {
      console.error(`❌ [${folder}/${file}]: Invalid JSON syntax - ${err.message}`);
      errors++;
    }
  }
}

console.log('\n----------------------------------------');
if (errors === 0) {
  console.log(`✅ Success! All ${totalBadges} badges passed validation.`);
  process.exit(0);
} else {
  console.error(`❌ Failed: Found ${errors} error(s) across ${totalBadges} badges.`);
  process.exit(1);
}
