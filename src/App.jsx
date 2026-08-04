import { useEffect, useState } from 'react';
import { projects, studyProjects, certificates, skillGroups, contacts } from './data.js';
import BauhausBackground from './BauhausBackground.jsx';
import Shuffle from './Shuffle.jsx';

const NAV_LINKS = [
  ['Projects', '#projects'],
  ['Experiences', '#experiences'],
  ['Certifications', '#certificates'],
  ['Uni Involvement', '#uni-involvement'],
];

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`nav${scrolled ? ' nav--solid' : ''}`}>
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
        {NAV_LINKS.map(([label, href], i) => (
          <a key={href} href={href} className={i === 0 ? 'is-active' : ''} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <BauhausBackground className="hero__bg" />
      <div className="hero__content">
        <p className="hero__eyebrow">Business Analytics &amp; AI · Dallas, TX</p>
        <Shuffle
          text="MAHIR ABDULLAH"
          tag="h1"
          className="hero__name"
          shuffleDirection="right"
          duration={0.4}
          shuffleTimes={2}
          animationMode="evenodd"
          stagger={0.035}
          threshold={0.2}
          triggerOnce
        />
        <p className="hero__sub">
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
  const isSoon = project.status === 'soon';
  return (
    <article className={`card${isSoon ? ' card--soon' : ''}`}>
      <div className="card__head">
        <h3>{project.title}</h3>
        {isSoon && <span className="badge">Coming Soon</span>}
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
          {item.course} — {item.title}
        </h3>
        <span className="badge badge--progress">{item.status}</span>
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
      <h2 className="section__title">Portfolio Projects</h2>
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

function Experiences() {
  return (
    <section className="section" id="experiences">
      <h2 className="section__title">Experiences</h2>
      <p className="section__note">
        This section is a placeholder — work experience, internships, and roles are coming soon.
      </p>
    </section>
  );
}

function Certificates() {
  return (
    <section className="section section--alt" id="certificates">
      <h2 className="section__title">Certificates</h2>
      <p className="section__note">
        Actively working on building certifications — more in progress.
      </p>
      <ul className="cert-list">
        {certificates.map((c) => (
          <li key={c.title}>
            {c.file ? (
              <a href={`/certifications/${encodeURIComponent(c.file)}`} target="_blank" rel="noreferrer">
                📜 {c.title}
              </a>
            ) : (
              <span className="cert-list__pending">📜 {c.title}</span>
            )}
            <span className="cert-list__issuer"> — {c.issuer}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function UniInvolvement() {
  return (
    <section className="section" id="uni-involvement">
      <h2 className="section__title">Uni Involvement</h2>
      <p className="section__note">
        This section is a placeholder — clubs, organizations, and campus involvement are coming soon.
      </p>
    </section>
  );
}

function Contact() {
  return (
    <section className="section section--alt" id="contact">
      <h2 className="section__title">Contact</h2>
      <p className="section__note">Always happy to talk data, football, or music.</p>
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

function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Mahir Abdullah. Built with React + Vite.</p>
    </footer>
  );
}

export default function App() {
  return (
    <div className="page">
      <Nav />
      <main>
        <Hero />
        <About />
        <Projects />
        <Experiences />
        <Certificates />
        <UniInvolvement />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
