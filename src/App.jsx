import { useEffect, useRef, useState } from 'react';
import { projects, studyProjects, certificates, featuredCertificates, uniInvolvement, skillGroups, contacts } from './data.js';
import { asset } from './asset.js';
import Cursor from './Cursor.jsx';
import Shuffle from './Shuffle.jsx';
import SanguineShowcase from './Sanguine.jsx';

const NAV_LINKS = [
  ['Projects', '#projects'],
  ['Certifications', '#certificates'],
  ['Uni Involvement', '#uni-involvement'],
];

function Nav() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [activeHref, setActiveHref] = useState(NAV_LINKS[0][1]);

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
      let current = sections[0];
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= NAV_OFFSET) {
          current = section;
        }
      }
      setActiveHref(`#${current.id}`);
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
    <header className="nav" data-theme={theme}>
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
        className="hero__bg"
        src={asset('/video/hero-bg.webm')}
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="hero__scrim" />
      <div className="hero__content">
        <p className="hero__eyebrow" data-glow="Business Analytics & AI · Dallas, TX">
          Business Analytics &amp; AI · Dallas, TX
        </p>
        <h1 className="hero__name">
          <span className="hero__name-line" data-glow="MAHIR">
            <Shuffle
              text="MAHIR"
              tag="span"
              shuffleDirection="right"
              duration={0.4}
              shuffleTimes={2}
              animationMode="evenodd"
              stagger={0.035}
              threshold={0.2}
              triggerOnce
            />
          </span>
          <span className="hero__name-line" data-glow="ABDULLAH">
            <Shuffle
              text="ABDULLAH"
              tag="span"
              shuffleDirection="right"
              duration={0.4}
              shuffleTimes={2}
              animationMode="evenodd"
              stagger={0.035}
              threshold={0.2}
              triggerOnce
            />
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
        sophomore based in Dallas. I am building toward a career in analytics and this site is
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
          <a className="link" href={project.repo} target="_blank" rel="noreferrer">
            View Repository →
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

function Contact() {
  return (
    <section className="section section--alt" id="contact">
      <h2 className="section__title">Contact</h2>
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
