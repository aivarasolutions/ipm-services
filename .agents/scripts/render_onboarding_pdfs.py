from pathlib import Path

import pymupdf


OUTPUT = Path(".agents/outputs")
FILES = [
    Path("attached_assets/IPM_Client_Onboarding_English_1788987830124.pdf"),
    Path("attached_assets/IPM_Incorporacion_Cliente_Espanol_1788987830134.pdf"),
]

for source in FILES:
    document = pymupdf.open(source)
    for index, page in enumerate(document):
        pixmap = page.get_pixmap(matrix=pymupdf.Matrix(2, 2), alpha=False)
        pixmap.save(OUTPUT / f"{source.stem}-page-{index + 1}.png")
    print(f"{source.name}: {document.page_count} page(s), {document[0].rect}")