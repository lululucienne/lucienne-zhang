#!/usr/bin/env python3
"""Fix PPT text colors and rebuild slide 11 layout from slide 10 template."""
import io
import re
import shutil
import zipfile
from copy import deepcopy
from xml.etree import ElementTree as ET

NS = {
    "a": "http://schemas.openxmlformats.org/drawingml/2006/main",
    "p": "http://schemas.openxmlformats.org/presentationml/2006/main",
    "r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
}

DARK = "1E4E79"
PPT = "/Users/lulu/Downloads/Business_Statistics_Post_Midterm_Review.pptx"
OUT = "/Users/lulu/Downloads/Business_Statistics_Post_Midterm_Review_FIXED.pptx"


def qn(tag):
    prefix, name = tag.split(":")
    return f"{{{NS[prefix]}}}{name}"


def ensure_dark_text(root):
    for defRPr in root.iter(qn("a:defRPr")):
        if defRPr.find(qn("a:solidFill")) is None:
            solid = ET.SubElement(defRPr, qn("a:solidFill"))
            srgb = ET.SubElement(solid, qn("a:srgbClr"))
            srgb.set("val", DARK)


def set_text_in_shape(sp, lines):
    tx = sp.find(qn("p:txBody"))
    if tx is None:
        return
    paras = tx.findall(qn("a:p"))
    for i, line in enumerate(lines):
        if i < len(paras):
            p = paras[i]
        else:
            p = ET.SubElement(tx, qn("a:p"))
            pPr = ET.SubElement(p, qn("a:pPr"))
            defRPr = ET.SubElement(pPr, qn("a:defRPr"))
            ET.SubElement(p, qn("a:r"))
        pPr = p.find(qn("a:pPr"))
        if pPr is None:
            pPr = ET.SubElement(p, qn("a:pPr"))
        defRPr = pPr.find(qn("a:defRPr"))
        if defRPr is None:
            defRPr = ET.SubElement(pPr, qn("a:defRPr"))
        solid = defRPr.find(qn("a:solidFill"))
        if solid is None:
            solid = ET.SubElement(defRPr, qn("a:solidFill"))
        else:
            for child in list(solid):
                solid.remove(child)
        srgb = ET.SubElement(solid, qn("a:srgbClr"))
        srgb.set("val", DARK)
        if i == 0 or line.startswith("•") is False and line in {
            "Tutorial Videos on Slate",
            "In-Person Tutorial = Q&A Only",
            "Don't Lose Easy Marks",
        }:
            defRPr.set("b", "1")
        r = p.find(qn("a:r"))
        if r is None:
            r = ET.SubElement(p, qn("a:r"))
        t = r.find(qn("a:t"))
        if t is None:
            t = ET.SubElement(r, qn("a:t"))
        t.text = line
        pPr.set("lvl", "0" if i == 0 or line in {
            "Tutorial Videos on Slate",
            "In-Person Tutorial = Q&A Only",
        } else "1")
    for j in range(len(lines), len(paras)):
        t = paras[j].find(".//" + qn("a:t"))
        if t is not None:
            t.text = ""


def text_shapes(root):
    shapes = []
    for sp in root.findall(".//" + qn("p:sp")):
        if sp.find(qn("p:txBody")) is not None:
            shapes.append(sp)
    return shapes


def main():
    with zipfile.ZipFile(PPT, "r") as zin:
        entries = {name: zin.read(name) for name in zin.namelist()}

    slide10 = ET.fromstring(entries["ppt/slides/slide10.xml"])
    slide11_new = deepcopy(slide10)

    s11_shapes = text_shapes(slide11_new)
    if len(s11_shapes) >= 2:
        set_text_in_shape(s11_shapes[0], ["📢 Tutorial Update — Going Forward"])
        set_text_in_shape(
            s11_shapes[1],
            [
                "Tutorial Videos on Slate",
                "• Step-by-step videos posted on Slate",
                "• Watch videos before coming to tutorial",
                "• Covers Ch 1–7 examples & Excel tips",
                "In-Person Tutorial = Q&A Only",
                "• Offline time for Questions & Answers",
                "• Bring specific questions from videos/homework",
                "• We clarify concepts — not re-teach the lesson",
            ],
        )

    entries["ppt/slides/slide11.xml"] = ET.tostring(
        slide11_new, encoding="utf-8", xml_declaration=True
    )

    for name, data in list(entries.items()):
        if re.match(r"ppt/slides/slide\d+\.xml", name):
            root = ET.fromstring(data)
            ensure_dark_text(root)
            entries[name] = ET.tostring(root, encoding="utf-8", xml_declaration=True)

    with zipfile.ZipFile(OUT, "w", zipfile.ZIP_DEFLATED) as zout:
        for name, data in entries.items():
            zout.writestr(name, data)

    shutil.copy(OUT, PPT)
    print(f"Fixed and saved: {PPT}")


if __name__ == "__main__":
    main()
