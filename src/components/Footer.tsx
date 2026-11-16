export default function Footer() {
  return (
    <footer>
      <div className="wrap footer-main">
        <div className="footer-brand-row">
          <span className="logo">
            platio<i style={{ color: 'var(--red)', fontStyle: 'normal' }}>.</i>
          </span>
          <span>© 2026 Platio Kitchen · Riyadh, Saudi Arabia</span>
        </div>
        <div className="footer-legal">
          <a href="/terms.html">Terms of Service</a>
          <a href="/privacy-policy.html">Privacy Policy</a>
          <a href="/account-deletion.html">Delete account</a>
          <p className="footer-hint">
            Delete your account in the app: Profile → Account → Delete account (above Sign out).
          </p>
        </div>
      </div>
    </footer>
  );
}