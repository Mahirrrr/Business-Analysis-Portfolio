import { useEffect, useRef, useState } from 'react';
import { projects, studyProjects, certificates, featuredCertificates, uniInvolvement, skillGroups, contacts } from './data.js';
import { asset } from './asset.js';
import Cursor from './Cursor.jsx';
import SanguineShowcase from './Sanguine.jsx';

const NAV_LINKS = [
  ['Projects', '#sanguine'],
  ['Certifications', '#certificates'],
  ['Uni Involvement', '#uni-involvement'],
];

function Nav() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [activeHref, setActiveHref] = useState(null);

  useEffect(() => {
    const sections = [...document.querySelectorAll('main > section')];
    if (!sections.length) return;

    const NAV_OFFSET = 80;
    let raf = 0;

    const updateTheme = () => {
      raf = 0;
      let current = sections[0];
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= NAV_OFFSET) {
          current = section;
        }
      }
      setTheme(current.dataset.theme === 'dark' ? 'dark' : 'light');
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(updateTheme);
    };

    updateTheme();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map(([, href]) => document.querySelector(href)).filter(Boolean);
    if (!sections.length) return;

    const NAV_OFFSET = 120;
    let raf = 0;

    const updateActive = () => {
      raf = 0;
      let current = null;
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= NAV_OFFSET) {
          current = section;
        }
      }
      setActiveHref(current ? `#${current.id}` : null);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(updateActive);
    };

    updateActive();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <header className={`nav${open ? ' nav--menu-open' : ''}`} data-theme={theme}>
      <a className="nav__brand" href="#top">
        Mahir Abdullah
      </a>
      <button
        className="nav__toggle"
        aria-label="Toggle menu"
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
        <span />
      </button>
      <nav className={`nav__links${open ? ' nav__links--open' : ''}`}>
        {NAV_LINKS.map(([label, href]) => (
          <a
            key={href}
            href={href}
            className={activeHref === href ? 'is-active' : ''}
            onClick={() => {
              setActiveHref(href);
              setOpen(false);
            }}
          >
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}

function Hero() {
  const heroRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // React sets `muted` as a JS property but never reflects it as a real
    // HTML attribute. Safari's autoplay policy checks the attribute itself
    // (not just the property), so without this it silently refuses to
    // autoplay on iOS even though video.muted is already true.
    video.setAttribute('muted', '');
    video.setAttribute('autoplay', '');
    video.setAttribute('playsinline', '');
    video.muted = true;
    const tryPlay = () => video.play().catch(() => {});
    tryPlay();
    document.addEventListener('visibilitychange', tryPlay);
    return () => document.removeEventListener('visibilitychange', tryPlay);
  }, []);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    let raf = 0;

    const update = () => {
      raf = 0;
      const progress = Math.min(1, Math.max(0, window.scrollY / window.innerHeight));
      el.style.setProperty('--hero-progress', progress.toFixed(4));
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="hero" id="top" data-theme="dark" ref={heroRef}>
      <video
        ref={videoRef}
        className="hero__bg"
        autoPlay
        muted
        loop
        playsInline
        poster={`${asset('/video/hero-bg-poster.jpg')}?v=4`}
      >
        <source src={`${asset('/video/hero-bg.mp4')}?v=4`} type="video/mp4" />
        <source src={`${asset('/video/hero-bg.webm')}?v=4`} type="video/webm" />
      </video>
      <div className="hero__scrim" />
      <div className="hero__content">
        <p className="hero__eyebrow" data-glow="Business Analytics & AI · Dallas, TX">
          Business Analytics &amp; AI · Dallas, TX
        </p>
        <h1 className="hero__name">
          <span className="hero__name-line" data-glow="MAHIR">
            MAHIR
          </span>
          <span className="hero__name-line" data-glow="ABDULLAH">
            ABDULLAH
          </span>
        </h1>
        <p className="hero__sub" data-glow="I turn messy data into stories worth telling.">
          I turn messy data into stories worth telling.
        </p>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="section" id="about">
      <h2 className="section__title">About Me</h2>
      <p className="about__text">
        Hey! My name is Mahir, and I am a Business Analytics &amp; Artificial Intelligence
        junior based in Dallas, with a minor in audio production. I am building toward a career in analytics and this site is
        where I showcase the projects I have been working on. I enjoy using data to explore
        things I am genuinely interested in, whether that is Premier League football, my own
        music listening habits, or whatever catches my attention next. Each project reflects a
        different tool or technique I have been learning, from SQL and BigQuery to Python and
        Tableau.
      </p>
      <div className="skills">
        {skillGroups.map((group) => (
          <div className="skills__group" key={group.label}>
            <h3>{group.label}</h3>
            <div className="tags">
              {group.items.map((item) => (
                <span className="tag" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project }) {
  return (
    <article className="card">
      <div className="card__head">
        <h3>{project.title}</h3>
      </div>
      <p>{project.description}</p>
      <div className="tags">
        {project.skills.map((s) => (
          <span className="tag" key={s}>
            {s}
          </span>
        ))}
      </div>
      <div className="card__footer">
        <span className="card__tools">{project.tools.join(' · ')}</span>
        {project.repo && (
          <a className="link cert-view" href={project.repo} target="_blank" rel="noreferrer">
            View Repository <span className="cert-view__arrow">→</span>
          </a>
        )}
      </div>
    </article>
  );
}

function StudyCard({ item }) {
  return (
    <article className="card card--study">
      <div className="card__head">
        <h3>
          {item.course}: {item.title}
        </h3>
      </div>
      <p>{item.description}</p>
      <div className="tags">
        {item.skills.map((s) => (
          <span className="tag" key={s}>
            {s}
          </span>
        ))}
      </div>
    </article>
  );
}

function Projects() {
  return (
    <section className="section section--alt" id="projects">
      <h2 className="section__title">All Projects</h2>
      <div className="grid">
        {projects.map((p) => (
          <ProjectCard project={p} key={p.title} />
        ))}
      </div>

      <h2 className="section__title section__title--sub">Study Projects</h2>
      <div className="grid">
        {studyProjects.map((s) => (
          <StudyCard item={s} key={s.course} />
        ))}
      </div>
    </section>
  );
}

function FeaturedCertCard({ cert }) {
  return (
    <div className="cert-featured">
      <img className="cert-featured__badge" src={cert.badge} alt={`${cert.title} badge`} />
      <div className="cert-featured__body">
        <span className="cert-featured__issuer">{cert.issuer}</span>
        <h3 className="cert-featured__title">{cert.title}</h3>
        <a className="link cert-view" href={cert.link} target="_blank" rel="noreferrer">
          View Credential <span className="cert-view__arrow">→</span>
        </a>
      </div>
    </div>
  );
}

function CertRow({ cert }) {
  return (
    <div className="cert-row">
      <img className="cert-row__icon" src={cert.icon} alt={`${cert.issuer} logo`} />
      <span className="cert-row__title">{cert.title}</span>
      <span className="cert-row__issuer">{cert.issuer}</span>
      <a className="link cert-view cert-row__link" href={cert.link} target="_blank" rel="noreferrer">
        View <span className="cert-view__arrow">→</span>
      </a>
    </div>
  );
}

function Certificates() {
  return (
    <section className="section section--alt" id="certificates">
      <h2 className="section__title">Certifications</h2>
      <div className="cert-featured-row">
        {featuredCertificates.map((c) => (
          <FeaturedCertCard cert={c} key={c.title} />
        ))}
      </div>
      <div className="cert-list">
        {certificates.map((c) => (
          <CertRow cert={c} key={c.title} />
        ))}
      </div>
    </section>
  );
}

function UniInvolvement() {
  return (
    <section className="section" id="uni-involvement">
      <h2 className="section__title">Uni Involvement</h2>
      <div className="uni-list">
        {uniInvolvement.map((u) => (
          <div className="uni-row" key={u.title}>
            <img className="uni-row__icon" src={u.icon} alt={`${u.title} logo`} />
            <span className="uni-row__title">{u.title}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Newsletter() {
  useEffect(() => {
    window.ml_webform_success_44623520 = function () {
      const $ = window.ml_jQuery || window.jQuery;
      if (!$) return;
      $('.ml-subscribe-form-44623520 .row-success').show();
      $('.ml-subscribe-form-44623520 .row-form').hide();
    };

    const script = document.createElement('script');
    script.src = 'https://groot.mailerlite.com/js/w/webforms.min.js?v83147fa8ce2d95cb73ece7f28b469519';
    script.async = true;
    document.body.appendChild(script);

    fetch('https://assets.mailerlite.com/jsonp/2563553/forms/195230173296067815/takel').catch(() => {});

    return () => {
      document.body.removeChild(script);
      delete window.ml_webform_success_44623520;
    };
  }, []);

  return (
    <div id="mlb2-44623520" className="ml-form-embedContainer ml-subscribe-form ml-subscribe-form-44623520">
      <div className="ml-form-align-center">
        <div className="ml-form-embedWrapper embedForm">
          <div className="ml-form-embedBody ml-form-embedBodyDefault row-form">
            <div className="ml-form-embedContent">
              <h4>Get notified when Sanguine ships</h4>
            </div>
            <form
              className="ml-block-form"
              action="https://assets.mailerlite.com/jsonp/2563553/forms/195230173296067815/subscribe"
              method="post"
              target="_blank"
            >
              <div className="ml-form-formContent">
                <div className="ml-form-fieldRow ml-last-item">
                  <div className="ml-field-group ml-field-email ml-validate-email ml-validate-required">
                    <input
                      aria-label="email"
                      aria-required="true"
                      type="email"
                      className="form-control"
                      name="fields[email]"
                      placeholder="Email"
                      autoComplete="email"
                    />
                  </div>
                </div>
              </div>
              <input type="hidden" name="ml-submit" value="1" />
              <div className="ml-form-embedSubmit">
                <button type="submit" className="primary">
                  Subscribe
                </button>
                <button disabled style={{ display: 'none' }} type="button" className="loading">
                  <div className="ml-form-embedSubmitLoad" />
                  <span className="sr-only">Loading...</span>
                </button>
              </div>
              <input type="hidden" name="anticsrf" value="true" />
            </form>
          </div>
          <div className="ml-form-successBody row-success" style={{ display: 'none' }}>
            <div className="ml-form-successContent">
              <h4>Thank you!</h4>
              <p>You have successfully joined our subscriber list.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Contact() {
  return (
    <section className="section section--alt" id="contact">
      <div className="contact__grid">
        <h2 className="section__title">Contact</h2>
        <p className="contact__newsletter-title">Get notified when Sanguine ships</p>
        <div className="contact__links">
          <a className="btn btn--primary" href={contacts.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a className="btn btn--ghost" href={contacts.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a className="btn btn--ghost" href={`mailto:${contacts.email}`}>
            Email
          </a>
        </div>
        <Newsletter />
      </div>
    </section>
  );
}

export default function App() {
  return (
    <div className="page">
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <About />
        <SanguineShowcase />
        <Projects />
        <Certificates />
        <UniInvolvement />
        <Contact />
      </main>
    </div>
  );
}
