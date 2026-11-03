#!/usr/bin/env python3
"""Create missing WebP copies of raster assets, preserving originals (requires Pillow)."""
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]


def main():
    sources = sorted(p for p in (ROOT / '_assets').rglob('*')
                     if p.suffix.lower() in {'.png', '.jpg', '.jpeg'})
    total_source = total_webp = created = 0
    for source in sources:
        target = source.with_suffix('.webp')
        if target.exists():
            with Image.open(source) as original, Image.open(target) as existing:
                if ImageOps.exif_transpose(original).size != existing.size:
                    # Preserve pre-existing variants with different dimensions.
                    target = source.with_name(source.name + '.webp')
        if not target.exists():
            with Image.open(source) as image:
                image = ImageOps.exif_transpose(image)
                image = image.convert('RGBA' if 'A' in image.getbands() or 'transparency' in image.info else 'RGB')
                image.save(target, 'WEBP', quality=88, method=6)
            created += 1
        with Image.open(source) as original, Image.open(target) as converted:
            assert ImageOps.exif_transpose(original).size == converted.size, source
            assert converted.format == 'WEBP', target
        total_source += source.stat().st_size
        total_webp += target.stat().st_size
    print(f'{len(sources)} images verified; {created} WebP files created.')
    print(f'{total_source:,} original bytes -> {total_webp:,} WebP bytes '
          f'({100 * (1 - total_webp / total_source):.1f}% smaller). Originals preserved.')


if __name__ == '__main__':
    main()
