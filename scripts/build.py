#!/usr/bin/env python3
"""Build the complete offline website from Markdown, YAML and Jinja templates."""
from __future__ import annotations

import argparse
from functools import partial
from html.parser import HTMLParser
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import re
import shutil
import sys
import tempfile
import threading
import time
from urllib.parse import unquote, urlsplit
import xml.etree.ElementTree as ET

import markdown
from markdown.extensions import Extension
from markdown.treeprocessors import Treeprocessor
from jinja2 import Environment, FileSystemLoader, StrictUndefined, TemplateError, select_autoescape
from markupsafe import Markup
import yaml

ROOT = Path(__file__).resolve().parents[1]
COLLECTIONS = ('pages', 'robots', 'activitats', 'tutorials', 'situacions')
CATALOGS = {'robots': 'robotica.html', 'activitats': 'pensament-computacional.html',
            'situacions': 'situacions-aprenentatge.html'}
BACK_LABELS = {'robots': 'Robòtica', 'activitats': 'Pensament Computacional',
               'situacions': "Situacions d'Aprenentatge"}
MARKER = '.robotica200-build'


class ContentError(ValueError):
    """An actionable authoring error, reported without a traceback by the CLI."""


class UniqueLoader(yaml.SafeLoader):
    pass


def unique_mapping(loader, node):
    result = {}
    for key_node, value_node in node.value:
        key = loader.construct_object(key_node)
        if not isinstance(key, str):
            raise ContentError('Las claves YAML deben ser texto.')
        if key in result:
            raise ContentError(f'Clave YAML repetida: {key}')
        result[key] = loader.construct_object(value_node)
    return result


UniqueLoader.add_constructor(yaml.resolver.BaseResolver.DEFAULT_MAPPING_TAG, unique_mapping)


def read_yaml(text, source):
    try:
        result = yaml.load(text, Loader=UniqueLoader)
    except (yaml.YAMLError, ContentError) as exc:
        raise ContentError(f'{source}: {exc}') from exc
    if not isinstance(result, dict):
        raise ContentError(f'{source}: se esperaba un mapa YAML.')
    return result


def require(data, fields, source):
    if not isinstance(data, dict):
        raise ContentError(f'{source}: se esperaba un mapa de campos.')
    for key in fields:
        if not isinstance(data.get(key), str) or not data[key].strip():
            raise ContentError(f'{source}: falta el campo de texto «{key}».')


class LessonTree(Treeprocessor):
    """Map ordinary Markdown headings onto the existing spacious lesson layout."""
    def run(self, root):
        children = list(root)
        root[:] = []
        section = step = None
        for node in children:
            if node.tag == 'h2':
                section = ET.SubElement(root, 'section', {'class': 'detail-section'})
                section.append(node)
                step = None
            elif node.tag == 'h3':
                parent = section if section is not None else root
                step = ET.SubElement(parent, 'div', {'class': 'lesson-step'})
                step.append(node)
            elif node.tag == 'blockquote':
                node.set('class', 'teacher-tip-box')
                root.append(node)
                section = step = None
            else:
                if node.tag in ('ul', 'ol') and len(node) and re.match(r'S\d+:', ''.join(node[0].itertext())):
                    node.set('class', 'lesson-sessions')
                parent = step if step is not None else section if section is not None else root
                parent.append(node)


class LessonExtension(Extension):
    def extendMarkdown(self, md):
        md.treeprocessors.register(LessonTree(md), 'lesson_layout', 5)


def render_markdown(body):
    # Content is authored by repository collaborators; inline HTML is supported.
    return Markup(markdown.markdown(body, extensions=['tables', 'fenced_code', 'attr_list', LessonExtension()]))


