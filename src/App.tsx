import React, { useState } from 'react';
import menuData from './menu.json';

function Navbar() {
  return (
    <nav>
      <div className="wrap">
        <a href="#" className="logo">
          <span className="logo-mark"><span>P</span></span>
          Platio
        </a>
        <div className="nav-links">
          <a href="#how">How It Works</a>
          <a href="#menu">Menu</a>
          <a href="#pricing">Pricing</a>
          <a href="#coverage">Coverage</a>
          <a href="#companies">For Companies</a>
        </div>
        <a href="#get-app" className="nav-cta">Download the App</a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <header className="hero">
      <div className="wrap">
        <div>
          <div className="hero-eyebrow">
            <span className="dots"><span></span><span></span><span></span></span>
            Fresh · Balanced · On Time
          </div>
          <h1>Never think<br/>about lunch <em>again.</em></h1>
          <p className="lede">Cooked this morning. Delivered to your office — every weekday, right on time. One subscription, and lunch is off your plate.</p>
          <div className="hero-ctas">
            <a href="#get-app" className="btn btn-primary">Download the App</a>
            <a href="#menu" className="btn btn-ghost">See This Week's Menu</a>
          </div>
          <div className="store-badges">
            <a href="#" className="store-badge" aria-label="Download on the App Store">
              <svg viewBox="0 0 24 24" fill="white"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.08zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
              <span className="badge-text"><small>Download on the</small><strong>App Store</strong></span>
            </a>
            <a href="#" className="store-badge" aria-label="Get it on Google Play">
              <svg viewBox="0 0 24 24" fill="white"><path d="M3.6 2.6c-.4.3-.6.8-.6 1.4v16c0 .6.2 1.1.6 1.4l.3.2 9-9v-.2l-9-9-.3.2zm11.9 9.9l2.9-2.9-9.7-5.6 6.8 8.5zm-6.8 8.5l9.7-5.6-2.9-2.9-6.8 8.5zm11.3-6.5c.7-.4.7-1.4 0-1.8l-2.6-1.5-3 3 3 3 2.6-1.7z"/></svg>
              <span className="badge-text"><small>Get it on</small><strong>Google Play</strong></span>
            </a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="plate">
            <div className="plate-inner"></div>
          </div>
          <div className="runway-dot" style={{top: '8%', left: '8%'}}></div>
          <div className="runway-dot" style={{bottom: '10%', right: '10%', width: 10, height: 10}}></div>
        </div>
      </div>
      <div className="wrap">
        <div className="also-on">
          <span className="also-on-label">Also available on</span>
          <div className="also-on-logos">
            <span className="platform-chip">Keeta</span>
            <span className="platform-chip">noon food</span>
            <span className="platform-chip">HungerStation</span>
          </div>
        </div>
      </div>
    </header>
  );
}

