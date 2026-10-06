#!/usr/bin/env python3
# _scripts/sync-catalog.py - Sincronització de metadades del catàleg Web Components
import os
import re
import json
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent.parent

def clean_html(text):
    if not text:
        return ""
    text = re.sub(r'<[^>]+>', '', text)
    text = text.replace('&amp;', '&').replace('&quot;', '"').replace('&#39;', "'").replace('&lt;', '<').replace('&gt;', '>')
    return text.strip()

def get_attr(tag_str, attr_name):
    m = re.search(rf'{attr_name}=("([^"]*)"|\'([^\']*)\')', tag_str, re.IGNORECASE | re.DOTALL)
    if m:
        val = m.group(2) if m.group(2) is not None else m.group(3)
        return clean_html(val)
    return ""

def read_markdown_frontmatter(path):
    """Read the project's deliberately flat YAML metadata subset without dependencies."""
    if not path or not path.is_file():
        return {}
    text = path.read_text(encoding='utf-8')
    match = re.match(r'^---\s*\n([\s\S]*?)\n---\s*\n?', text)
    if not match:
        return {}
    metadata = {}
    for line in match.group(1).splitlines():
        field = re.match(r'^([A-Za-z0-9_-]+):\s*(.*)$', line)
        if not field:
            continue
        value = field.group(2).strip()
        if value.startswith('"') and value.endswith('"'):
            try:
                value = json.loads(value)
            except json.JSONDecodeError:
                value = value[1:-1]
        elif value.startswith("'") and value.endswith("'"):
            value = value[1:-1].replace("''", "'")
        metadata[field.group(1)] = value
    return metadata

def scan_activities():
    activities = []
    for path in sorted((ROOT_DIR / '_content/activitats').glob('activitat-*.md')):
        data = read_markdown_frontmatter(path)
        if data.get('active', 'true').lower() != 'true':
            continue
        slug = path.stem.removeprefix('activitat-')
        activities.append({
            "id": f"activitat-{slug}", "slug": slug,
            "url": f"activitat/index.html?id={slug}",
            "titol": data.get('title', slug), "tag": data.get('topic', ''),
            "cicle": data.get('cycle_label', data.get('cycle', '')),
            "durada": data.get('duration', ''), "descripcio": data.get('description', '')
        })
    return activities

def scan_situations():
    situations = []
    robot_display = {
        "coding-express": "Coding Express",
        "tale-bot": "Tale-Bot",
        "coding-set": "Coding Set",
        "codey-rocky": "Codey Rocky",
        "spike": "Spike",
        "microbit": "Micro:bit",
        "desendollat": "Desendollat (Sense robot)"
    }
    for markdown_path in sorted((ROOT_DIR / '_content/situacions').glob('*.md')):
        editorial = read_markdown_frontmatter(markdown_path)
        if editorial.get('active', '').lower() != 'true':
            continue
        slug = markdown_path.stem
        title = editorial.get('title', slug)
        robot = editorial.get('robot', '').lower()
        if robot == 'lego-coding-express': robot = 'coding-express'
        elif robot == 'talebot': robot = 'tale-bot'
        elif robot == 'codingset': robot = 'coding-set'
        elif robot == 'codeyrocky': robot = 'codey-rocky'
        robot_label = editorial.get('robot_label') or robot_display.get(robot, robot.capitalize())
        cicle = editorial.get('cycle', '')
        cicle_label = editorial.get('cycle_label') or cicle
        materia = editorial.get('subject', '')
        materia_label = editorial.get('subject_label') or materia
        tematica = editorial.get('theme', '')
        tematica_label = editorial.get('theme_label') or tematica
        durada = editorial.get('duration', '')
        repte = editorial.get('challenge', '')
        situations.append({
            "id": f"situacio-sa-{slug}",
            "slug": slug,
            "url": f"situacio/index.html?id={slug}",
            "titol": title,
            "robot": robot,
            "robotLabel": robot_label,
            "cicle": cicle,
            "cicleLabel": cicle_label,
            "tematica": tematica,
            "tematicaLabel": tematica_label,
            "materia": materia,
            "materiaLabel": materia_label,
            "sessions": durada,
            "repte": repte
        })
    return situations

