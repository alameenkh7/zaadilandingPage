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
            <Link to="/terms">Terms of Service</Link>
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/account-deletion">Delete account</Link>
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
