"""Create small web assets from client-supplied sources; retain the originals."""
from pathlib import Path
import subprocess
import fitz

out = Path("public/images/santa-beatriz")
out.mkdir(parents=True, exist_ok=True)
tmp = Path("/tmp/ipm-santa-beatriz")
doc = fitz.open("attached_assets/0_nuevo_1791916660991.pdf")
crops = {
    "exterior-reference": (0, (0, 20, 555, 820)),
    "location-brochure": (5, (420, 80, 980, 725)),
    "pool-reference": (8, (0, 275, 992, 610)),
    "gym-reference": (12, (0, 275, 992, 610)),
    "living-concept": (17, (0, 275, 992, 610)),
    "bedroom-concept": (19, (0, 275, 992, 610)),
    "study-concept": (22, (0, 275, 992, 610)),
    "floor-plan-5a": (31, (365, 235, 940, 690)),
}
def webp(source, name):
    subprocess.run(["ffmpeg", "-hide_banner", "-loglevel", "error", "-y",
                    "-i", str(source), "-vf", "scale='min(1200,iw)':-2",
                    "-frames:v", "1", "-quality", "82", str(out / f"{name}.webp")],
                   check=True)
for name, (page, rect) in crops.items():
    png = tmp / f"{name}.png"
    doc[page].get_pixmap(matrix=fitz.Matrix(1.5, 1.5), clip=fitz.Rect(rect)).save(str(png))
    webp(png, name)
names = ["kitchen-counter", "bathroom-shower", "living-current", "entry",
         "kitchen-current", "bathroom-current", "living-window", "kitchen-equipped", "kitchen-bar"]
photos = sorted(Path("attached_assets").glob("*17919167*.JP*"))
for path, name in zip(photos, names):
    webp(path, name)
print(f"Prepared {len(list(out.glob('*.webp')))} web images: "
      f"{sum(p.stat().st_size for p in out.glob('*.webp')) // 1024} KB total")
