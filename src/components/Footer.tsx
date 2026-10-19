import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" className="logo"><span className="logo-mark"><span>P</span></span>Platio</Link>
            <p>Fresh, balanced lunch delivered to your office — every weekday, without any effort.</p>
          </div>
          <div className="footer-col">
            <h4>Explore</h4>
            <a href="/#how">How It Works</a>
            <a href="/#menu">Menu</a>
            <a href="/#pricing">Pricing</a>
            <a href="/#coverage">Coverage</a>
          </div>
          <div className="footer-col">
            <h4>Business</h4>
            <a href="/#companies">For Companies</a>
            <a href="#">Careers</a>
            <a href="#">Contact</a>
          </div>
          <div className="footer-col">
            <h4>Legal</h4>
            <a href="/terms.html">Terms of Service</a>
            <a href="/privacy-policy.html">Privacy Policy</a>
            <a href="/account-deletion.html">Delete account</a>
            <p className="footer-hint">
              Delete your account in the app: Profile → Account → Delete account (above Sign out).
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Platio. All rights reserved.</span>
          <span>Riyadh, Saudi Arabia</span>
        </div>
      </div>
    </footer>
  );
}
