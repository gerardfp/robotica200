# Editar el contenido

Cada archivo `.md` tiene una cabecera **YAML** entre dos líneas `---` y, debajo, el contenido en **Markdown**. Se editan estos archivos; no los HTML de `dist/`.

## Ejemplo de tutorial

Crea `content/tutorials/tutorial-cr-semafor.md`:

```markdown
---
title: Un semàfor amb CodeyRocky
description: Programar una seqüència de llums per regular el pas.
robot: codeyrocky
level: Iniciació
duration: 30 min
order: 4
---

## 🎯 Objectius d'aprenentatge

- Crear una seqüència de tres estats.
- Introduir una espera entre estats.

## 📦 Material necessari

- CodeyRocky i un ordinador amb mBlock.

## 👣 Passos de la pràctica a l'aula

### 1. Connectar el robot

Connecta el robot i comprova que respon.

### 2. Programar els estats

Crea la seqüència **vermell → groc → verd**.

> **💡 Consell docent:** Assaja primer amb una seqüència curta.
```

Ejecuta `./iniciar.sh`. El tutorial aparecerá en la ficha de CodeyRocky, el contador aumentará y su URL será `tutorial-cr-semafor.html`. No hace falta modificar los catálogos ni escribir HTML.

## Campos

Todos los archivos requieren `title`, `description` y un cuerpo Markdown. `order` es un entero opcional (por defecto `100`); ordena las tarjetas y, en caso de empate, se usa el nombre del archivo. `seo_title` es opcional y permite conservar o personalizar el título de la pestaña; si falta, la plantilla lo compone a partir del tipo de página, el robot y el nombre del sitio.

| Tipo | Campos propios |
| --- | --- |
| Robot | `icon`, `age`, `image`, `specs` (lista de textos); `title` es su nombre corto y el cuerpo es la descripción larga |
| Tutorial | `robot`, `level`, `duration`; `summary` opcional para una descripción de tarjeta distinta de `description` |
| Actividad | `topic`, `cycle_label`, `duration` |
| Situación | `robot`, `cycles` (lista), `cycle_label`, `theme`, `subject`, `duration` |
| Página de catálogo | `layout: catalog`, `collection` (`robots`, `activitats` o `situacions`); el cuerpo es la introducción |
| Inicio | `layout: home`, `pillars` (lista de enlaces con `href`, `icon`, `title`, `description` y `action`) |

Para añadir un robot, copia una ficha de `content/robots/` y usa un nombre `robot-identificador.md`. Su identificador es la parte posterior a `robot-`; por ejemplo, `robot-codeyrocky.md` se referencia como `robot: codeyrocky`. El robot entra automáticamente en el catálogo y en el filtro de situaciones. Usa `title` y `name` con el mismo nombre corto; `name` también aparece en las referencias desde tutoriales y situaciones. La lista `specs` conserva el prefijo visible `✓` si se incluye.

Las actividades y situaciones se añaden copiando una ficha de su colección. Mantén las convenciones `activitat-…`, `situacio-…` y `tutorial-…`. Los nombres deben ser únicos en todas las colecciones, con minúsculas, números y guiones. **El nombre determina la URL**: no lo cambies si quieres conservar enlaces ya publicados.

`duration` contiene texto como `45 min` o `6 sessions`, sin el prefijo del reloj. Las insignias, enlaces de vuelta y contadores los genera la plantilla.

## Situaciones con varios ciclos

```yaml
robot: microbit
cycles:
  - cicle-mitja
  - cicle-superior
cycle_label: Cicle Mitjà i Superior
theme: sostenibilitat
subject: medi
duration: 5 sessions
```

`cycles` controla el filtro; `cycle_label` es la etiqueta visible, que puede incluir edades o cursos. Mantén ambos coherentes. `robot` admite también `desendollat`.

Los valores aceptados de `cycles`, `theme` y `subject` están en `content/site.yml`, en los filtros `cicle`, `tematica` y `materia`. Para ampliar un vocabulario, añade allí su valor y etiqueta antes de usarlo. Las opciones de robots se crean desde las fichas, salvo `all` y `desendollat`, que se definen en YAML.

Las etiquetas largas se toman del vocabulario. En casos especiales puedes usar `theme_label` o `subject_label` para una etiqueta visible propia sin cambiar el filtro. La página de inicio sustituye `{robot_count}` en la descripción y la acción del acceso a robótica por la cantidad actual de fichas.

## Markdown y diseño

- `##` crea una sección de la ficha.
- `###` crea un paso con su tarjeta; escribe el número si lo necesitas.
- `-` crea una lista. Las listas de sesiones que empiezan por `S1:`, `S2:`, etc. usan el diseño de sesiones.
- `> **💡 Consell:** ...` crea un consejo docente.
- Se admiten negritas, enlaces, imágenes, tablas y bloques de código.
- El título principal lo aporta la plantilla; no añadas un segundo `#`.

Algunos párrafos migrados utilizan atributos de Markdown para conservar su aspecto:

```markdown
"Com podem ajudar el nostre barri?"
{: .sa-challenge }

Avalua la capacitat de proposar i justificar una solució.
{: .assessment }
```

Para enlaces internos e imágenes usa rutas relativas a la **web generada**, por ejemplo `[Microbit](robot-microbit.html)` o `![Robot](assets/robots/microbit.jpg)`. Los enlaces apuntan a `.html`, no a los archivos `.md`. Pon los recursos publicables en `assets/`; las carpetas `originals` y `backup_photos` quedan excluidas. Respeta las medidas y reglas de las portadas de [AGENTS.md](../AGENTS.md).

El Markdown admite HTML de los colaboradores del repositorio, pero no se necesita para editar las fichas habituales. Se prohíben los modales y popups. Las plantillas escapan automáticamente los textos de la cabecera YAML; el cuerpo Markdown se renderiza como contenido editorial.

## Qué cambiar en las plantillas

- `base.html`: documento, navegación, cabecera, pie y scripts.
- `cards.html`: tarjetas de los catálogos y tutoriales.
- `home.html` y `catalog.html`: inicio y listados.
- `robot.html` y `detail.html`: fichas.

Los cambios se aplican a toda la web en la próxima generación. En `scripts/build.py` están la lectura, las relaciones, el renderizado de Markdown, la validación y el servidor local. No hace falta tocar Python para añadir contenido de los tipos existentes.

Para comprobar cambios antes de subirlos:

```bash
.venv/bin/python -m unittest discover -s tests -v
.venv/bin/python scripts/build.py
```

Guarda en Git los cambios de `content/`, plantillas y recursos. El siguiente push ejecutará la generación automática; `dist/` está excluido de Git. No hay base de datos, panel de administración ni necesidad de mantener un servidor Python en producción.
