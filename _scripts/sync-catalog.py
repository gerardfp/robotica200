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
    for f in sorted(ROOT_DIR.glob('activitat/*/index.html')):
        slug = f.parent.name
        content = f.read_text(encoding='utf-8')

        # Check <activity-page>
        tag_m = re.search(r'<activity-page\b([^>]*)>', content, re.IGNORECASE | re.DOTALL)
        if tag_m:
            attrs = tag_m.group(1)
            title = get_attr(attrs, 'title') or slug
            tag = get_attr(attrs, 'tag')
            cicle = get_attr(attrs, 'cicle')
            durada = get_attr(attrs, 'durada')
            desc = get_attr(attrs, 'description')
            if not desc:
                # look for first paragraph
                p_m = re.search(r'<p>(.*?)</p>', content, re.IGNORECASE | re.DOTALL)
                desc = clean_html(p_m.group(1)) if p_m else ""
        else:
            # Fallback for classic HTML
            title_m = re.search(r'<h1 class=\"detail-page-title\">(.*?)</h1>', content)
            title = clean_html(title_m.group(1)) if title_m else slug
            badges = re.findall(r'<span class=\"tag-badge[^\"]*\">(.*?)</span>', content)
            tag = clean_html(badges[0]) if len(badges) > 0 else ""
            cicle = clean_html(badges[1]) if len(badges) > 1 else ""
            durada = clean_html(badges[2]).replace('⏱️', '').strip() if len(badges) > 2 else ""
            desc_m = re.search(r'<meta name=\"description\" content=\"(.*?)\"', content)
            desc = clean_html(desc_m.group(1)) if desc_m else ""

        activities.append({
            "id": f"activitat-{slug}",
            "slug": slug,
            "url": f"activitat/{slug}/index.html",
            "titol": title,
            "tag": tag,
            "cicle": cicle,
            "durada": durada,
            "descripcio": desc
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
        "ce": ("coding-express", "Coding Express"),
        "cr": ("codey-rocky", "Codey Rocky"),
        "cs": ("coding-set", "Coding Set"),
        "mb": ("microbit", "Micro:bit"),
        "sp": ("spike", "Spike"),
        "tb": ("tale-bot", "Tale-Bot")
    }

    for f in sorted(ROOT_DIR.glob('tutorial/*/index.html')):
        slug = f.parent.name
        content = f.read_text(encoding='utf-8')

        prefix = slug.split('-')[0]
        def_robot, def_label = robot_display.get(prefix, ("altres", "Robot"))

        tag_m = re.search(r'<tutorial-page\b([^>]*)>', content, re.IGNORECASE | re.DOTALL)
        if tag_m:
            attrs = tag_m.group(1)
            title = get_attr(attrs, 'title') or slug
            robot = get_attr(attrs, 'robot').lower() or def_robot
            robot_label = get_attr(attrs, 'robot-label') or def_label
            dificultat = get_attr(attrs, 'dificultat') or get_attr(attrs, 'nivell')
            durada = get_attr(attrs, 'durada')
            intro = get_attr(attrs, 'intro') or get_attr(attrs, 'description')
            imatge = get_attr(attrs, 'imatge') or get_attr(attrs, 'thumbnail') or get_attr(attrs, 'image')
        else:
            title_m = re.search(r'<h1 class=\"detail-page-title\">(.*?)</h1>', content)
            title = clean_html(title_m.group(1)) if title_m else slug
            intro_m = re.search(r'class=\"detail-intro\">(.*?)</p>', content)
            intro = clean_html(intro_m.group(1)) if intro_m else ""
            badges = re.findall(r'<span class=\"tag-badge[^\"]*\">(.*?)</span>', content)
            robot_label = clean_html(badges[0]) if len(badges) > 0 else def_label
            robot = def_robot
            dificultat = clean_html(badges[1]) if len(badges) > 1 else ""
            durada = clean_html(badges[2]).replace('⏱️', '').strip() if len(badges) > 2 else ""
            imatge = ""

        if not imatge:
            for ext in ['.png', '.webp', '.jpg', '.jpeg']:
                if (ROOT_DIR / f"_assets/tutorials/{slug}{ext}").exists():
                    imatge = f"_assets/tutorials/{slug}{ext}"
                    break
        if not imatge:
            imatge = f"_assets/tutorials/{slug}.png"

        tutorials.append({
            "id": f"tutorial-{slug}",
            "slug": slug,
            "robot": robot,
            "robotLabel": robot_label,
            "url": f"tutorial/{slug}/index.html",
            "imatge": imatge,
            "titol": title,
            "dificultat": dificultat,
            "durada": durada,
            "descripcio": intro
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
        r_item["url"] = f"robot/{slug}/index.html"
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