def load_content(root):
    site = read_yaml((root / 'content/site.yml').read_text(), 'content/site.yml')
    require(site, ('name', 'subtitle', 'language'), 'content/site.yml')
    groups = {key: [] for key in COLLECTIONS}
    urls = set()
    for group in COLLECTIONS:
        for path in sorted((root / 'content' / group).glob('*.md')):
            source = str(path.relative_to(root))
            match = re.fullmatch(r'---\r?\n(.*?)\r?\n---\r?\n(.*)', path.read_text(), re.S)
            if not match:
                raise ContentError(f'{source}: usa una cabecera YAML entre líneas --- seguida de Markdown.')
            data = read_yaml(match[1], source)
            require(data, ('title', 'description'), source)
            if not match[2].strip():
                raise ContentError(f'{source}: el cuerpo Markdown está vacío.')
            if not re.fullmatch(r'[a-z0-9][a-z0-9-]*', path.stem):
                raise ContentError(f'{source}: el nombre debe usar minúsculas, números y guiones.')
            url = path.stem + '.html'
            if url in urls:
                raise ContentError(f'{source}: URL duplicada: {url}')
            urls.add(url)
            if type(data.get('order', 100)) is not int:
                raise ContentError(f'{source}: order debe ser un entero.')
            if group == 'pages':
                data['catalog'] = data.pop('collection', None)
            data.update(collection=group, url=url, slug=path.stem, source=source,
                        body=render_markdown(match[2]), back=data.get('back'))
            data.setdefault('order', 100)
            groups[group].append(data)
        groups[group].sort(key=lambda item: (item['order'], item['slug']))
    robots = {}
    for robot in groups['robots']:
        robot.setdefault('name', robot['title'])
        require(robot, ('icon', 'age', 'image'), robot['source'])
        if not robot['slug'].startswith('robot-'):
            raise ContentError(f"{robot['source']}: el nombre debe empezar por robot-.")
        if not isinstance(robot.get('specs'), list) or not all(isinstance(x, str) for x in robot['specs']):
            raise ContentError(f"{robot['source']}: specs debe ser una lista de textos.")
        robots[robot['slug'].removeprefix('robot-')] = robot
    for group, entries in groups.items():
        for item in entries:
            if 'seo_title' not in item:
                suffix = {
                    'pages': '',
                    'robots': ' - Robòtica Educativa',
                    'activitats': '',
                    'tutorials': f" - {robots[item['robot']]['name']}" if group == 'tutorials' and item.get('robot') in robots else '',
                    'situacions': " - Situació d'Aprenentatge",
                }[group]
                item['seo_title'] = f"{item['title']}{suffix} | {site['name']}"
            require(item, ('seo_title',), item['source'])
            for field in ('seo_title', 'description'):
                item[field] = item[field].replace('{robot_count}', str(len(robots)))
    filters = site.get('filters')
    if not isinstance(filters, dict) or set(filters) != {'robot', 'cicle', 'tematica', 'materia'}:
        raise ContentError('content/site.yml: se requieren los filtros robot, cicle, tematica y materia.')
    for key, config in filters.items():
        require(config, ('label',), f'filtro {key}')
        if not isinstance(config.get('options'), list):
            raise ContentError(f'filtro {key}: falta la lista options.')
        seen = set()
        for option in config['options']:
            require(option, ('value', 'label'), f'filtro {key}')
            if option['value'] in seen:
                raise ContentError(f'filtro {key}: valor duplicado {option["value"]}.')
            seen.add(option['value'])
        if 'all' not in seen:
            raise ContentError(f'filtro {key}: falta la opción all.')
    # Robot options are derived from content so new robots appear automatically.
    robot_options = {x['value']: x for x in filters['robot']['options']}
    if 'desendollat' not in robot_options:
        raise ContentError('filtro robot: falta desendollat.')
    filters['robot']['options'] = [robot_options['all']] + [
        {'value': key, 'label': item['name']} for key, item in robots.items()
    ] + [robot_options['desendollat']]
    labels = {key: {opt['value']: opt['label'] for opt in val['options']}
              for key, val in filters.items()}
    for group, entries in groups.items():
        for item in entries:
            source = item['source']
            if group == 'pages':
                if item.get('layout') not in ('home', 'catalog', 'article'):
                    raise ContentError(f'{source}: layout debe ser home, catalog o article.')
                if item['layout'] == 'catalog' and item['catalog'] not in CATALOGS:
                    raise ContentError(f'{source}: collection debe ser robots, activitats o situacions.')
                if item['layout'] == 'home':
                    if not isinstance(item.get('pillars'), list):
                        raise ContentError(f'{source}: falta la lista pillars.')
                    for pillar in item['pillars']:
                        require(pillar, ('href', 'icon', 'title', 'description', 'action'), source)
                        for field in ('description', 'action'):
                            pillar[field] = pillar[field].replace('{robot_count}', str(len(robots)))
                item['active'] = item.get('active', item['url'])
                if not item.get('back') and item['url'] != 'index.html':
                    item['back'] = {'href': 'index.html', 'label': "← Tornar a l'inici"}
                continue
            if group == 'tutorials':
                require(item, ('robot', 'level', 'duration'), source)
                if item['robot'] not in robots:
                    raise ContentError(f'{source}: robot desconocido: {item["robot"]}')
                parent = robots[item['robot']]
                item.update(active=CATALOGS['robots'], back={'href': parent['url'], 'label': f"← Tornar a {parent['name']}"},
                            badges=[parent['name'], item['level'], '⏱️ ' + item['duration']],
                            card_badges=[item['level'], '⏱️ ' + item['duration']],
                            card_footer="Pas a pas d'aula", card_action='Obrir tutorial →')
                continue
            item['active'] = CATALOGS[group]
            item['back'] = {'href': CATALOGS[group], 'label': f'← Tornar a {BACK_LABELS[group]}'}
            if group == 'robots':
                count = sum(t['robot'] == item['slug'].removeprefix('robot-') for t in groups['tutorials'] if 'robot' in t)
                item.update(card_badges=[item['age']], card_footer=f'{count} tutorials', card_action='Entrar a la pàgina →')
            elif group == 'activitats':
                require(item, ('topic', 'cycle_label', 'duration'), source)
                item.update(card_badges=[item['topic'], item['cycle_label']],
                            badges=[item['topic'], item['cycle_label'], '⏱️ ' + item['duration']],
                            card_footer='⏱️ ' + item['duration'], card_action='Veure activitat →')
            else:
                require(item, ('robot', 'cycle_label', 'theme', 'subject', 'duration'), source)
                for field, taxonomy in [('robot', 'robot'), ('theme', 'tematica'), ('subject', 'materia')]:
                    if item[field] == 'all' or item[field] not in labels[taxonomy]:
                        raise ContentError(f'{source}: {field} desconocido: {item[field]}')
                cycles = item.get('cycles')
                if not isinstance(cycles, list) or not cycles or any(not isinstance(c, str) or c == 'all' or c not in labels['cicle'] for c in cycles):
                    raise ContentError(f'{source}: cycles debe contener ciclos válidos de content/site.yml.')
                item.update(card_badges=[labels['robot'][item['robot']], item['cycle_label']],
                            badges=[labels['robot'][item['robot']], item['cycle_label'], item.get('subject_label', labels['materia'][item['subject']]), '⏱️ ' + item['duration']],
                            theme_label=item.get('theme_label', labels['tematica'][item['theme']]),
                            card_footer='⏱️ ' + item['duration'], card_action='Veure situació →')
    required = {'index.html', *CATALOGS.values()}
    if not required <= {p['url'] for p in groups['pages']}:
        raise ContentError('Faltan las páginas de inicio o de catálogo en content/pages/.')
    return site, groups


