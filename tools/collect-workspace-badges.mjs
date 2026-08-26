#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const rootDir = process.cwd();
const parentDir = path.resolve(rootDir, '..');

const colorsPath = path.join(rootDir, '.badge-colors.json');
const summaryPath = path.join(rootDir, 'badge-summary.json');

const knownColors = {
  angular: 'e10079',
  '@angular/core': 'e10079',
  '@angular/common': 'e10079',
  '@angular/compiler': 'e10079',
  '@angular/platform-browser': 'e10079',
  '@angular/platform-browser-dynamic': 'e10079',
  '@angular/router': 'e10079',
  '@angular/forms': 'e10079',
  '@angular/cdk': '034184',
  '@angular/material': '034184',
  '@angular-architects/native-federation': '6366f1',
  '@angular-architects/module-federation-plugin': '6366f1',
  '@ngrx/signals': 'ba68c8',
  tailwindcss: '00bcff',
  '@tailwindcss/postcss': '00bcff',
  typescript: '3178c6',
  'typescript-eslint': '3178c6',
  '@typescript-eslint/eslint-plugin': '3178c6',
  '@typescript-eslint/parser': '3178c6',
  'spring-boot': '6db33f',
  'spring-modulith': '6db33f',
  'spring-security': '6db33f',
  java: 'f14d38',
  postgresql: '336791',
  node: '59a846',
  pnpm: 'f69220',
  maven: 'c71a36',
  vitest: '729b1b',
  '@analogjs/vitest-angular': '729b1b',
  prettier: 'f8bc45',
  eslint: '4b32c3',
  'eslint-config-prettier': '101828',
  'eslint-plugin-prettier': '101828',
  husky: '98ff99',
  commitlint: 'a8b1ff',
  '@commitlint/cli': 'a8b1ff',
  '@commitlint/config-conventional': 'a8b1ff',
  rxjs: 'e10098',
  zonejs: '494949',
  'zone.js': '494949',
  esbuild: 'ffcf00',
  jspecify: '00599c',
  jjwt: '000000',
  'springdoc-openapi': '85ea2d',
  flyway: 'cc0000',
  archunit: 'f25f4c',
  'semantic-release': '494949',
  '@modelcontextprotocol/sdk': '4f46e5',
  zod: '3068b7'
};

const loadedColors = fs.existsSync(colorsPath)
  ? JSON.parse(fs.readFileSync(colorsPath, 'utf8').replace(/^\uFEFF/, ''))
  : {};

const colors = { ...knownColors, ...loadedColors };

function getConsistentColor(name) {
  if (colors[name]) {
    return colors[name];
  }
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = Math.abs(hash % 16777215).toString(16).padStart(6, '0');
  colors[name] = color;
  return color;
}

