#!/usr/bin/env python3
"""Build static B2B / B2C menu HTML pages in public/."""

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"

MENUS = [
    {
        "slug": "b2c",
        "filename": "b2c-menu.html",
        "title": "Platio B2C Menu",
        "subtitle": "Consumer menu — prices in SAR. For the live in-app menu, use the Platio app.",
        "pdf": "/menus/b2c-menu.pdf",
        "pages": 6,
    },
    {
        "slug": "b2b",
        "filename": "b2b-menu.html",
        "title": "Platio B2B Menu",
        "subtitle": "Special order & corporate menu. Contact us to plan office catering.",
        "pdf": "/menus/b2b-menu.pdf",
        "pages": 6,
    },
]


def shell(menu: dict) -> str:
    pages_html = "\n".join(
        f'        <img src="/menus/{menu["slug"]}/page-{i}.png" alt="{menu["title"]} — page {i}" width="800" loading="lazy" />'
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
  <main class="legal-page">
    <div class="wrap">
      <a href="/" class="legal-back">← Back to Platio</a>
      <article class="legal-content menu-content">
        <h1>{menu['title']}</h1>
        <p class="legal-meta">{menu['subtitle']}</p>
        <p class="menu-download">
          <a href="{menu['pdf']}" class="legal-inline-link" download>Download PDF</a>
        </p>
        <div class="menu-pages" aria-label="{menu['title']} pages">
{pages_html}
        </div>
      </article>
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
        out = PUBLIC / menu["filename"]
        out.write_text(shell(menu), encoding="utf-8")
        print("Wrote", out)


if __name__ == "__main__":
    main()