"""
Generate a 1200x630 OG image from client/public/logo.png.
Places the logo centered on a white background and saves as client/public/og_image.png
Requires Pillow already installed.
Usage:
  python tools/generate_og_image.py
"""
from PIL import Image
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / 'client' / 'public' / 'logo.png'
DST = ROOT / 'client' / 'public' / 'og_image.png'

if not SRC.exists():
    print('Source logo not found:', SRC)
    raise SystemExit(1)

canvas_w, canvas_h = 1200, 630
img = Image.open(SRC).convert('RGBA')
# scale logo to fit inside 520x520 box
max_logo = 520
ratio = min(max_logo / img.width, max_logo / img.height, 1.0)
new_size = (int(img.width * ratio), int(img.height * ratio))
logo = img.resize(new_size, Image.LANCZOS)

canvas = Image.new('RGBA', (canvas_w, canvas_h), (255,255,255,255))
logo_x = (canvas_w - logo.width) // 2
logo_y = (canvas_h - logo.height) // 2
canvas.paste(logo, (logo_x, logo_y), logo)

canvas.save(DST, format='PNG')
print('Saved OG image to', DST)
