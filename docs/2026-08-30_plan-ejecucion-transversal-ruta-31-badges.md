# Plan de Ejecucion Estandar - ruta-31-badges

Fecha: 2026-08-30
Repositorio: ruta-31-badges
Version del plan: 1.1

## 1. Contexto
Repo de indicadores de release/build/coverage/docs del ecosistema.

## 2. Objetivo
Asegurar que badges sean consistentes, actualizados y utiles para gobierno tecnico.

## 3. Alcance
- Endpoints json de badges
- Scripts sync/collect/validate
- Convenciones de labels y colores

## 4. Dependencias
- Estado de pipelines y releases de repos fuente

## 5. Roadmap por fases
| Fase | Duracion | Objetivo | Salida esperada |
|---|---:|---|---|
| F1 Inventario | 1 dia | Cobertura de badges por repo | Matriz completa |
| F2 Normalizacion | 2 dias | Unificar esquema y semantica | Formato consistente |
| F3 Automatizacion | 2 dias | Endurecer validacion continua | Actualizacion estable |

## 6. RACI
- Responsible: Badges maintainer
- Accountable: Tech lead plataforma
- Consulted: Owners de repos fuente
- Informed: PMO tecnica

## 7. KPIs
- Badges fuera de formato: 0
- Badges desactualizados: 0

## 8. Riesgos
- Fuentes de datos no sincronizadas.
- Cambios de naming sin control.

## 9. Entregables
- Matriz de cobertura de badges
- Catalogo canonico
- Flujo de validacion continuo

## 10. Semaforo de control
- Rojo: endpoint invalido o desactualizado
- Amarillo: desalineacion temporal detectada
- Verde: endpoints validados y vigentes

## 11. Definicion de terminado
- Badges confiables y mantenibles para todo el programa.
