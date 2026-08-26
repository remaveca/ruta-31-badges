# Incidencia y Sincronización Arquitectónica: PostgreSQL 17 y Providencia 102

- **Fecha:** 2026-08-26
- **Alcance:** Repositorios del ecosistema Ruta 31

## Contexto del Incidente

Durante el inicio de la construcción de contenedores y desarrollo de los módulos 01 al 04, se detectaron errores de ejecución en la infraestructura local asociados al motor transaccional. La arquitectura y documentación originales establecían el uso de **PostgreSQL 18** y el cumplimiento de la **Providencia 121 SENIAT** (Homologación). 

Sin embargo:
1. **PostgreSQL 18** se encuentra en fase activa de desarrollo (*upstream/nightly*). Carece de empaquetamiento estable en distribuciones Linux (Alpine/Debian) y soporte para extensiones críticas exigidas por el sistema (pgaudit para forense fiscal y pg_jsonschema).
2. La **Providencia 121 (Homologación)** fue derogada por las autoridades tributarias y reemplazada formalmente por la **Providencia 102 (Facturación Electrónica)**.

## Resolución Aplicada

Con base en la auditoría del Plan Maestro y las nuevas Decisiones Arquitectónicas (ADR 0007 y ADR 0010):

1. **Downgrade Controlado a PostgreSQL 17**: 
   - Se estableció PostgreSQL 17 LTS como el motor oficial para todo el sistema, asegurando la disponibilidad inmediata de pgaudit y entornos de contenedores estables (postgres:17 en Debian).
   - Se actualizaron las reglas de inteligencia artificial (AGENTS.md) en todos los repositorios para reflejar este cambio.
2. **Actualización Normativa SENIAT**:
   - Se erradicaron las referencias obsoletas a la Providencia 121 (Homologación) a favor de la Providencia 102 (Facturación Electrónica) a lo largo de todas las especificaciones de los módulos de negocio.
3. **Consolidación de Stack**:
   - Se unificó el contexto transversal garantizando la directriz estricta de **Java 25 con Spring Boot 4** y **Angular 22 con Native Federation**.

## Impacto en este Repositorio

- Todo código, script de infraestructura, archivo YAML o instrucción de CI/CD debe basarse exclusivamente en **PostgreSQL 17** y cumplir con la **Providencia 102**. 
- Las directrices AGENTS.md locales han sido actualizadas para prevenir que la IA asuma versiones incorrectas en el futuro.