class PageAudit(HTMLParser):
    def __init__(self):
        super().__init__()
        self.refs = []
        self.ids = set()
        self.errors = []
        self.h1 = 0

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        self.h1 += tag == 'h1'
        if tag == 'dialog' or attrs.get('role') in ('dialog', 'alertdialog') or attrs.get('aria-modal') == 'true':
            self.errors.append('Los diálogos modales están prohibidos.')
        if 'id' in attrs:
            if attrs['id'] in self.ids:
                self.errors.append(f'ID duplicado: {attrs["id"]}')
            self.ids.add(attrs['id'])
        self.refs.extend(attrs[k] for k in ('href', 'src') if k in attrs)


def validate_output(output):
    pages = {}
    errors = []
    for file in output.glob('*.html'):
        audit = PageAudit()
        audit.feed(file.read_text())
        pages[file.resolve()] = audit
        errors.extend(f'{file.name}: {error}' for error in audit.errors)
        if audit.h1 != 1:
            errors.append(f'{file.name}: se requiere exactamente un h1.')
    for file, audit in pages.items():
        for ref in audit.refs:
            url = urlsplit(ref)
            if url.scheme or url.netloc:
                continue
            target = (file.parent / unquote(url.path)).resolve() if url.path else file
            if not target.is_relative_to(output.resolve()) or not target.is_file():
                errors.append(f'{file.name}: recurso local inexistente o fuera de dist: {ref}')
            elif url.fragment and target in pages and unquote(url.fragment) not in pages[target].ids:
                errors.append(f'{file.name}: ancla inexistente: {ref}')
    if errors:
        raise ContentError('\n'.join(errors))


