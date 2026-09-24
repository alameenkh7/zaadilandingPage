import { Link } from 'react-router-dom';
import { goHomeFromHash } from '../hashRouting';

export default function Navbar() {
  return (
    <nav>
      <div className="wrap">
        <Link to="/" className="logo" onClick={goHomeFromHash}>
          <span className="logo-mark"><span>P</span></span>
          Platio
        </Link>
        <div className="nav-links">
          <a href="/#how">How It Works</a>
          <a href="/#menu">Menu</a>
          <a href="/#pricing">Pricing</a>
          <a href="/#coverage">Coverage</a>
          <a href="/#companies">For Companies</a>
        </div>
        <a href="/#get-app" className="nav-cta">Download the App</a>
      </div>
    </nav>
  );
}
