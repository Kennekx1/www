import sys
from PIL import Image
import os

def img_to_braille(img_path, width=80):
    try:
        img = Image.open(img_path).convert('L')
        w, h = img.size
        height = int((h / w) * width * 0.5)
        img = img.resize((width, height))
        pixels = img.load()
        
        braille = []
        for y in range(0, height - 3, 4):
            line = []
            for x in range(0, width - 1, 2):
                byte = 0
                if pixels[x, y] > 128: byte |= 1
                if pixels[x, y+1] > 128: byte |= 2
                if pixels[x, y+2] > 128: byte |= 4
                if pixels[x+1, y] > 128: byte |= 8
                if pixels[x+1, y+1] > 128: byte |= 16
                if pixels[x+1, y+2] > 128: byte |= 32
                if pixels[x, y+3] > 128: byte |= 64
                if pixels[x+1, y+3] > 128: byte |= 128
                line.append(chr(0x2800 + byte))
            braille.append("".join(line))
        return "\n".join(braille)
    except Exception as e:
        return str(e)

for i in range(1, 8):
    fname = f"public/assets/images/banners/page-{i:02d}.jpg"
    print(f"--- {fname} ---")
    print(img_to_braille(fname, 60))
