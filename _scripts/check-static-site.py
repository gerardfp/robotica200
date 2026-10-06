#!/usr/bin/env python3
"""Validate local references and learning-situation catalog coverage."""

from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlparse

ROOT = Path(__file__).resolve().parent.parent
EXPECTED_ROBOTS = {
    "coding-express",
    "tale-bot",
    "coding-set",
    "codey-rocky",
    "spike",
    "microbit",
}


class PageParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.refs = []
        self.robots = []
        self.has_situation_page = False
        self.has_illustration = False
        self.in_situation_illustration = False
        self.has_accessible_situation_image = False

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag.lower() == "dialog":
            self.refs.append(("FORBIDDEN", "<dialog> elements are not allowed"))
        if tag.lower() == "situation-page":
            self.has_situation_page = True
            robot = attrs.get("robot", "").strip().lower()
            if robot and robot != "desendollat":
                self.robots.append(robot)
        if tag.lower() == "figure" and "sa-illustration" in attrs.get("class", "").split():
            self.has_illustration = True
            self.in_situation_illustration = True
        if tag.lower() == "img" and self.in_situation_illustration:
            alt = attrs.get("alt", "").strip()
            self.has_accessible_situation_image = bool(
                alt and attrs.get("width") == "600" and attrs.get("height") == "448"
            )
        for attr in ("href", "src"):
            value = attrs.get(attr, "").strip()
            if value:
                self.refs.append((attr, value))

    def handle_endtag(self, tag):
        if tag.lower() == "figure" and self.in_situation_illustration:
            self.in_situation_illustration = False


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

        if relative.parts[0] == "situacio":
            if not parser.has_situation_page:
                problems.append(f"{relative}: missing <situation-page> Web Component")
            if not parser.has_illustration:
                problems.append(f"{relative}: missing local situation illustration")
            elif not parser.has_accessible_situation_image:
                problems.append(f"{relative}: situation illustration needs descriptive alt text and 600x448 dimensions")
            robot_counts.update(parser.robots)

    for robot in sorted(EXPECTED_ROBOTS):
        if robot_counts[robot] < 5:
            problems.append(f"robot {robot}: expected at least 5 situations, found {robot_counts[robot]}")
        icon = ROOT / "_assets" / "icons" / f"{robot}.png"
        if not icon.is_file():
            problems.append(f"robot {robot}: missing PNG icon at {icon.relative_to(ROOT)}")

    if not (ROOT / "_assets" / "icons" / "desendollat.png").is_file():
        problems.append("disconnected activities: missing PNG icon _assets/icons/desendollat.png")

    if problems:
        print("Static site validation failed:")
        for problem in problems:
            print(f"- {problem}")
        return 1

    print(f"Static site validation passed: {len(pages)} HTML pages, no broken local references, six robot collections meet the five-situation minimum.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
