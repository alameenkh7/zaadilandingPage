#!/usr/bin/env python3
"""Generate crawler-friendly static HTML legal pages in public/."""

import html
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PRIVACY_TS = ROOT / "src/content/privacyPolicy.ts"
TERMS_TS = ROOT / "src/content/termsOfService.ts"
PUBLIC = ROOT / "public"

PROFILE_ITEMS = [
    "Rate Your Meals",
    "Meal History",
    "Billing & Wallet",
    "Refer Friends",
    "Delivery Location",
]

DELETION_STEPS = [
    "Open the Platio app and sign in.",
    "Tap Profile (bottom tab).",
    f"Scroll past {', '.join(PROFILE_ITEMS)}.",
    "In the Account section, directly above Sign out, tap Delete account.",
    "Confirm in the dialog. Your account is deleted immediately and you are signed out.",
]


def rich_text(text: str) -> str:
    text = text.replace("[Privacy Policy]", "§PRIVACY§")
    text = html.escape(text)
    text = re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", text)
    text = text.replace(
        "support@PlatioKitchen.com",
        '<a href="mailto:support@PlatioKitchen.com" class="legal-inline-link">support@PlatioKitchen.com</a>',
    )
    text = text.replace(
        "§PRIVACY§",
        '<a href="/privacy-policy.html" class="legal-inline-link">Privacy Policy</a>',
    )
    return text


def load_blocks(path: Path) -> list:
    raw = path.read_text(encoding="utf-8")
    match = re.search(r"export const blocks: LegalBlock\[\] = (\[[\s\S]*\]);", raw)
    if not match:
        raise SystemExit(f"Could not parse blocks from {path}")
    return json.loads(match.group(1))


def render_blocks(blocks: list) -> str:
    parts: list[str] = []
    for block in blocks:
        kind = block["type"]
        if kind == "h2":
            parts.append(f"<h2>{rich_text(block['text'])}</h2>")
        elif kind == "h3":
            parts.append(f"<h3>{rich_text(block['text'])}</h3>")
        elif kind == "p":
            parts.append(f"<p>{rich_text(block['text'])}</p>")
        elif kind == "ul":
            items = "".join(f"<li>{rich_text(item)}</li>" for item in block["items"])
            parts.append(f"<ul>{items}</ul>")
        elif kind == "address":
            inner = "<br>".join(rich_text(line).replace("\n", "<br>") for line in block["lines"])
            parts.append(f'<address class="legal-address">{inner}</address>')
    return "\n".join(parts)


def shell(title: str, body: str) -> str:
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{html.escape(title)}</title>
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="stylesheet" href="/legal.css" />
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
      {body}
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
          <p class="footer-hint">Delete your account in the app: Profile → Account → Delete account (above Sign out).</p>
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


def terms_html() -> str:
    blocks = load_blocks(TERMS_TS)
    article = f"""<article class="legal-content">
        <h1>Terms and Conditions of Use – Platio</h1>
        <p class="legal-meta">Last updated: September 17, 2026</p>
        {render_blocks(blocks)}
      </article>"""
    return shell("Terms and Conditions of Use – Platio", article)


def privacy_html() -> str:
    blocks = load_blocks(PRIVACY_TS)
    article = f"""<article class="legal-content">
        <h1>Privacy Policy – Platio</h1>
        <p class="legal-meta">Last updated: September 17, 2026</p>
        {render_blocks(blocks)}
      </article>"""
    return shell("Privacy Policy – Platio", article)


def account_deletion_html() -> str:
    steps = "".join(f"<li>{html.escape(step)}</li>" for step in DELETION_STEPS)
    profile_chain = " → ".join(PROFILE_ITEMS)
    article = f"""<article class="legal-content">
        <h1>Delete your Platio account</h1>
        <p class="legal-meta">This page explains how account deletion works for Google Play and your reference. You cannot delete your account on this website — deletion is available only in the Platio mobile app.</p>
        <div class="legal-callout"><strong>Delete in the app:</strong> Profile → Account → Delete account (above Sign out).</div>
        <h2>How to delete your account in the app</h2>
        <ol class="deletion-steps">{steps}</ol>
        <h2>Profile screen order</h2>
        <p>On Profile, settings appear in this order: {html.escape(profile_chain)} → <strong>Account</strong> (includes <strong>Delete account</strong>) → <strong>Sign out</strong> as a separate action below. Signing out only ends your session; it does not delete your account.</p>
        <h2>What happens when you delete</h2>
        <p>After you confirm deletion in the app, your Platio account is removed immediately, you are signed out, and you will need a new account to use Platio again. Any active subscription or scheduled meals tied to that account will not continue.</p>
        <h2>Data removed vs data we may keep</h2>
        <h3>Removed or deactivated</h3>
        <ul>
          <li>Profile and contact information (name, email, mobile number, profile photo).</li>
          <li>Login credentials and active app sessions.</li>
          <li>Saved delivery location and in-app meal preferences tied to your account.</li>
          <li>Active subscription enrollment in the app.</li>
          <li>Push notification registrations and marketing opt-in preferences for that account.</li>
          <li>Voluntary dietary or allergen preferences stored on your profile.</li>
        </ul>
        <h3>Retained as required by law or for legitimate business needs</h3>
        <ul>
          <li>Order, invoice, and payment transaction records for tax (ZATCA), accounting, and commercial record-keeping.</li>
          <li>Masked or tokenized payment references held by our payment providers (we do not store full card numbers).</li>
          <li>Food-safety and traceability records linked to orders you placed (SFDA).</li>
          <li>Information needed to resolve disputes, chargebacks, fraud prevention, or legal claims.</li>
          <li>Aggregated or de-identified data that cannot reasonably identify you.</li>
        </ul>
        <p>For more detail, see our <a href="/privacy-policy.html" class="legal-inline-link">Privacy Policy</a>.</p>
        <h2>Need help?</h2>
        <p>If you cannot access the app, contact us at <a href="mailto:support@PlatioKitchen.com" class="legal-inline-link">support@PlatioKitchen.com</a> from the email address on your account.</p>
      </article>"""
    return shell("Delete your Platio account", article)


def main() -> None:
    PUBLIC.mkdir(parents=True, exist_ok=True)
    (PUBLIC / "privacy-policy.html").write_text(privacy_html(), encoding="utf-8")
    (PUBLIC / "terms.html").write_text(terms_html(), encoding="utf-8")
    (PUBLIC / "account-deletion.html").write_text(account_deletion_html(), encoding="utf-8")
    print("Wrote public/privacy-policy.html, public/terms.html, public/account-deletion.html")


if __name__ == "__main__":
    main()
