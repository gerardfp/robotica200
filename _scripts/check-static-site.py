#!/usr/bin/env python3
"""Validate local references and shared Markdown learning-situation coverage."""

from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
import re
from urllib.parse import unquote, urlparse

ROOT = Path(__file__).resolve().parent.parent
EXPECTED_ROBOTS = {
    "coding-express", "tale-bot", "coding-set", "codey-rocky", "spike", "microbit"
}


class PageParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.refs = []
        self.has_situation_page = False

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag.lower() == "dialog":
            self.refs.append(("FORBIDDEN", "<dialog> elements are not allowed"))
        if tag.lower() == "situation-page":
            self.has_situation_page = True
        for attr in ("href", "src"):
            value = attrs.get(attr, "").strip()
            if value:
                self.refs.append((attr, value))


def local_target(page: Path, ref: str):
    parsed = urlparse(ref)
    if parsed.scheme or parsed.netloc or ref.startswith(("#", "data:")):
        return None
    path = unquote(parsed.path)
    if not path:
        return page
    if path.startswith("/"):
        return ROOT / path.lstrip("/")
    return page.parent / path


def read_frontmatter(path: Path):
    text = path.read_text(encoding="utf-8")
    match = re.match(r"^---\s*\n([\s\S]*?)\n---\s*\n?", text)
    if not match:
        return {}, text
    values = {}
    for item in re.finditer(r"^([A-Za-z0-9_-]+):\s*(.*)$", match.group(1), re.MULTILINE):
        values[item.group(1)] = item.group(2).strip().strip("\"'")
    return values, text[match.end():]


def main():
    problems = []
    robot_counts = Counter()
    pages = sorted(p for p in ROOT.rglob("*.html") if not any(part.startswith(".") for part in p.relative_to(ROOT).parts))

    for page in pages:
        parser = PageParser()
        parser.feed(page.read_text(encoding="utf-8"))
        relative = page.relative_to(ROOT)
        for kind, ref in parser.refs:
            if kind == "FORBIDDEN":
                problems.append(f"{relative}: {ref}")
                continue
            target = local_target(page, ref)
            if target is not None and not target.exists():
                problems.append(f"{relative}: missing local {kind} {ref}")
        if relative == Path("situacio/index.html") and not parser.has_situation_page:
            problems.append("situacio/index.html: missing shared <situation-page>")

    content_dir = ROOT / "_content/situacions"
    active = []
    for markdown_path in sorted(content_dir.glob("*.md")):
        editorial, body = read_frontmatter(markdown_path)
        if editorial.get("active", "").lower() != "true":
            continue
        active.append(markdown_path)
        for required in ("title", "description", "robot", "cycle", "subject", "theme", "duration", "challenge"):
            if not editorial.get(required):
                problems.append(f"{markdown_path.relative_to(ROOT)}: missing front matter '{required}'")
        robot = editorial.get("robot", "").lower()
        if robot != "desendollat":
            robot_counts[robot] += 1
        images = re.findall(r"!\[([^\]]*)\]\(([^)]+)\)", body)
        if not images:
            problems.append(f"{markdown_path.relative_to(ROOT)}: missing editorial image")
        for alt, ref in images:
            if not alt.strip():
                problems.append(f"{markdown_path.relative_to(ROOT)}: Markdown image needs descriptive alt text")
            target = local_target(markdown_path, ref)
            if target is not None and not target.exists():
                problems.append(f"{markdown_path.relative_to(ROOT)}: missing Markdown image {ref}")
        for ref in re.findall(r"(?<!!)\[[^\]]+\]\(([^)]+)\)", body):
            target = local_target(markdown_path, ref)
            if target is not None and not target.exists():
                problems.append(f"{markdown_path.relative_to(ROOT)}: missing Markdown link {ref}")

    if len(active) != 99:
        problems.append(f"expected 99 active Markdown situations, found {len(active)}")
    for robot in sorted(EXPECTED_ROBOTS):
        if robot_counts[robot] < 5:
            problems.append(f"robot {robot}: expected at least 5 situations, found {robot_counts[robot]}")
        icon = ROOT / "_assets/icons" / f"{robot}.png"
        if not icon.is_file():
            problems.append(f"robot {robot}: missing PNG icon at {icon.relative_to(ROOT)}")
    if not (ROOT / "_assets/icons/desendollat.png").is_file():
        problems.append("disconnected activities: missing PNG icon _assets/icons/desendollat.png")

    if problems:
        print("Static site validation failed:")
        for problem in problems:
            print(f"- {problem}")
        return 1
    print(f"Static site validation passed: {len(pages)} HTML pages, one shared situation page, {len(active)} active Markdown situations, no broken local references.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