function sanitizeBadgeName(name) {
  return name.replace(/\//g, '__').replace(/@/g, '');
}

function cleanVersion(version) {
  if (!version) return 'unknown';
  return version.replace(/^[\^~>=<]+/, '').trim();
}

const workspaceRepos = [
  { name: 'ruta-31-api', type: 'maven' },
  { name: 'ruta-31-app-shell', type: 'node' },
  { name: 'ruta-31-catalog', type: 'node' },
  { name: 'ruta-31-inventory', type: 'node' },
  { name: 'ruta-31-security', type: 'node' },
  { name: 'ruta-31-ui-libraries', type: 'node-monorepo' },
  { name: 'ruta-31-ui-starter', type: 'node' },
  { name: 'ruta-31-mcp-server', type: 'node' },
  { name: 'ruta-31-docs', type: 'docs' },
  { name: 'ruta-31-master-plan', type: 'docs' },
  { name: 'ruta-31-badges', type: 'node' }
];

console.log('📦 Collecting and generating dependency badges across all workspace repositories...\n');

const summary = {};
let totalDependenciesProcessed = 0;

for (const repo of workspaceRepos) {
  const repoPath = path.join(parentDir, repo.name);
  const repoBadgeDir = path.join(rootDir, repo.name);
  if (!fs.existsSync(repoBadgeDir)) {
    fs.mkdirSync(repoBadgeDir, { recursive: true });
  }

  const collectedDeps = {};

  if (repo.type === 'node' || repo.type === 'node-monorepo') {
    const pkgPath = path.join(repoPath, 'package.json');
    if (fs.existsSync(pkgPath)) {
      try {
        const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8').replace(/^\uFEFF/, ''));
        const allDeps = {
          ...pkg.dependencies,
          ...pkg.devDependencies,
          ...pkg.peerDependencies
        };
        for (const [depName, ver] of Object.entries(allDeps)) {
          if (ver) {
            collectedDeps[depName] = cleanVersion(ver);
          }
        }
      } catch (err) {
        console.warn(`⚠️ Error reading ${pkgPath}: ${err.message}`);
      }
    }

    if (repo.type === 'node-monorepo') {
      const projectsPath = path.join(repoPath, 'projects');
      if (fs.existsSync(projectsPath)) {
        const subProjects = fs.readdirSync(projectsPath, { withFileTypes: true });
        for (const sub of subProjects) {
          if (sub.isDirectory()) {
            const subPkgPath = path.join(projectsPath, sub.name, 'package.json');
            if (fs.existsSync(subPkgPath)) {
              try {
                const subPkg = JSON.parse(fs.readFileSync(subPkgPath, 'utf8').replace(/^\uFEFF/, ''));
                const allSubDeps = {
                  ...subPkg.dependencies,
                  ...subPkg.devDependencies,
                  ...subPkg.peerDependencies
                };
                for (const [depName, ver] of Object.entries(allSubDeps)) {
                  if (ver && !collectedDeps[depName]) {
                    collectedDeps[depName] = cleanVersion(ver);
                  }
                }
              } catch (e) {
                // ignore
              }
            }
          }
        }
      }
    }
  } else if (repo.type === 'maven') {
    const pomPath = path.join(repoPath, 'pom.xml');
    if (fs.existsSync(pomPath)) {
      try {
        const pom = fs.readFileSync(pomPath, 'utf8');

        // Extract properties
        const properties = {};
        const propMatches = pom.matchAll(/<([^>]+)>([^<]+)<\/\1>/g);
        for (const match of propMatches) {
          properties[match[1]] = match[2];
        }

        // Spring Boot Parent
        const parentMatch = pom.match(/<artifactId>spring-boot-starter-parent<\/artifactId>\s*<version>([^<]+)<\/version>/);
        if (parentMatch) {
          collectedDeps['spring-boot'] = parentMatch[1];
        }

        if (properties['java.version']) {
          collectedDeps['java'] = `${properties['java.version']} (LTS)`;
        }
        if (properties['spring-modulith.version']) {
          collectedDeps['spring-modulith'] = properties['spring-modulith.version'];
        }
        if (properties['jspecify.version']) {
          collectedDeps['jspecify'] = properties['jspecify.version'];
        }
        if (properties['jjwt.version']) {
          collectedDeps['jjwt'] = properties['jjwt.version'];
        }
        if (properties['springdoc.version']) {
          collectedDeps['springdoc-openapi'] = properties['springdoc.version'];
        }

        // Search explicit dependencies
        const depRegex = /<dependency>[\s\S]*?<groupId>([^<]+)<\/groupId>[\s\S]*?<artifactId>([^<]+)<\/artifactId>(?:[\s\S]*?<version>([^<]+)<\/version>)?[\s\S]*?<\/dependency>/g;
        for (const match of pom.matchAll(depRegex)) {
          const groupId = match[1].trim();
          const artifactId = match[2].trim();
          let ver = match[3] ? match[3].trim() : '';

          if (ver.startsWith('${') && ver.endsWith('}')) {
            const propKey = ver.slice(2, -1);
            ver = properties[propKey] || ver;
          }

          if (artifactId === 'postgresql') {
            collectedDeps['postgresql'] = '18';
          } else if (artifactId.startsWith('flyway')) {
            collectedDeps['flyway'] = '10.x';
          } else if (artifactId.startsWith('spring-modulith')) {
            collectedDeps[artifactId] = properties['spring-modulith.version'] || '1.3.x';
          } else if (ver) {
            collectedDeps[artifactId] = ver;
          }
        }
      } catch (err) {
        console.warn(`⚠️ Error reading ${pomPath}: ${err.message}`);
      }
    }
  } else if (repo.type === 'docs') {
    if (repo.name === 'ruta-31-master-plan') {
      collectedDeps['modules-spec'] = '31 Modules';
      collectedDeps['strategic-phases'] = '6 Phases';
      collectedDeps['adr-records'] = '6 Accepted';
    } else {
      collectedDeps['docs-engine'] = 'Markdown';
      collectedDeps['target-platform'] = 'Kubernetes';
    }
  }

  const repoSummary = {
    added: [],
    updated: [],
    total: Object.keys(collectedDeps).length
  };

  // Write badge files for this repository
  for (const [depName, version] of Object.entries(collectedDeps)) {
    const filename = `${sanitizeBadgeName(depName)}.json`;
    const filePath = path.join(repoBadgeDir, filename);
    const color = getConsistentColor(depName);

    const badgePayload = {
      schemaVersion: 1,
      label: depName,
      message: version,
      color: color
    };

    const isNew = !fs.existsSync(filePath);
    fs.writeFileSync(filePath, JSON.stringify(badgePayload, null, 2) + '\n', 'utf8');

    if (isNew) {
      repoSummary.added.push(depName);
    } else {
      repoSummary.updated.push(depName);
    }
    totalDependenciesProcessed++;
  }

  summary[repo.name] = {
    ...repoSummary,
    timestamp: new Date().toISOString()
  };

  console.log(`✅ [${repo.name}]: Generated ${Object.keys(collectedDeps).length} dependency badges in [${repo.name}/]`);
}

fs.writeFileSync(colorsPath, JSON.stringify(colors, null, 2) + '\n', 'utf8');
fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2) + '\n', 'utf8');

console.log(`\n🎉 Completed collection! Processed ${totalDependenciesProcessed} total dependency badges.`);
