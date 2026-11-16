import { useState } from 'react';
import { Link } from 'react-router-dom';
import { goHomeFromHash } from '../hashRouting';

const links = [
  { href: '#menu', label: 'Menu' },
  { href: '#why', label: 'Why Platio' },
  { href: '#how', label: 'How it works' },
  { href: '#plans', label: 'Plans' },
  { href: '#refer', label: 'Refer & earn' },
  { href: '#faq', label: 'FAQ' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header>
      <div className="wrap nav">
        <Link to="/" className="logo" aria-label="Platio" onClick={goHomeFromHash}>
          platio<i>.</i>
        </Link>
        <button
          type="button"
          className="nav-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? '×' : '☰'}
        </button>
        <ul className={open ? 'nav-open' : ''}>
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a href="#download" className="btn btn-ink nav-cta" onClick={() => setOpen(false)}>
          Get the app
        </a>
      </div>
    </header>
  );
}