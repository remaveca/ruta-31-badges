# Sincronización de Versiones Semánticas y Estandarización PostgreSQL 17

- **Fecha:** 2026-09-06
- **Alcance:** Repositorio `ruta-31-badges` y dependencias del ecosistema Ruta 31

---

## 1. Contexto y Objetivos

Durante una auditoría transversal del ecosistema se detectaron desfasajes en los endpoints de badges de versión respecto al estado actual del workspace, así como una discrepancia en la versión de PostgreSQL recolectada para el backend `ruta-31-api`.

## 2. Correcciones Realizadas

1. **Estandarización PostgreSQL 17 LTS:**
   - En `tools/collect-workspace-badges.mjs`, se corrigió la recolección de PostgreSQL cambiando el valor cableado de `'18'` a `'17'`.
   - Se actualizó el endpoint dinámico `ruta-31-api/postgresql.json` para publicar fielmente PostgreSQL 17 LTS en cumplimiento estricto con la decisión arquitectónica ADR 0001 y la incidencia documentada en `2026-08-26_incidencia-arquitectura-postgresql-17.md`.

2. **Sincronización de Versiones de Release:**
   - Se actualizaron los badges en `release/`:
     - `ruta-31-api.json`: sincronizado a `0.9.2` (conforme a `pom.xml`).
     - `ruta-31-app-shell.json`: sincronizado a `0.15.0` (conforme a `package.json`).
     - `ruta-31-security.json`: sincronizado a `0.9.0` (conforme a `package.json`).

## 3. Impacto y Verificación

- Todos los endpoints de badges JSON son 100% compatibles con la especificación de Shields.io (`schemaVersion: 1`).
- La documentación y los portales que consumen estos badges reflejan ahora las versiones y dependencias operativas del workspace.
