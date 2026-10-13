"""Inspect the supplied brochure and owner photos without changing originals."""
from pathlib import Path
import fitz

out = Path("/tmp/ipm-santa-beatriz")
out.mkdir(parents=True, exist_ok=True)
doc = fitz.open("attached_assets/0_nuevo_1791916660991.pdf")
print(f"BROCHURE: {len(doc)} pages")
sheet = fitz.open()
thumbs = sheet.new_page(width=960, height=((len(doc) + 3) // 4) * 190)
texts = []
for i, page in enumerate(doc):
    text = page.get_text()
    texts.append(f"\n--- PAGE {i + 1} ---\n{text}")
    pix = page.get_pixmap(matrix=fitz.Matrix(0.65, 0.65))
    x, y = (i % 4) * 240, (i // 4) * 190
    thumbs.insert_image(fitz.Rect(x, y, x + 238, y + 166), stream=pix.tobytes("png"))
    thumbs.insert_text((x + 8, y + 182), str(i + 1), fontsize=11)
thumbs.get_pixmap().save(str(out / "brochure-contact.png"))
(out / "brochure-text.txt").write_text("".join(texts))

photos = sorted(Path("attached_assets").glob("*17919167*.JP*"))
photos.insert(0, Path("attached_assets/0_PHOTO-2026-10-14-01-34-38_1791916670042.jpg"))
photo_doc = fitz.open()
photo_sheet = photo_doc.new_page(width=960, height=((len(photos) + 3) // 4) * 230)
for i, path in enumerate(photos):
    x, y = (i % 4) * 240, (i // 4) * 230
    photo_sheet.insert_image(fitz.Rect(x, y, x + 236, y + 205), filename=str(path))
    photo_sheet.insert_text((x + 8, y + 220), f"{i}: {path.name[:28]}", fontsize=8)
    print(f"PHOTO {i}: {path}")
photo_sheet.get_pixmap().save(str(out / "photos-contact.png"))
print("".join(texts))
