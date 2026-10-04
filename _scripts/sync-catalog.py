#!/usr/bin/env python3
# _scripts/sync-catalog.py - Generador automàtic del catàleg a partir de les carpetes
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
    for f in sorted(ROOT_DIR.glob('situacio/*/index.html')):
        slug = f.parent.name
        content = f.read_text(encoding='utf-8')

        tag_m = re.search(r'<situation-page\b([^>]*)>', content, re.IGNORECASE | re.DOTALL)
        if tag_m:
            attrs = tag_m.group(1)
            title = get_attr(attrs, 'title') or slug
            robot = get_attr(attrs, 'robot').lower()
            if robot == 'lego-coding-express': robot = 'coding-express'
            elif robot == 'talebot': robot = 'tale-bot'
            elif robot == 'codingset': robot = 'coding-set'
            elif robot == 'codeyrocky': robot = 'codey-rocky'
            robot_label = get_attr(attrs, 'robot-label') or robot_display.get(robot, robot.capitalize())
            cicle = get_attr(attrs, 'cicle')
            cicle_label = get_attr(attrs, 'cicle-label') or cicle
            materia = get_attr(attrs, 'materia')
            materia_label = get_attr(attrs, 'materia-label') or materia
            tematica = get_attr(attrs, 'tematica')
            tematica_label = get_attr(attrs, 'tematica-label') or tematica
            durada = get_attr(attrs, 'durada') or get_attr(attrs, 'sessions')
            repte = get_attr(attrs, 'repte')
        else:
            title_m = re.search(r'<h1 class=\"detail-page-title\">(.*?)</h1>', content)
            title = clean_html(title_m.group(1)) if title_m else slug
            repte_m = re.search(r'class=\"sa-challenge\">\"?(.*?)\"?</p>', content)
            repte = clean_html(repte_m.group(1)) if repte_m else ""
            badges = re.findall(r'<span class=\"tag-badge[^\"]*\">(?:<img[^>]*>)?(.*?)</span>', content)
            robot_label = clean_html(badges[0]) if len(badges) > 0 else ""
            robot = "desendollat"
            for k, v in robot_display.items():
                if v.lower() in robot_label.lower():
                    robot = k
                    break
            cicle_label = clean_html(badges[1]) if len(badges) > 1 else ""
            cicle = "cicle-mitja"
            if "infantil" in cicle_label.lower(): cicle = "infantil"
            elif "inicial" in cicle_label.lower(): cicle = "cicle-inicial"
            elif "superior" in cicle_label.lower(): cicle = "cicle-superior"
            elif "eso" in cicle_label.lower(): cicle = "eso"

            materia_label = clean_html(badges[2]) if len(badges) > 2 else ""
            materia = "tecnologia"
            if "medi" in materia_label.lower(): materia = "medi"
            elif "matemàtiques" in materia_label.lower() or "matematiques" in materia_label.lower(): materia = "matematiques"
            elif "llengua" in materia_label.lower(): materia = "llengua"
            elif "artística" in materia_label.lower() or "artistica" in materia_label.lower(): materia = "artistica"

            durada = clean_html(badges[3]).replace('⏱️', '').strip() if len(badges) > 3 else ""
            tematica_label = clean_html(badges[4]).replace('🏷️', '').strip() if len(badges) > 4 else ""
            tematica = "sostenibilitat"
            if "ciutat" in tematica_label.lower(): tematica = "ciutat"
            elif "salut" in tematica_label.lower(): tematica = "salut"
            elif "art" in tematica_label.lower(): tematica = "art"
            elif "espacial" in tematica_label.lower() or "espai" in tematica_label.lower(): tematica = "espai"
            elif "ciutadania" in tematica_label.lower() or "societat" in tematica_label.lower(): tematica = "societat"

        situations.append({
            "id": f"situacio-sa-{slug}",
            "slug": slug,
            "url": f"situacio/{slug}/index.html",
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

        tutorials.append({
            "id": f"tutorial-{slug}",
            "slug": slug,
            "robot": robot,
            "robotLabel": robot_label,
            "url": f"tutorial/{slug}/index.html",
            "titol": title,
            "dificultat": dificultat,
            "durada": durada,
            "descripcio": intro
        })
    return tutorials

def main():
    activitats = scan_activities()
    situacions = scan_situations()
    tutorials = scan_tutorials()

    cataleg_path = ROOT_DIR / '_js' / 'cataleg.js'
    cataleg_data = {
        "activitats": activitats,
        "situacions": situacions,
        "tutorials": tutorials
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
    print(f"  Fitxer generat: {cataleg_path}")

if __name__ == '__main__':
    main()
