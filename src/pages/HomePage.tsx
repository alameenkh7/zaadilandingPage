import { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import dishes from '../data/dishes.json';
import site from '../data/site.json';
import faqData from '../data/faq.json';
import { heroRotatorLines } from '../data/heroLines';
import { personas, type Persona } from '../data/personas';
import {
  APP_STORE_QR_IMAGE,
  APP_STORE_URL,
  PLAY_STORE_QR_IMAGE,
  PLAY_STORE_URL,
} from '../data/storeUrls';
import StoreBadgeButtons, { type StorePicker } from '../components/StoreBadgeButtons';

type Dish = (typeof dishes)[number];
type FaqGroup = { cat: string; items: [string, string][] };

const PHONE_SCREENS = [
  `<div class="t">Choose your plan</div>
  <div class="opt sel"><div>Platio Balanced<small>Complete &amp; filling</small></div>●</div>
  <div class="opt"><div>Platio Light<small>Fresh &amp; lighter</small></div>○</div>
  <div class="mini"><i><b style="width:80%"></b></i><i><b style="width:55%"></b></i><i><b style="width:35%"></b></i></div>
  <div class="t" style="font-size:12px;margin-top:6px">Pick a plan</div>
  <div class="chips"><b>Try It</b><b>Week</b><b class="sel">Month</b><b>Quarter</b></div>
  <div class="btnx">Continue</div>`,
  `<div class="t">Today's lunch</div>
  <div class="tl"><div><span></span>Cooked fresh today</div><div><span></span>Packed fresh for you</div>
  <div class="dim"><span></span>Out for delivery</div><div class="dim"><span></span>At your desk</div></div>
  <div class="opt sel" style="margin-top:6px"><div>Arrives<small>Before 1 PM</small></div></div>`,
  `<div class="t">This week</div>
  <div class="skiprow"><i>Sun</i><i>Mon</i><i class="x">Tue</i><i>Wed</i><i>Thu</i></div>
  <div class="opt"><div>Skip this day<small>Up to 6 PM the day before</small></div></div>
  <div class="opt"><div>Pause my plan<small>For longer breaks</small></div></div>
  <div class="btnx">Confirm</div>`,
];

function HeroSection() {
  const [line, setLine] = useState(0);
  const [out, setOut] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => {
      setOut(true);
      window.setTimeout(() => {
        setLine((i) => (i + 1) % heroRotatorLines.length);
        setOut(false);
      }, 400);
    }, 3400);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="hero">
      <div className="hero-in">
        <div>
          <h1>
            Fresh Lunch,{' '}
            <span className="tail">
              <span id="rot" className={out ? 'out' : ''}>
                {heroRotatorLines[line]}
              </span>
            </span>
          </h1>
          <p className="sub">Cooked fresh today, just for you. At your office before 1 PM.</p>
          <div className="cta-row">
            <a className="btn btn-ink" href="#download">
              Download the app
            </a>
            <a className="tlink" href="#plans">
              Try a day for 32 SAR →
            </a>
          </div>
          <ul className="facts">
            <li>Cooked fresh today</li>
            <li>Free delivery</li>
            <li>Skip or pause anytime</li>
            <li>Refer a friend, earn 10% cashback</li>
          </ul>
        </div>
        <figure className="hero-photo">
          <div className="frame">
            <img
              src={site.heroImage}
              alt="Grilled chicken rice bowl with mango, peppers and cabbage"
              fetchPriority="high"
            />
            <span className="sample-cap">Sample image</span>
          </div>
          <figcaption>
            <span>Grilled chicken rice bowl, with mango and a spiced dressing.</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function MenuSection() {
  const [filter, setFilter] = useState<'all' | 'Balanced' | 'Light'>('all');
  const visible = dishes.filter((d: Dish) => filter === 'all' || d.type === filter);

  return (
    <section className="menu" id="menu">
      <div className="wrap">
        <div className="menu-head">
          <div>
            <span className="eyebrow">The menu</span>
            <h2>
              Healthy that actually
              <br />
              <em>tastes good.</em>
            </h2>
          </div>
          <div className="tabs" role="tablist" aria-label="Meal type">
            {(
              [
                ['all', 'All meals'],
                ['Balanced', 'Platio Balanced'],
                ['Light', 'Platio Light'],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                className="tab"
                role="tab"
                aria-selected={filter === key}
                onClick={() => setFilter(key)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="rows">
          {visible.map((d, idx) => (
            <article className="row" key={d.name}>
              <figure className="ph">
                <img src={d.img} alt={d.name} loading="lazy" />
                <span className="sample-cap">Sample image</span>
              </figure>
              <div className="tx">
                <div>
                  <span className="no">{String(idx + 1).padStart(2, '0')}</span>
                  <span className="kind">Platio {d.type}</span>
                </div>
                <h3>{d.name}</h3>
                <p>{d.desc}</p>
                <dl className="mx">
                  <div>
                    <dt>Protein</dt>
                    <dd>
                      {d.protein}
                      <small>g</small>
                    </dd>
                  </div>
                  <div>
                    <dt>Carbs</dt>
                    <dd>
                      {d.carbs}
                      <small>g</small>
                    </dd>
                  </div>
                  <div>
                    <dt>Fat</dt>
                    <dd>
                      {d.fat}
                      <small>g</small>
                    </dd>
                  </div>
                  <div>
                    <dt>Calories</dt>
                    <dd>
                      {d.kcal}
                      <small>kcal</small>
                    </dd>
                  </div>
                </dl>
              </div>
            </article>
          ))}
        </div>
        <div className="badges">
          <span>Cooked fresh today</span>
          <span>Macros on every meal</span>
          <span>Full ingredient details</span>
        </div>
        <p className="menu-note">
          Sample images, dish names and macro values shown for illustration. The live menu with full
          ingredient details is in the app.
        </p>
      </div>
    </section>
  );
}

function WhySection() {
  return (
    <section id="why">
      <div className="wrap">
        <div style={{ marginBottom: 'clamp(30px,4vw,54px)' }}>
          <span className="eyebrow">Why Platio</span>
          <h2>
            Lunch, <em>done right.</em>
          </h2>
        </div>
        <article className="pl">
          <div className="no">01</div>
          <div>
            <span className="label">Fresh</span>
            <h3>Cooked today, just for you.</h3>
          </div>
          <div className="body">
            <p>
              Your lunch is cooked fresh on the day it's delivered and arrives ready to enjoy. It's
              made for your day, with your name on it.
            </p>
          </div>
        </article>
        <article className="pl">
          <div className="no">02</div>
          <div>
            <span className="label">Premium Nutrition</span>
            <h3>Quality ingredients. Balanced nutrition.</h3>
          </div>
          <div className="body">
            <p>
              Every meal is designed around the right mix of protein, carbs and healthy fats, using
              quality ingredients. Calories and macros are shown on every meal, and full ingredient
              details are listed on the menu, so you always know what's on your plate.
            </p>
            <div className="mm" aria-hidden="true">
              <div>
                <span>Protein</span>
                <i>
                  <b style={{ width: '78%' }} />
                </i>
              </div>
              <div>
                <span>Carbs</span>
                <i>
                  <b style={{ width: '56%' }} />
                </i>
              </div>
              <div>
                <span>Fat</span>
                <i>
                  <b style={{ width: '34%' }} />
                </i>
              </div>
              <em>Shown on every meal</em>
            </div>
          </div>
        </article>
        <article className="pl">
          <div className="no">03</div>
          <div>
            <span className="label">Reliable · Control &amp; flexibility</span>
            <h3>Lunch you can count on. A plan you control.</h3>
          </div>
          <div className="body">
            <p>
              Lunch arrives Sunday to Thursday, before 1 PM. Plans change, so yours can too. Skip a
              day or pause for longer, any time up to 6 PM the day before. Skipped meals move to the
              end of your plan, so you never lose a meal you've paid for.
            </p>
            <div className="cal" aria-label="Example of skipping a day">
              <div className="cal-title">EXAMPLE · WEEK PLAN</div>
              <div className="days">
                <div className="day">
                  Sun<small>Lunch</small>
                </div>
                <div className="day">
                  Mon<small>Lunch</small>
                </div>
                <div className="day skip">
                  Tue<small>Skipped</small>
                </div>
                <div className="day">
                  Wed<small>Lunch</small>
                </div>
                <div className="day">
                  Thu<small>Lunch</small>
                </div>
              </div>
              <div className="days" style={{ marginTop: 8 }}>
                <div />
                <div />
                <div />
                <div />
                <div className="day add">
                  Sun<small>Tue's lunch</small>
                </div>
              </div>
              <div className="cal-note">
                Skipped Tuesday? Your meal is added to the end of your plan. Nothing lost.
              </div>
            </div>
          </div>
        </article>
        <article className="pl">
          <div className="no">04</div>
          <div>
            <span className="label">Taste</span>
            <h3>Healthy, without giving up flavour.</h3>
          </div>
          <div className="body">
            <p>We never sacrifice taste in the pursuit of health. You get the best of both.</p>
            <div className="ph2">
              <img
                src={site.tasteImage}
                alt="A grilled chicken wrap with a chickpea, cucumber and feta salad"
                loading="lazy"
              />
              <span className="sample-cap">Sample image</span>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

function HowSection() {
  return (
    <section className="how" id="how">
      <div className="wrap">
        <span className="eyebrow">How it works</span>
        <h2>
          Three steps. Then lunch <em>just happens.</em>
        </h2>
        <div className="steps">
          <div className="step">
            <div className="phone">
              <div className="screen" dangerouslySetInnerHTML={{ __html: PHONE_SCREENS[0] }} />
            </div>
            <div className="num">1</div>
            <h3>Pick your plan</h3>
            <p>Choose Balanced or Light, then Try It, Week, Month or Quarter.</p>
          </div>
          <div className="step">
            <div className="phone">
              <div className="screen" dangerouslySetInnerHTML={{ __html: PHONE_SCREENS[1] }} />
            </div>
            <div className="num">2</div>
            <h3>We cook fresh every day</h3>
            <p>Your lunch is cooked fresh on the day it arrives, made just for you.</p>
          </div>
          <div className="step">
            <div className="phone">
              <div className="screen" dangerouslySetInnerHTML={{ __html: PHONE_SCREENS[2] }} />
            </div>
            <div className="num">3</div>
            <h3>Lunch arrives. You stay in control.</h3>
            <p>Arrives before 1 PM. Skip or pause from the app whenever life changes.</p>
            <div className="ref-line">Love it? Refer a friend and earn 10% cashback.</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PersonasSection() {
  const [cur, setCur] = useState(0);
  const [fade, setFade] = useState(false);
  const person: Persona = personas[cur];

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => {
      setFade(true);
      window.setTimeout(() => {
        setCur((c) => (c + 1) % personas.length);
        setFade(false);
      }, 250);
    }, 8000);
    return () => window.clearInterval(id);
  }, []);

  const pick = (i: number) => {
    setFade(true);
    window.setTimeout(() => {
      setCur(i);
      setFade(false);
    }, 250);
  };

  return (
    <section>
      <div className="wrap">
        <div style={{ marginBottom: 'clamp(30px,4vw,54px)' }}>
          <span className="eyebrow">Is Platio for you?</span>
          <h2>
            Probably. <em>Here's why.</em>
          </h2>
        </div>
        <div className="ps">
          <ul className="plist2" role="tablist" aria-label="Who Platio is for">
            {personas.map((p, i) => (
              <li key={p.title}>
                <button type="button" role="tab" aria-selected={i === cur} onClick={() => pick(i)}>
                  {p.title}
                </button>
              </li>
            ))}
          </ul>
          <div className={`pcard2 ${fade ? 'out' : ''}`} aria-live="polite">
            <h3>{person.title}</h3>
            <p>{person.quote}</p>
            <span className="pill">{person.pill}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="testi">
      <div className="wrap">
        <span className="eyebrow">Real people. Real lunches.</span>
        <div className="q" aria-hidden="true">
          &ldquo;
        </div>
        <h2>Join the first people on Platio.</h2>
        <p>Be one of the first to make lunch the easiest part of your day. We'd love to hear how it goes.</p>
        <a className="btn btn-ink" href="#plans">
          Try a day for 32 SAR
        </a>
      </div>
    </section>
  );
}

function PlansSection() {
  return (
    <section id="plans">
      <div className="wrap">
        <span className="eyebrow">Plans</span>
        <h2>
          Simple plans. <em>Every meal counts.</em>
        </h2>
        <p className="lead" style={{ marginTop: 18 }}>
          You pay for the number of meals in your plan, and you get every one of them, even if you skip or pause.
        </p>
        <div className="ptable">
          <div className="pc">
            <span className="flag" />
            <h3>Try It</h3>
            <div className="dur">1 lunch</div>
            <div className="price">
              32<small>SAR</small>
            </div>
            <div className="was">
              <s>40 SAR</s> <b>20% off</b>
            </div>
            <div className="per">32 SAR per meal</div>
          </div>
          <div className="pc">
            <span className="flag" />
            <h3>Week</h3>
            <div className="dur">5 lunches</div>
            <div className="price">
              150<small>SAR</small>
            </div>
            <div className="was">
              <s>200 SAR</s> <b>25% off</b>
            </div>
            <div className="per">30 SAR per meal</div>
          </div>
          <div className="pc hot">
            <span className="flag">Most popular</span>
            <h3>Month</h3>
            <div className="dur">20 lunches</div>
            <div className="price">
              600<small>SAR</small>
            </div>
            <div className="was">
              <s>800 SAR</s> <b>25% off</b>
            </div>
            <div className="per">30 SAR per meal</div>
          </div>
          <div className="pc">
            <span className="flag" />
            <h3>Quarter</h3>
            <div className="dur">60 lunches</div>
            <div className="price">
              1,800<small>SAR</small>
            </div>
            <div className="was">
              <s>2,400 SAR</s> <b>25% off</b>
            </div>
            <div className="per">30 SAR per meal</div>
          </div>
        </div>
        <div className="plan-note">
          <span>All prices include VAT</span>
          <span>Free delivery</span>
          <span>No auto-renew</span>
          <span>Refer a friend: they get 15% off on top of any offer, you earn 10% cashback</span>
          <span>No refunds. Our support team will help resolve any issue.</span>
        </div>
      </div>
    </section>
  );
}

function ReferSection() {
  return (
    <section className="refer" id="refer">
      <div className="wrap">
        <div className="refer-head">
          <div>
            <span className="eyebrow">Refer &amp; earn</span>
            <h2>
              Share lunch.
              <br />
              <em>Get 10% cashback.</em>
            </h2>
            <p className="lead">
              Your friend gets 15% off their plan. You get 10% cashback for your next subscription.
            </p>
          </div>
          <a className="btn btn-ink" href="#download">
            Download the app
          </a>
        </div>
        <div className="duo">
          <div>
            <div className="who">Your friend gets</div>
            <div className="n">
              15<sup>%</sup>
            </div>
            <div className="cap">off their plan</div>
            <p>On top of any other offer available.</p>
          </div>
          <div className="rule" />
          <div>
            <div className="who">You get</div>
            <div className="n">
              10<sup>%</sup>
            </div>
            <div className="cap">cashback</div>
            <p>On your friend's first plan, added to your wallet.</p>
          </div>
        </div>
        <ol className="rsteps">
          <li>Share your referral from the app.</li>
          <li>Your friend joins and gets 15% off their plan.</li>
          <li>You get 10% cashback in your wallet, ready for your next subscription.</li>
        </ol>
        <div className="rnote">
          <span>No cap</span>
          <span>No minimum</span>
          <span>Works on every plan</span>
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  const listRef = useRef<HTMLDivElement>(null);
  const groups = faqData as FaqGroup[];

  useEffect(() => {
    const box = listRef.current;
    if (!box) return;
    const onToggle = (e: Event) => {
      const t = e.target as HTMLDetailsElement;
      if (!t.classList?.contains('grp') || !t.open) return;
      box.querySelectorAll('details.grp').forEach((o) => {
        if (o !== t) (o as HTMLDetailsElement).open = false;
      });
    };
    box.addEventListener('toggle', onToggle, true);
    return () => box.removeEventListener('toggle', onToggle, true);
  }, []);

  return (
    <section id="faq">
      <div className="wrap">
        <div className="faq-top">
          <span className="eyebrow">FAQ</span>
          <h2>
            Still hungry <em>for answers?</em>
          </h2>
        </div>
        <div className="faq-list" ref={listRef}>
          {groups.map((g, i) => (
            <details className="grp" key={g.cat} open={i === 0}>
              <summary>
                {g.cat}
                <span className="n">{g.items.length}</span>
              </summary>
              <div className="grp-body">
                {g.items.map(([q, a]) => (
                  <details key={q}>
                    <summary>{q}</summary>
                    <div className="ans" dangerouslySetInnerHTML={{ __html: a }} />
                  </details>
                ))}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function DownloadSection() {
  const [store, setStore] = useState<StorePicker>('appstore');

  const active =
    store === 'appstore'
      ? {
          label: 'App Store',
          qr: APP_STORE_QR_IMAGE,
          url: APP_STORE_URL,
          alt: 'QR code to download Platio on the App Store',
        }
      : store === 'playstore'
        ? {
            label: 'Google Play',
            qr: PLAY_STORE_QR_IMAGE,
            url: PLAY_STORE_URL,
            alt: 'QR code to download Platio on Google Play',
          }
        : null;

  return (
    <section className="final" id="download">
      <div className="wrap">
        <div className="final-grid">
          <div>
            <h2>
              Tomorrow's lunch is <em>already sorted.</em>
            </h2>
            <p>Download the Platio app, pick your plan, and let us handle lunch.</p>
            <StoreBadgeButtons mode="picker" selected={store} onSelect={setStore} />
          </div>
          <div className="qr">
            {active ? (
              <>
                <div className="box qr-img-wrap">
                  <img src={active.qr} width={220} height={220} alt={active.alt} />
                </div>
                <b>Scan for {active.label}</b>
                <a className="qr-store-link" href={active.url} target="_blank" rel="noopener noreferrer">
                  {active.url}
                </a>
              </>
            ) : (
              <>
                <div className="box qr-placeholder">
                  Choose App Store or Google Play to show your QR code.
                </div>
                <b>Scan to get the app</b>
              </>
            )}
          </div>
        </div>
        <div className="contact">
          <div>
            Email
            <b>
              <a href="mailto:support@platiokitchen.com">support@platiokitchen.com</a>
            </b>
          </div>
          <div>
            Phone
            <b>
              <a href="tel:+966539759323">+966 53 975 9323</a>
            </b>
          </div>
          <div>
            Support hours
            <b>10 AM – 6 PM, all working days</b>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="top">
        <HeroSection />
        <MenuSection />
        <WhySection />
        <HowSection />
        <PersonasSection />
        <TestimonialsSection />
        <PlansSection />
        <ReferSection />
        <FaqSection />
        <DownloadSection />
      </main>
      <Footer />
    </>
  );
}