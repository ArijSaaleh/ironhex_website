"""
Simple script to convert `client/public/logo_icon.png` into `client/public/favicon.ico`.
Requires Pillow (PIL).

Usage:
  python tools/generate_favicon.py

This creates `client/public/favicon.ico` with multiple sizes (16,32,48,64,128,256).
"""
from PIL import Image
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[1]
SRC = PROJECT_ROOT / 'client' / 'public' / 'logo_icon.png'
DST = PROJECT_ROOT / 'client' / 'public' / 'favicon.ico'

if not SRC.exists():
    print(f"Source image not found: {SRC}")
    raise SystemExit(1)

img = Image.open(SRC).convert('RGBA')
# Ensure square by padding transparent background if needed
size = max(img.width, img.height)
if img.width != img.height:
    new = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    new.paste(img, ((size - img.width) // 2, (size - img.height) // 2))
    img = new

sizes = [(16,16),(32,32),(48,48),(64,64),(128,128),(256,256)]
# Pillow expects a list of (width,height) tuples for the `sizes` parameter
img.save(DST, format='ICO', sizes=sizes)
print(f"Saved favicon: {DST}")
