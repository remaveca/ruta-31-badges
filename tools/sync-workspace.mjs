#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const rootDir = process.cwd();
const parentDir = path.resolve(rootDir, '..');
const releaseDir = path.join(rootDir, 'release');

if (!fs.existsSync(releaseDir)) {
  fs.mkdirSync(releaseDir, { recursive: true });
}

console.log('🔄 Synchronizing repository release versions in workspace...\n');

const repoMappings = [
  { dir: 'ruta-31-api', badge: 'ruta-31-api.json', label: 'Ruta 31 API', color: '101e89', type: 'maven' },
  { dir: 'ruta-31-app-shell', badge: 'ruta-31-app-shell.json', label: 'Ruta 31 App Shell', color: '101e89', type: 'node' },
  { dir: 'ruta-31-catalog', badge: 'ruta-31-catalog.json', label: 'Ruta 31 Catalog', color: '101e89', type: 'node' },
  { dir: 'ruta-31-inventory', badge: 'ruta-31-inventory.json', label: 'Ruta 31 Inventory', color: '101e89', type: 'node' },
  { dir: 'ruta-31-security', badge: 'ruta-31-security.json', label: 'Ruta 31 Security', color: '101e89', type: 'node' },
  { dir: 'ruta-31-ui-libraries', badge: 'ruta-31-ui-libraries.json', label: 'Ruta 31 UI Libraries', color: '101e89', type: 'node' },
  { dir: 'ruta-31-ui-starter', badge: 'ruta-31-ui-starter.json', label: 'Ruta 31 UI Starter', color: '101e89', type: 'node' },
  { dir: 'ruta-31-mcp-server', badge: 'ruta-31-mcp-server.json', label: 'Ruta 31 MCP Server', color: '101e89', type: 'node' },
  { dir: 'ruta-31-docs', badge: 'ruta-31-docs.json', label: 'Ruta 31 Docs', color: '101e89', type: 'docs', defaultVersion: '0.1.0' },
  { dir: 'ruta-31-master-plan', badge: 'ruta-31-master-plan.json', label: 'Ruta 31 Master Plan', color: '101e89', type: 'docs', defaultVersion: '1.0.0' },
  { dir: 'ruta-31-badges', badge: 'ruta-31-badges.json', label: 'Ruta 31 Badges', color: '101e89', type: 'node' }
];

let updatedCount = 0;

for (const mapping of repoMappings) {
  const repoPath = path.join(parentDir, mapping.dir);
  let version = mapping.defaultVersion || '0.1.0';

  if (fs.existsSync(repoPath)) {
    if (mapping.type === 'node') {
      const pkgPath = path.join(repoPath, 'package.json');
      if (fs.existsSync(pkgPath)) {
        try {
          const raw = fs.readFileSync(pkgPath, 'utf8').replace(/^\uFEFF/, '');
          const pkg = JSON.parse(raw);
          if (pkg.version) version = pkg.version;
        } catch (e) {
          console.warn(`⚠️ Could not parse ${pkgPath}: ${e.message}`);
        }
      }
    } else if (mapping.type === 'maven') {
      const pomPath = path.join(repoPath, 'pom.xml');
      if (fs.existsSync(pomPath)) {
        try {
          const pom = fs.readFileSync(pomPath, 'utf8');
          const match = pom.match(/<artifactId>ruta-31-api<\/artifactId>\s*<version>([^<]+)<\/version>/);
          if (match && match[1]) {
            version = match[1];
          }
        } catch (e) {
          console.warn(`⚠️ Could not parse ${pomPath}: ${e.message}`);
        }
      }
    }
  }

  const badgePath = path.join(releaseDir, mapping.badge);
  const badgePayload = {
    schemaVersion: 1,
    label: mapping.label,
    message: version,
    color: mapping.color
  };

  fs.writeFileSync(badgePath, JSON.stringify(badgePayload, null, 2) + '\n', 'utf8');
  console.log(`🏷️ Synced [release/${mapping.badge}]: ${mapping.label} = v${version}`);
  updatedCount++;
}

console.log(`\n✨ Successfully synced ${updatedCount} release badges.`);

console.log('\n----------------------------------------\n');
import('./collect-workspace-badges.mjs');

