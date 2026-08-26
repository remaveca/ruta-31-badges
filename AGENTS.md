# AGENTS.md — Ruta 31 Badges

## Rol y Alcance del Repositorio

Este repositorio almacena, versiona y publica los endpoints JSON/SVG para badges dinámicos del ecosistema **Ruta 31** — ERP vertical para el sector automotriz en Venezuela.

### Estructura de Endpoints
- `release/`: Versiones semánticas actuales de cada repositorio del ecosistema Ruta 31.
- `build/`: Estado de compilación y ejecución de pipelines CI/CD.
- `coverage/`: Métricas de cobertura de pruebas unitarias e integración.
- `docs/`: Estado de publicación de portales de documentación y especificaciones.
- `<repo-name>/`: Endpoints dinámicos de dependencias y librerías por repositorio (`ruta-31-api/`, `ruta-31-app-shell/`, `ruta-31-catalog/`, `ruta-31-inventory/`, `ruta-31-security/`, etc.).

---

## Directrices de Desarrollo y Automatización
- **Formato Estándar:** Endpoints en formato JSON compatible con Shields.io (`schemaVersion: 1`, `label`, `message`, `color`).
- **Validación Automatizada:** Ejecutar `node tools/validate-badges.mjs` (o `pnpm run validate`) antes de cualquier commit.
- **Sincronización:** Ejecutar `node tools/sync-workspace.mjs` (o `pnpm run sync`) para sincronizar las versiones y dependencias de los repositorios en el workspace.
- **Recolección de Dependencias:** Ejecutar `node tools/collect-workspace-badges.mjs` (o `pnpm run collect`).
- **Commits:** Seguir **Conventional Commits** (`feat:`, `fix:`, `chore:`, `docs:`).
- **Seguridad:** Nunca commitear tokens de acceso ni URLs internas privadas.
