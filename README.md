# 🤖 Robòtica200 — Robòtica per a docents

Web educativa estática generada con **Python, Markdown y plantillas Jinja**. El contenido se edita en `content/`; el generador crea las páginas, los catálogos y sus enlaces en `dist/`.

Se mantienen las URL de la web, las portadas, los tres apartados, el modo claro/oscuro, los filtros combinables y las vistas completas con botón de vuelta. Las situaciones admiten varios ciclos y conservan los filtros al volver desde el detalle. No se utilizan modales, APIs ni analítica externa; las tipografías se cargan desde Google Fonts con fuentes de sistema como alternativa.

## Uso local

Requiere Python **3.11 o posterior**. Instala las dependencias una vez:

```bash
python3 -m venv .venv
.venv/bin/python -m pip install -r requirements.txt
```

Generar toda la web:

```bash
.venv/bin/python scripts/build.py
```

Abre **`dist/index.html`** directamente en el navegador. La web generada funciona sin conexión y no necesita Python para consultarla.

Para editar con servidor local y regeneración al guardar:

```bash
./iniciar.sh
```

Abre <http://localhost:3000>. Al modificar contenido, plantillas, CSS, JS o imágenes, el generador reconstruye la web; **recarga el navegador** para ver los cambios. Si hay un error de contenido o plantilla, se muestra en la terminal y se conserva la última generación válida. Detén el servidor con `Ctrl+C`. Puedes cambiar el puerto: `./iniciar.sh --port 8000`.

## Dónde editar

| Directorio / archivo | Contenido |
| --- | --- |
| `content/pages/` | Inicio y presentación de los tres catálogos |
| `content/robots/` | Fichas de robots y especificaciones |
| `content/tutorials/` | Tutoriales asociados a un robot |
| `content/activitats/` | Actividades de pensamiento computacional |
| `content/situacions/` | Situaciones y sus etiquetas de filtrado |
| `content/site.yml` | Nombre del sitio, navegación y vocabularios de los filtros |
| `templates/` | Diseño compartido: cabecera, pie, tarjetas, fichas y catálogos |
| `css/`, `js/`, `assets/robots/` | Estilos, comportamiento e imágenes |
| `dist/` | Resultado generado; no editar ni añadir a Git |

La [guía de edición](docs/CONTENIDO.md) explica los campos y cómo añadir contenido. Las reglas visuales están en [AGENTS.md](AGENTS.md) y [STYLE_GUIDE.md](STYLE_GUIDE.md).

## Generación al hacer push

El flujo [Generar web](.github/workflows/site.yml) se ejecuta en cada `push`, en las pull requests y manualmente desde Actions:

1. Instala las dependencias fijadas en `requirements.txt`.
2. Ejecuta las pruebas del generador.
3. Genera y valida la web completa.
4. Guarda el resultado descargable como artefacto **`robotica200-web`**.

No hace commits de HTML generado ni publica por defecto. No necesita credenciales adicionales para generar el artefacto.

Para **publicar también en GitHub Pages** al hacer push a `main`:

1. En **Settings → Pages → Build and deployment → Source**, selecciona **GitHub Actions**.
2. En **Settings → Secrets and variables → Actions → Variables**, crea la variable de repositorio **`PUBLISH_PAGES`** con valor **`true`**.
3. Haz push a `main` o ejecuta el flujo manualmente sobre esa rama.

La configuración de Pages sigue la [documentación oficial de GitHub](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages). Las pull requests y otras ramas generan la web pero no la publican. Los enlaces relativos permiten servirla también bajo `/robotica200/`.

**Migración:** los HTML que antes estaban en la raíz se sustituyen por Markdown y plantillas; ahora se generan en `dist/`. Si Pages estaba configurado para publicar la raíz de una rama, cambia su fuente a GitHub Actions antes de desplegar esta migración. No se ha cambiado la configuración remota desde el generador.

## Validación

```bash
.venv/bin/python -m unittest discover -s tests -v
.venv/bin/python scripts/build.py
```

Cada generación verifica metadatos, relaciones con robots, vocabularios de filtros, URL duplicadas, enlaces y recursos locales, anclas, identificadores repetidos, un `h1` por página y ausencia de elementos de diálogo. Los enlaces externos y la exactitud didáctica del contenido requieren revisión editorial.

Los catálogos, opciones de robot y contadores se calculan a partir de los archivos. Al retirar una ficha, su página generada se elimina en la siguiente compilación; si queda algún enlace hacia ella, la validación avisa. `assets/originals/` y `assets/robots/backup_photos/` se conservan como material de trabajo y no se publican.