function HowItWorks() {
  return (
    <section className="section" id="how">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">How It Works</span>
          <h2>Office lunch, handled.</h2>
          <p>Four steps between you and a desk that never has to ask "what's for lunch" again.</p>
        </div>
        <div className="steps">
          <div className="step">
            <span className="num">01</span>
            <h3>Choose your plan</h3>
            <p>Try It, Weekly, or Monthly — pick the rhythm that fits your workweek.</p>
          </div>
          <div className="step">
            <span className="num">02</span>
            <h3>Pick your meals</h3>
            <p>Select from the weekly menu across Executive and Salad tracks.</p>
          </div>
          <div className="step">
            <span className="num">03</span>
            <h3>We deliver to your office</h3>
            <p>Fresh meals arrive on a consistent daily window, every weekday.</p>
          </div>
          <div className="step">
            <span className="num">04</span>
            <h3>Skip or pause anytime</h3>
            <p>Traveling, in meetings all day, or just not hungry — full control, no penalty.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Coverage() {
  return (
    <section className="section coverage-section" id="coverage">
      <div className="wrap">
        <div className="coverage-inner">
          <div className="coverage-copy">
            <span className="eyebrow">Delivery Coverage</span>
            <h2>Currently delivering<br/>across Riyadh.</h2>
            <p>We're rolling out neighbourhood by neighbourhood. Check the app or the areas below to see if your office is covered.</p>
            <a href="#get-app" className="btn btn-outline-dark">Check Coverage in App</a>
          </div>
          <div className="coverage-areas">
            <div className="area-pill">Olaya</div>
            <div className="area-pill">King Fahd Road</div>
            <div className="area-pill">Al Malaz</div>
            <div className="area-pill">Sahafa</div>
            <div className="area-pill">Hittin</div>
            <div className="area-pill">Nakheel</div>
            <div className="area-pill">Airport Area</div>
            <div className="area-pill">More areas soon</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MenuSection() {
  const [activeTab, setActiveTab] = useState('Executive');
  const filteredMenu = menuData.filter(item => item.track === activeTab);

  return (
    <section className="section menu-section" id="menu">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">This Week's Menu</span>
          <h2>Balanced meals,<br/>consistent quality.</h2>
        </div>
        <div className="track-tabs">
          <button 
            className={`track-tab ${activeTab === 'Executive' ? 'active' : ''}`}
            onClick={() => setActiveTab('Executive')}
          >
            Executive
          </button>
          <button 
            className={`track-tab ${activeTab === 'Salad' ? 'active' : ''}`}
            onClick={() => setActiveTab('Salad')}
          >
            Salad
          </button>
        </div>
        <div className="menu-grid">
          {filteredMenu.map((meal: any) => (
            <div className="menu-card" key={meal.id}>
              <div className="thumb">
                {meal.image && <img src={meal.image} alt={meal.name} className="thumb-img" />}
              </div>
              <div className="body">
                <span className="tag">{meal.track}</span>
                <h3>{meal.name}</h3>
                <p>{meal.description}</p>
                <div className="macros">
                  <div className="macro"><strong>{meal.macros.protein}</strong><span>Protein</span></div>
                  <div className="macro"><strong>{meal.macros.carbs}</strong><span>Carbs</span></div>
                  <div className="macro"><strong>{meal.macros.fat}</strong><span>Fat</span></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section className="section" id="pricing">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Pricing</span>
          <h2>Plans for however<br/>you take lunch.</h2>
        </div>
        <div className="pricing-grid">
          <div className="price-card">
            <h3>Try It</h3>
            <div className="price-sub">No commitment</div>
            <div className="price">SAR 25<span>/meal</span></div>
            <ul>
              <li>Single-day orders</li>
              <li>Full menu access</li>
              <li>Cancel anytime</li>
            </ul>
            <a href="#get-app" className="btn btn-outline-dark">Get the App</a>
          </div>
          <div className="price-card featured">
            <div className="price-badge">Most Popular</div>
            <h3>Week Plan</h3>
            <div className="price-sub">5 workday meals</div>
            <div className="price">SAR 22<span>/meal</span></div>
            <ul>
              <li>Priority delivery window</li>
              <li>Swap meals up to 24h ahead</li>
              <li>Executive & Salad tracks</li>
            </ul>
            <a href="#get-app" className="btn btn-primary">Get the App</a>
          </div>
          <div className="price-card">
            <h3>Month Plan</h3>
            <div className="price-sub">22 workday meals</div>
            <div className="price">SAR 20<span>/meal</span></div>
            <ul>
              <li>Best value per meal</li>
              <li>Free skip days, no penalty</li>
              <li>Dedicated support</li>
            </ul>
            <a href="#get-app" className="btn btn-outline-dark">Get the App</a>
          </div>
        </div>
        <p className="price-note">Pricing shown is illustrative — confirm final figures before launch.</p>
      </div>
    </section>
  );
}

function WhyPlatio() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Why Platio</span>
          <h2>It's not just lunch.<br/>It's one less thing to carry.</h2>
        </div>
        <div className="values-grid">
          <div className="value-cell">
            <span className="vnum">Decision Fatigue</span>
            <h3>Never think about lunch again</h3>
            <p>No more "what should I eat today?" — your meals are already planned and on the way.</p>
          </div>
          <div className="value-cell">
            <span className="vnum">Freshness</span>
            <h3>Cooked this morning</h3>
            <p>Every meal is prepared the same day it's delivered — never frozen, never sitting around.</p>
          </div>
          <div className="value-cell">
            <span className="vnum">Nutrition</span>
            <h3>Balanced, on purpose</h3>
            <p>Every plate is built around the right mix of protein, carbs, and fat.</p>
          </div>
          <div className="value-cell">
            <span className="vnum">Mornings</span>
            <h3>We give you back your morning</h3>
            <p>No early alarm to pack a lunchbox. Sleep in — we've got today's lunch covered.</p>
          </div>
          <div className="value-cell">
            <span className="vnum">Timing</span>
            <h3>Every weekday. Right on time</h3>
            <p>A consistent delivery window at your office — no waiting, no guessing.</p>
          </div>
          <div className="value-cell">
            <span className="vnum">Quality</span>
            <h3>Your neighbourhood kitchen</h3>
            <p>Homestyle cooking with consistent quality, not a rotating cast of random vendors.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function AppDownload() {
  return (
    <section className="section" id="get-app">
      <div className="app-section">
        <span className="eyebrow">Get The App</span>
        <h2>Subscribe. Skip. Track your delivery.<br/>All from the Platio app.</h2>
        <p>Ordering, plan changes, and delivery tracking all happen in the app — the website is just where you get started.</p>
        <div className="store-badges">
          <a href="#" className="store-badge" aria-label="Download on the App Store">
            <svg viewBox="0 0 24 24"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.08zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
            <span className="badge-text"><small>Download on the</small><strong>App Store</strong></span>
          </a>
          <a href="#" className="store-badge" aria-label="Get it on Google Play">
            <svg viewBox="0 0 24 24"><path d="M3.6 2.6c-.4.3-.6.8-.6 1.4v16c0 .6.2 1.1.6 1.4l.3.2 9-9v-.2l-9-9-.3.2zm11.9 9.9l2.9-2.9-9.7-5.6 6.8 8.5zm-6.8 8.5l9.7-5.6-2.9-2.9-6.8 8.5zm11.3-6.5c.7-.4.7-1.4 0-1.8l-2.6-1.5-3 3 3 3 2.6-1.7z"/></svg>
            <span className="badge-text"><small>Get it on</small><strong>Google Play</strong></span>
          </a>
        </div>
      </div>
    </section>
  );
}

function Companies() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In future, emailjs integration can go here
  };

  return (
    <section id="companies">
      <div className="companies-section">
        <div className="companies-inner">
          <div className="companies-copy">
            <span className="eyebrow">For Companies</span>
            <h2>Bring Platio to your office.</h2>
            <p>Let's set up a lunch plan for your team. Tell us a bit about your company and we'll be in touch within one business day.</p>
            <div className="perk">Custom plans based on headcount</div>
            <div className="perk">Single consolidated invoice for your office</div>
            <div className="perk">One delivery window per floor or team</div>
          </div>

          <div className="lead-form">
            {!submitted ? (
              <div id="formDefault">
                <h3>Request a callback</h3>
                <p className="sub">No pricing or setup here — just tell us how to reach you.</p>
                <form id="companyForm" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="companyName">Company name</label>
                      <input type="text" id="companyName" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="contactName">Your name</label>
                      <input type="text" id="contactName" required />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="email">Work email</label>
                      <input type="email" id="email" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Phone number</label>
                      <input type="tel" id="phone" required />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="employees">Number of employees</label>
                      <select id="employees" required>
                        <option value="">Select range</option>
                        <option>1–10</option>
                        <option>11–50</option>
                        <option>51–200</option>
                        <option>200+</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="location">Office location</label>
                      <input type="text" id="location" placeholder="e.g. Riyadh, Olaya" required />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary">Request a Callback</button>
                  <p className="form-disclaimer">We'll only use this to contact you about a Platio office plan.</p>
                </form>
              </div>
            ) : (
              <div className="form-success">
                <div className="check">✓</div>
                <h3>Request received</h3>
                <p>Thanks — our team will reach out within one business day to set up your office plan.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleFaq = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  const faqs = [
    {
      q: "Where does Platio deliver?",
      a: "We currently deliver lunch to office locations across our launch zones in Riyadh. Enter your office location in the app to confirm coverage."
    },
    {
      q: "Can I pause or cancel my plan?",
      a: "Yes — pause, skip a day, or cancel anytime from the app with no penalty. Changes made before the daily cutoff apply the same day."
    },
    {
      q: "What if I have dietary restrictions?",
      a: "Every dish lists its ingredients, and the Salad track offers a lighter option alongside the Executive menu. More dietary filters are on the way."
    },
    {
      q: "How do I order?",
      a: "All ordering, plan changes, and delivery tracking happen in the Platio app. Download it from the App Store or Google Play to get started."
    },
    {
      q: "How do I pay?",
      a: "Plans are billed upfront by card in the app. Office plans set up through our Companies program are invoiced monthly to the company."
    }
  ];

  return (
    <section className="section">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">FAQ</span>
          <h2>Good to know.</h2>
        </div>
        <div className="faq-list">
          {faqs.map((faq, idx) => {
            const isOpen = openId === idx;
            return (
              <div className={`faq-item ${isOpen ? 'open' : ''}`} key={idx}>
                <button className="faq-q" onClick={() => toggleFaq(idx)}>
                  {faq.q} <span className="icon">+</span>
                </button>
                <div className="faq-a" style={{ maxHeight: isOpen ? '200px' : '0' }}>
                  <p>{faq.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#" className="logo"><span className="logo-mark"><span>P</span></span>Platio</a>
            <p>Fresh, balanced lunch delivered to your office — every weekday, without any effort.</p>
          </div>
          <div className="footer-col">
            <h4>Explore</h4>
            <a href="#how">How It Works</a>
            <a href="#menu">Menu</a>
            <a href="#pricing">Pricing</a>
            <a href="#coverage">Coverage</a>
          </div>
          <div className="footer-col">
            <h4>Business</h4>
            <a href="#companies">For Companies</a>
            <a href="#">Careers</a>
            <a href="#">Contact</a>
          </div>
          <div className="footer-col">
            <h4>Legal</h4>
            <a href="#">Terms of Service</a>
            <a href="#">Privacy Policy</a>
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

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <HowItWorks />
      <Coverage />
      <MenuSection />
      <Pricing />
      <WhyPlatio />
      <AppDownload />
      <Companies />
      <FAQ />
      <Footer />
    </>
  );
}

export default App;