def scan_tutorials():
    tutorials = []
    robot_display = {
        "ce": ("coding-express", "Coding Express"), "cr": ("codey-rocky", "Codey Rocky"),
        "cs": ("coding-set", "Coding Set"), "mb": ("microbit", "Micro:bit"),
        "sp": ("spike", "Spike"), "tb": ("tale-bot", "Tale-Bot")
    }
    for path in sorted((ROOT_DIR / '_content/tutorials').glob('tutorial-*.md')):
        data = read_markdown_frontmatter(path)
        if data.get('active', 'true').lower() != 'true':
            continue
        slug = path.stem.removeprefix('tutorial-')
        def_robot, def_label = robot_display.get(slug.split('-')[0], ("altres", "Robot"))
        robot = data.get('robot', def_robot).lower()
        image = data.get('image', '')
        if not image:
            image = next((f"_assets/tutorials/{slug}{ext}" for ext in ['.png', '.webp', '.jpg', '.jpeg'] if (ROOT_DIR / f"_assets/tutorials/{slug}{ext}").exists()), f"_assets/tutorials/{slug}.png")
        tutorials.append({
            "id": f"tutorial-{slug}", "slug": slug, "robot": robot,
            "robotLabel": data.get('robot_label', def_label),
            "url": f"tutorial/index.html?id={slug}", "imatge": image,
            "titol": data.get('title', slug), "dificultat": data.get('level', ''),
            "durada": data.get('duration', ''), "descripcio": data.get('description', '')
        })
    return tutorials

def scan_robots(tutorials):
    robot_meta = [
        {
            "id": "robot-coding-express",
            "slug": "coding-express",
            "prefix": "ce",
            "nom": "Coding Express",
            "edat": "2-5 anys",
            "descripcio": "El tren interactiu dels colors i el pensament computacional primerenc.",
            "colors": ["#e4242b", "#fec002"],
            "order": 1
        },
        {
            "id": "robot-tale-bot",
            "slug": "tale-bot",
            "prefix": "tb",
            "nom": "Tale-Bot",
            "edat": "3-7 anys",
            "descripcio": "El robot narrador que parla, llegeix mapes interactius i dibuixa.",
            "colors": ["#fc8439", "#804cbd"],
            "order": 2
        },
        {
            "id": "robot-coding-set",
            "slug": "coding-set",
            "prefix": "cs",
            "nom": "Coding Set",
            "edat": "4-9 anys",
            "descripcio": "Programació tangible sense pantalles amb Matatalab.",
            "colors": ["#fc7813", "#60a62d"],
            "order": 3
        },
        {
            "id": "robot-codey-rocky",
            "slug": "codey-rocky",
            "prefix": "cr",
            "nom": "Codey Rocky",
            "edat": "6-12 anys",
            "descripcio": "El robot amb pantalla LED 16 × 8, sensors i moviment amb orugues.",
            "colors": ["#0079dc", "#fdc80a"],
            "order": 4
        },
        {
            "id": "robot-spike",
            "slug": "spike",
            "prefix": "sp",
            "nom": "Spike",
            "edat": "10-16 anys",
            "descripcio": "Mecatrònica, engranatges i sensors d'alta precisió de LEGO Education.",
            "colors": ["#d82098", "#fddc3e"],
            "order": 5
        },
        {
            "id": "robot-microbit",
            "slug": "microbit",
            "prefix": "mb",
            "nom": "Micro:bit",
            "edat": "9-18 anys",
            "descripcio": "La placa microcontroladora per a projectes oberts i ciutadans.",
            "colors": ["#047fdf", "#4a515d"],
            "order": 6
        }
    ]

    robots = []
    for r in robot_meta:
        slug = r["slug"]
        t_count = len([t for t in tutorials if t.get("robot") == slug])
        r_item = dict(r)
        editorial = read_markdown_frontmatter(ROOT_DIR / f'_content/robots/robot-{slug}.md')
        r_item['nom'] = editorial.get('title', r_item['nom'])
        r_item['edat'] = editorial.get('age', r_item['edat'])
        r_item['descripcio'] = editorial.get('description', r_item['descripcio'])
        r_item["url"] = f"robot/index.html?id={slug}"
        r_item["tutorials"] = t_count
        robots.append(r_item)
    return robots

def main():
    activitats = scan_activities()
    situacions = scan_situations()
    tutorials = scan_tutorials()
    robots = scan_robots(tutorials)

    cataleg_path = ROOT_DIR / '_js' / 'cataleg.js'
    cataleg_data = {
        "activitats": activitats,
        "situacions": situacions,
        "tutorials": tutorials,
        "robots": robots
    }

    js_content = f"""// _js/cataleg.js - Dades del catàleg generades automàticament per _scripts/sync-catalog.py
// No editeu manualment aquest fitxer; s'actualitza amb el script o mitjançant el git hook.
window.CATALEG = {json.dumps(cataleg_data, ensure_ascii=False, indent=2)};
"""
    cataleg_path.write_text(js_content, encoding='utf-8')
    print(f"✓ Sincronització completada amb èxit:")
    print(f"  - {len(activitats)} activitats")
    print(f"  - {len(situacions)} situacions d'aprenentatge")
    print(f"  - {len(tutorials)} tutorials")
    print(f"  - {len(robots)} robots")
    print(f"  Fitxer generat: {cataleg_path}")

if __name__ == '__main__':
    main()
