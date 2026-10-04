#!/usr/bin/env python3
"""
Generador de fondos SVG aleatorios (297 x 210) con 7 rectángulos isométricos.

Genera UN svg por cada par de colores definido en COLOR_PAIRS.
Toda la configuración está en las variables de la sección CONFIGURACIÓN;
el script no recibe parámetros: se edita y se ejecuta con `python generar_fondos.py`.

- Cada rectángulo usa la transform matrix(0.83205031,0.55470018,-0.83205031,0.55470018,0,0).
- Los tonos salen de los dos colores del par y cada rectángulo tiene un degradado
  hacia transparencia.
- Los 7 rectángulos cubren todo el lienzo y se solapan entre sí, con bordes
  desplazados al azar para que no queden alineados.
- Esquinas: rx = ry = RADIUS fijo para todos (la matriz tiene ejes de longitud 1,
  así que el redondeo es idéntico sea cual sea el tamaño del rectángulo).
"""

import colorsys
import math
import random
from pathlib import Path

# ============================================================================
# CONFIGURACIÓN
# ============================================================================

# Pares de colores intensos (color1, color2). Se genera un SVG por cada par.
COLOR_PAIRS = [
    ("#e4242b", "#fec002"),  # naranja + morado
    ("#fc8439", "#804cbd"),  # azul + turquesa
    ("#fc7813", "#60a62d"),  # rosa + ámbar
    ("#0079dc", "#fdc80a"),  # verde + azul profundo
    ("#d82098", "#fddc3e"),  # rojo + violeta
    ("#047fdf", "#4a515d"),  # rojo + violeta
]

OUTPUT_DIR = "fondos"   # carpeta de salida
SEED = None             # None = aleatoria cada vez; un entero = resultado reproducible

# Fondo bajo los rectángulos: "auto" (tono claro derivado del par),
# "none" (transparente) o un color hex, p. ej. "#FFF4EA".
BACKGROUND = "auto"

# Lienzo y número de rectángulos
WIDTH, HEIGHT = 297, 210
N_RECTS = 7

# Forma
RADIUS = 12.0           # radio de esquina (rx = ry) igual para todos los rectángulos
RY_RATIO = 1.0          # ry = RADIUS * RY_RATIO (1.0 = esquinas circulares en local)
OVERLAP = (14.0, 40.0)  # rango (mín, máx) de solape por lado
JITTER = 32.0           # desplazamiento aleatorio extra de cada borde (±)
MIN_SIZE = 46.0         # lado mínimo de un rectángulo (debe ser > 2*RADIUS)
MIN_COVERAGE = 0.985    # cobertura mínima exigida del lienzo

# Color
OPACITY_START = (0.85, 1.0)   # opacidad inicial del degradado (final = 0)
LIGHTNESS_VARIATION = 0.08    # variación aleatoria de luminosidad de cada tono
MIX_WITH_OTHER = (0.0, 0.45)  # cuánto se mezcla cada tono con el otro color del par

# ============================================================================
# Geometría
# ============================================================================
W, H = WIDTH, HEIGHT
MA, MB, MC, MD = 0.83205031, 0.55470018, -0.83205031, 0.55470018
MATRIX = f"matrix({MA},{MB},{MC},{MD},0,0)"
DET = MA * MD - MB * MC


def to_local(px, py):
    """Pantalla -> coordenadas locales del rect (inversa de la matriz)."""
    return (MD * px - MC * py) / DET, (-MB * px + MA * py) / DET


def clip_poly(poly, keep, cut):
    out = []
    for i, p in enumerate(poly):
        q = poly[(i + 1) % len(poly)]
        kp, kq = keep(p), keep(q)
        if kp:
            out.append(p)
        if kp != kq:
            out.append(cut(p, q))
    return out


def x_extent(poly, y0, y1):
    """Extensión en x del polígono recortado a la banda y0 <= y <= y1."""
    def cut_y(yv):
        return lambda p, q: (p[0] + (yv - p[1]) / (q[1] - p[1]) * (q[0] - p[0]), yv)

    res = clip_poly(poly, lambda p: p[1] >= y0, cut_y(y0))
    if res:
        res = clip_poly(res, lambda p: p[1] <= y1, cut_y(y1))
    if not res:
        return None
    xs = [p[0] for p in res]
    return min(xs), max(xs)


def random_weights(rng, k, lo=0.4, hi=1.9):
    w = [rng.uniform(lo, hi) for _ in range(k)]
    s = sum(w)
    return [v / s for v in w]


def build_layout(rng):
    """
    Devuelve N_RECTS rectángulos (x, y, w, h) en coordenadas locales que cubren
    el lienzo. El lienzo en espacio local es un rectángulo girado 45°: se divide
    en bandas horizontales, cada banda en piezas, y después se expande y desplaza
    cada borde al azar (solape + jitter).
    """
    poly = [to_local(*p) for p in ((0, 0), (W, 0), (W, H), (0, H))]
    ymin = min(p[1] for p in poly)
    ymax = max(p[1] for p in poly)

    k = rng.choice([2, 3, 3, 3, 4])
    counts = [1] * k
    for _ in range(N_RECTS - k):
        counts[rng.randrange(k)] += 1
    rng.shuffle(counts)

    pad = RADIUS + 2  # margen para que los bordes exteriores salgan del lienzo
    heights = random_weights(rng, k)
    rects, y = [], ymin
    for i in range(k):
        y0 = y
        y1 = ymax if i == k - 1 else y + heights[i] * (ymax - ymin)
        y = y1
        ext = x_extent(poly, y0, y1)
        if ext is None:
            return None
        xa, xb = ext[0] - pad, ext[1] + pad
        ya = y0 - (pad if i == 0 else 0)
        yb = y1 + (pad if i == k - 1 else 0)

        widths = random_weights(rng, counts[i])
        x = xa
        for j, wf in enumerate(widths):
            x0 = x
            x1 = xb if j == len(widths) - 1 else x + wf * (xb - xa)
            x = x1
            rects.append((x0, ya, x1 - x0, yb - ya))

    if any(w < MIN_SIZE or h < MIN_SIZE for _, _, w, h in rects):
        return None

    lo, hi = OVERLAP
    grown = []
    for x, yy, w, h in rects:
        l, r, t, b = (rng.uniform(lo, hi) + rng.uniform(-JITTER, JITTER) for _ in range(4))
        nx, ny = x - l, yy - t
        nw, nh = w + l + r, h + t + b
        if nw < MIN_SIZE or nh < MIN_SIZE:
            return None
        grown.append((nx, ny, nw, nh))
    rng.shuffle(grown)  # orden de dibujo aleatorio -> distinto apilado
    return grown