def build(root=ROOT, output=None):
    root = Path(root).resolve()
    output = Path(output or root / 'dist').resolve()
    # Never treat source directories or an arbitrary populated folder as output.
    protected = [root, *(root / p for p in ('content', 'templates', 'css', 'js', 'assets', 'scripts', 'tests', '.git', '.github'))]
    if any(output == p or p.is_relative_to(output) or (p != root and output.is_relative_to(p)) for p in protected):
        raise ContentError('El destino debe ser una carpeta de salida independiente de las fuentes.')
    if output.exists() and any(output.iterdir()) and not (output / MARKER).is_file():
        raise ContentError(f'{output}: carpeta no vacía que no pertenece al generador.')
    site, groups = load_content(root)
    env = Environment(loader=FileSystemLoader(root / 'templates'), autoescape=select_autoescape(['html']),
                      undefined=StrictUndefined, trim_blocks=True, lstrip_blocks=True)
    output.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix='.robotica200-', dir=output.parent) as temp:
        staging = Path(temp)
        for folder in ('css', 'js', 'assets'):
            shutil.copytree(root / folder, staging / folder, ignore=shutil.ignore_patterns('originals', 'backup_photos'))
        for group, items in groups.items():
            for item in items:
                entries = []
                if group == 'pages':
                    template = item['layout']
                    entries = groups.get(item['catalog'], [])
                elif group == 'robots':
                    template = 'robot'
                    entries = [t for t in groups['tutorials'] if t['robot'] == item['slug'].removeprefix('robot-')]
                else:
                    template = 'detail'
                html = env.get_template(template + '.html').render(site=site, page=item, entries=entries)
                (staging / item['url']).write_text(html + '\n', encoding='utf-8')
        (staging / '.nojekyll').touch()
        validate_output(staging)
        files = sorted(str(p.relative_to(staging)) for p in staging.rglob('*') if p.is_file())
        previous = (output / MARKER).read_text().splitlines() if (output / MARKER).exists() else []
        shutil.copytree(staging, output, dirs_exist_ok=True)
        for name in set(previous) - set(files):
            stale = (output / name).resolve()
            if stale.is_relative_to(output) and stale.is_file():
                stale.unlink()
        (output / MARKER).write_text('\n'.join(files) + '\n')
    return sum(len(items) for items in groups.values())


def fingerprint(root):
    return [(str(p), p.stat().st_mtime_ns, p.stat().st_size)
            for name in ('content', 'templates', 'css', 'js', 'assets')
            for p in sorted((root / name).rglob('*')) if p.is_file()]


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output', type=Path, default=ROOT / 'dist')
    parser.add_argument('--serve', action='store_true', help='Servir en localhost y regenerar al editar las fuentes.')
    parser.add_argument('--port', type=int, default=3000)
    args = parser.parse_args()
    try:
        print(f'Generadas {build(ROOT, args.output)} páginas en {args.output.resolve()}', flush=True)
        if args.serve:
            handler = partial(SimpleHTTPRequestHandler, directory=str(args.output.resolve()))
            server = ThreadingHTTPServer(('127.0.0.1', args.port), handler)
            threading.Thread(target=server.serve_forever, daemon=True).start()
            print(f'Web: http://localhost:{args.port} — regenera al guardar; recarga el navegador. Ctrl+C para salir.', flush=True)
            previous = fingerprint(ROOT)
            try:
                while True:
                    time.sleep(1)
                    current = fingerprint(ROOT)
                    if current != previous:
                        previous = current
                        try:
                            print(f'Regeneradas {build(ROOT, args.output)} páginas.', flush=True)
                        except (ContentError, OSError, ValueError, TemplateError) as exc:
                            print(f'Error: {exc}\nSe conserva la última generación válida.', file=sys.stderr, flush=True)
            finally:
                server.shutdown()
                server.server_close()
    except KeyboardInterrupt:
        return 0
    except (ContentError, OSError, ValueError, TemplateError) as exc:
        print(f'Error: {exc}', file=sys.stderr)
        return 1
    return 0


if __name__ == '__main__':
    sys.exit(main())
