# Ruta 31 Badges

Repositorio central de **badges dinámicos, inventario de dependencias e indicadores de estado** para todo el ecosistema ERP vertical de **Ruta 31** — especializado en el sector autopartes en Venezuela.

---

## 📌 Propósito y Arquitectura

Este repositorio aloja, genera y expone métricas y estados de calidad, compilación, inventario completo de dependencias por módulo y versiones de despliegue para los 11 repositorios de **Ruta 31** mediante [Shields.io Dynamic Endpoint](https://shields.io/endpoint) y [GitHub Pages](https://remaveca.github.io/ruta-31-badges/):

- **Versiones de Release (`release/`):** Versiones semánticas activas de cada repositorio y microfrontend.
- **Inventario de Dependencias por Repositorio (`ruta-31-*/`):** Badges dinámicos para cada una de las librerías y dependencias utilizadas en cada proyecto.
- **Estado de Build / CI (`build/`):** Resultados en tiempo real de pipelines de GitHub Actions.
- **Cobertura de Pruebas (`coverage/`):** Métricas de tests unitarios e integración (Vitest, JUnit 5).
- **Documentación & ADRs (`docs/`):** Estados de publicación de portales y decisiones de arquitectura.

---

## 🗂️ Estructura de Endpoints

| Directorio | Propósito | Formato URL Endpoint |
| :--- | :--- | :--- |
| `release/` | Versión semántica de cada repo | `https://raw.githubusercontent.com/remaveca/ruta-31-badges/main/release/<repo>.json` |
| `build/` | Estado de pipelines CI | `https://raw.githubusercontent.com/remaveca/ruta-31-badges/main/build/<repo>.json` |
| `coverage/` | Cobertura de tests | `https://raw.githubusercontent.com/remaveca/ruta-31-badges/main/coverage/<repo>.json` |
| `docs/` | Estado documental y ADRs | `https://raw.githubusercontent.com/remaveca/ruta-31-badges/main/docs/<doc>.json` |
| `<repo-name>/` | Dependencias individuales de cada proyecto | `https://raw.githubusercontent.com/remaveca/ruta-31-badges/main/<repo-name>/<dep>.json` |

---

## 🚀 Catálogo de Badges de Release

| Repositorio | Badge Preview | Endpoint JSON |
| :--- | :--- | :--- |
| **ruta-31-api** | ![Ruta 31 API](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/remaveca/ruta-31-badges/main/release/ruta-31-api.json) | [`release/ruta-31-api.json`](release/ruta-31-api.json) |
| **ruta-31-app-shell** | ![Ruta 31 App Shell](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/remaveca/ruta-31-badges/main/release/ruta-31-app-shell.json) | [`release/ruta-31-app-shell.json`](release/ruta-31-app-shell.json) |
| **ruta-31-catalog** | ![Ruta 31 Catalog](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/remaveca/ruta-31-badges/main/release/ruta-31-catalog.json) | [`release/ruta-31-catalog.json`](release/ruta-31-catalog.json) |
| **ruta-31-inventory** | ![Ruta 31 Inventory](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/remaveca/ruta-31-badges/main/release/ruta-31-inventory.json) | [`release/ruta-31-inventory.json`](release/ruta-31-inventory.json) |
| **ruta-31-security** | ![Ruta 31 Security](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/remaveca/ruta-31-badges/main/release/ruta-31-security.json) | [`release/ruta-31-security.json`](release/ruta-31-security.json) |
| **ruta-31-ui-libraries** | ![Ruta 31 UI Libraries](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/remaveca/ruta-31-badges/main/release/ruta-31-ui-libraries.json) | [`release/ruta-31-ui-libraries.json`](release/ruta-31-ui-libraries.json) |
| **ruta-31-ui-starter** | ![Ruta 31 UI Starter](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/remaveca/ruta-31-badges/main/release/ruta-31-ui-starter.json) | [`release/ruta-31-ui-starter.json`](release/ruta-31-ui-starter.json) |
| **ruta-31-mcp-server** | ![Ruta 31 MCP Server](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/remaveca/ruta-31-badges/main/release/ruta-31-mcp-server.json) | [`release/ruta-31-mcp-server.json`](release/ruta-31-mcp-server.json) |
| **ruta-31-docs** | ![Ruta 31 Docs](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/remaveca/ruta-31-badges/main/release/ruta-31-docs.json) | [`release/ruta-31-docs.json`](release/ruta-31-docs.json) |
| **ruta-31-master-plan** | ![Ruta 31 Master Plan](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/remaveca/ruta-31-badges/main/release/ruta-31-master-plan.json) | [`release/ruta-31-master-plan.json`](release/ruta-31-master-plan.json) |
| **ruta-31-badges** | ![Ruta 31 Badges](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/remaveca/ruta-31-badges/main/release/ruta-31-badges.json) | [`release/ruta-31-badges.json`](release/ruta-31-badges.json) |

---

## 📦 Inventario de Dependencias por Módulo del Workspace

Cada repositorio del workspace cuenta con su propio directorio de badges para todas sus dependencias:

| Repositorio | Carpeta de Badges | Total Badges | Ejemplo de Badge |
| :--- | :--- | :---: | :--- |
| **ruta-31-api** | [`ruta-31-api/`](ruta-31-api/) | 12 | ![Spring Boot](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/remaveca/ruta-31-badges/main/ruta-31-api/spring-boot.json) |
| **ruta-31-app-shell** | [`ruta-31-app-shell/`](ruta-31-app-shell/) | 35 | ![Angular Core](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/remaveca/ruta-31-badges/main/ruta-31-app-shell/angular__core.json) |
| **ruta-31-catalog** | [`ruta-31-catalog/`](ruta-31-catalog/) | 38 | ![Native Federation](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/remaveca/ruta-31-badges/main/ruta-31-catalog/angular-architects__native-federation.json) |
| **ruta-31-inventory** | [`ruta-31-inventory/`](ruta-31-inventory/) | 38 | ![Tailwind CSS](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/remaveca/ruta-31-badges/main/ruta-31-inventory/tailwindcss.json) |
| **ruta-31-security** | [`ruta-31-security/`](ruta-31-security/) | 38 | ![NgRx Signals](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/remaveca/ruta-31-badges/main/ruta-31-security/ngrx__signals.json) |
| **ruta-31-ui-libraries** | [`ruta-31-ui-libraries/`](ruta-31-ui-libraries/) | 26 | ![Material](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/remaveca/ruta-31-badges/main/ruta-31-ui-libraries/angular__material.json) |
| **ruta-31-ui-starter** | [`ruta-31-ui-starter/`](ruta-31-ui-starter/) | 38 | ![Vitest](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/remaveca/ruta-31-badges/main/ruta-31-ui-starter/vitest.json) |
| **ruta-31-mcp-server** | [`ruta-31-mcp-server/`](ruta-31-mcp-server/) | 22 | ![MCP SDK](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/remaveca/ruta-31-badges/main/ruta-31-mcp-server/modelcontextprotocol__sdk.json) |
| **ruta-31-docs** | [`ruta-31-docs/`](ruta-31-docs/) | 2 | ![Docs Engine](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/remaveca/ruta-31-badges/main/ruta-31-docs/docs-engine.json) |
| **ruta-31-master-plan** | [`ruta-31-master-plan/`](ruta-31-master-plan/) | 3 | ![31 Modules](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/remaveca/ruta-31-badges/main/ruta-31-master-plan/modules-spec.json) |

---

## 💻 Guía de Uso en Archivos Markdown

Para insertar un badge dinámico en el `README.md` de cualquier repositorio, utilice la siguiente sintaxis:

```markdown
[![Ruta 31 API](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/remaveca/ruta-31-badges/main/release/ruta-31-api.json)](https://github.com/remaveca/ruta-31-api)
[![Spring Boot](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/remaveca/ruta-31-badges/main/ruta-31-api/spring-boot.json)](https://spring.io/projects/spring-boot)
[![Build](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/remaveca/ruta-31-badges/main/build/api.json)](https://github.com/remaveca/ruta-31-api/actions)
```

---

## ⚙️ Automatización y Comandos

- **Recolectar todas las dependencias del workspace:**
  ```bash
  pnpm run collect
  ```
- **Sincronizar versiones y dependencias completas:**
  ```bash
  pnpm run sync
  ```
- **Validar formato de todos los badges:**
  ```bash
  pnpm run validate
  ```