def inside_rounded(px, py, rect):
    x, y, w, h = rect
    if not (x <= px <= x + w and y <= py <= y + h):
        return False
    cx = min(max(px, x + RADIUS), x + w - RADIUS)
    cy = min(max(py, y + RADIUS), y + h - RADIUS)
    return math.hypot(px - cx, py - cy) <= RADIUS


def coverage(rects, nx=120, ny=85):
    hit = 0
    for i in range(nx):
        for j in range(ny):
            lx, ly = to_local((i + 0.5) * W / nx, (j + 0.5) * H / ny)
            if any(inside_rounded(lx, ly, r) for r in rects):
                hit += 1
    return hit / (nx * ny)


def make_layout(rng):
    for _ in range(3000):
        rects = build_layout(rng)
        if rects and len(rects) == N_RECTS and coverage(rects) >= MIN_COVERAGE:
            return rects
    raise RuntimeError("No se pudo generar una composición válida; "
                       "reduce JITTER o aumenta OVERLAP")


# ============================================================================
# Color
# ============================================================================
def hex_to_rgb(h):
    h = h.lstrip("#")
    return tuple(int(h[i:i + 2], 16) / 255 for i in (0, 2, 4))


def rgb_to_hex(c):
    return "#%02X%02X%02X" % tuple(round(max(0, min(1, v)) * 255) for v in c)


def mix(a, b, t):
    return tuple(x + (y - x) * t for x, y in zip(a, b))


def vary_lightness(c, rng):
    h, l, s = colorsys.rgb_to_hls(*c)
    l = max(0.08, min(0.92, l + rng.uniform(-LIGHTNESS_VARIATION, LIGHTNESS_VARIATION)))
    return colorsys.hls_to_rgb(h, l, s)


def make_gradient(idx, c1, c2, rng):
    """Degradado de un tono (derivado de c1/c2) hasta transparencia."""
    base, other = (c1, c2) if rng.random() < 0.5 else (c2, c1)
    start = vary_lightness(mix(base, other, rng.uniform(*MIX_WITH_OTHER)), rng)
    end = vary_lightness(mix(start, other, 0.5), rng)

    ang = math.radians(rng.choice(range(0, 360, 45)) + rng.uniform(-15, 15))
    dx, dy = math.cos(ang) / 2, math.sin(ang) / 2
    o_start = rng.uniform(*OPACITY_START)
    return (
        f'<linearGradient id="g{idx}" x1="{0.5 - dx:.3f}" y1="{0.5 - dy:.3f}" '
        f'x2="{0.5 + dx:.3f}" y2="{0.5 + dy:.3f}">'
        f'<stop offset="0" stop-color="{rgb_to_hex(start)}" stop-opacity="{o_start:.2f}"/>'
        f'<stop offset="1" stop-color="{rgb_to_hex(end)}" stop-opacity="0"/>'
        f"</linearGradient>"
    )


# ============================================================================
# SVG
# ============================================================================
def build_svg(seed, c1_hex, c2_hex):
    rng = random.Random(seed)
    c1, c2 = hex_to_rgb(c1_hex), hex_to_rgb(c2_hex)
    rects = make_layout(rng)

    defs, shapes = [], []
    for i, (x, y, w, h) in enumerate(rects):
        defs.append(make_gradient(i, c1, c2, rng))
        shapes.append(
            f'<rect x="{x:.2f}" y="{y:.2f}" width="{w:.2f}" height="{h:.2f}" '
            f'rx="{RADIUS:g}" ry="{RADIUS * RY_RATIO:g}" '
            f'transform="{MATRIX}" fill="url(#g{i})"/>'
        )

    if BACKGROUND == "none":
        bg_rect = ""
    else:
        if BACKGROUND == "auto":
            bg_hex = rgb_to_hex(mix(mix(c1, c2, 0.5), (1, 1, 1), 0.9))
        else:
            bg_hex = BACKGROUND
        bg_rect = f'<rect width="{W}" height="{H}" fill="{bg_hex}"/>\n  '

    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" '
        f'viewBox="0 0 {W} {H}">\n'
        f"  <defs>\n    " + "\n    ".join(defs) + "\n  </defs>\n"
        f"  {bg_rect}" + "\n  ".join(shapes) + "\n</svg>\n"
    )


def main():
    out = Path(OUTPUT_DIR)
    out.mkdir(parents=True, exist_ok=True)
    base_seed = SEED if SEED is not None else random.randrange(10**6)

    for i, (c1, c2) in enumerate(COLOR_PAIRS):
        seed = base_seed + i
        svg = build_svg(seed, c1, c2)
        name = f"fondo_{i + 1:02d}_{c1.lstrip('#')}-{c2.lstrip('#')}.svg"
        (out / name).write_text(svg, encoding="utf-8")
        print(f"{out / name}  (seed {seed})")


if __name__ == "__main__":
    main()