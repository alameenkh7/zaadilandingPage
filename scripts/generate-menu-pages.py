#!/usr/bin/env python3
"""Build static B2B / B2C menu HTML pages in public/."""

import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
MENUS_DIR = PUBLIC / "menus"

MENUS = [
    {
        "slug": "b2c",
        "filename": "b2c-menu.html",
        "title": "Platio B2C Menu",
        "subtitle": "Consumer menu — prices in SAR. For the live in-app menu, use the Platio app.",
        "pdf": "/menus/b2c-menu.pdf",
        "source_pdf": PUBLIC / "menus" / "b2c-menu.pdf",
        "dpi": 200,
        "pages": 6,
    },
    {
        "slug": "b2b",
        "filename": "b2b-menu.html",
        "title": "Platio B2B Menu",
        "subtitle": "Special order & corporate menu. Contact us to plan office catering.",
        "pdf": "/menus/b2b-menu.pdf",
        "source_pdf": PUBLIC / "menus" / "b2b-menu.pdf",
        "dpi": 160,
        "pages": 6,
    },
]


def render_pngs(menu: dict) -> None:
    pdf = menu["source_pdf"]
    if not pdf.is_file():
        print(f"Skip PNG render — missing {pdf}", file=sys.stderr)
        return
    out_dir = MENUS_DIR / menu["slug"]
    out_dir.mkdir(parents=True, exist_ok=True)
    prefix = str(out_dir / "page")
    cmd = [
        "pdftoppm",
        "-png",
        "-cropbox",
        "-r",
        str(menu["dpi"]),
        str(pdf),
        prefix,
    ]
    subprocess.run(cmd, check=True)
    print(f"Rendered PDF pages → {out_dir}/")


def shell(menu: dict) -> str:
    pages_html = "\n".join(
        f'          <img src="/menus/{menu["slug"]}/page-{i}.png" alt="{menu["title"]} — page {i}" loading="lazy" decoding="async" />'
        for i in range(1, menu["pages"] + 1)
    )
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{menu['title']}</title>
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="stylesheet" href="/legal.css" />
  <link rel="stylesheet" href="/menu.css" />
</head>
<body>
  <nav>
    <div class="wrap">
      <a href="/" class="logo"><span class="logo-mark">P</span> Platio</a>
    </div>
  </nav>
  <main class="menu-page">
    <div class="wrap">
      <a href="/" class="legal-back">← Back to Platio</a>
      <div class="menu-document">
        <h1>{menu['title']}</h1>
        <p class="menu-intro">{menu['subtitle']}</p>
        <div class="menu-actions">
          <a href="{menu['pdf']}" class="legal-inline-link" target="_blank" rel="noopener">Open PDF</a>
          <a href="{menu['pdf']}" class="legal-inline-link" download>Download PDF</a>
        </div>
        <div class="menu-pdf-wrap">
          <embed class="menu-pdf-embed" src="{menu['pdf']}#view=FitH" type="application/pdf" title="{menu['title']} PDF" />
        </div>
        <p class="menu-pages-label">Menu pages (images)</p>
        <div class="menu-pages" aria-label="{menu['title']} pages">
{pages_html}
        </div>
      </div>
    </div>
  </main>
  <footer>
    <div class="wrap">
      <div class="footer-top">
        <div class="footer-brand">
          <a href="/" class="logo"><span class="logo-mark">P</span> Platio</a>
          <p>Fresh, balanced lunch delivered to your office — every weekday, without any effort.</p>
        </div>
        <div class="footer-col">
          <h4>Legal</h4>
          <a href="/terms.html">Terms of Service</a>
          <a href="/privacy-policy.html">Privacy Policy</a>
          <a href="/account-deletion.html">Delete account</a>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2026 Platio. All rights reserved.</span>
        <span>Riyadh, Saudi Arabia</span>
      </div>
    </div>
  </footer>
</body>
</html>
"""


def main() -> None:
    for menu in MENUS:
        try:
            render_pngs(menu)
        except (subprocess.CalledProcessError, FileNotFoundError) as e:
            print(f"PNG render failed for {menu['slug']}: {e}", file=sys.stderr)
        out = PUBLIC / menu["filename"]
        out.write_text(shell(menu), encoding="utf-8")
        print("Wrote", out)


if __name__ == "__main__":
    main()