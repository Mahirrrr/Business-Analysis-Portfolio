import { useEffect, useRef, useState } from 'react';
import { animate, stagger } from 'animejs';

// Imgur transcodes any animated gif to mp4 for the .mp4 direct link — that's
// the version that actually plays. Fall back to the static image chain only
// if the video never loads (e.g. the source wasn't animated to begin with).
const IMG_EXTS = ['gif', 'jpg', 'png', 'webp'];

function SanguineMedia({ id, alt }) {
  const [useVideo, setUseVideo] = useState(true);
  const [attempt, setAttempt] = useState(0);
  const [failed, setFailed] = useState(false);

  if (useVideo) {
    return (
      <video
        className="sanguine__media-img"
        src={`https://i.imgur.com/${id}.mp4`}
        autoPlay
        loop
        muted
        playsInline
        onError={() => setUseVideo(false)}
      />
    );
  }

  if (failed) return null;
  return (
    <img
      className="sanguine__media-img"
      src={`https://i.imgur.com/${id}.${IMG_EXTS[attempt]}`}
      alt={alt}
      loading="lazy"
      onError={() => {
        setAttempt((a) => {
          if (a + 1 >= IMG_EXTS.length) {
            setFailed(true);
            return a;
          }
          return a + 1;
        });
      }}
    />
  );
}

// Real vinyl photos, cut out with a transparent background — see public/vinyl/.
function VinylDisc({ img, size = 220 }) {
  return (
    <img
      className="sanguine__vinyl-img"
      src={`/vinyl/${encodeURIComponent(img)}`}
      width={size}
      height={size}
      alt=""
      aria-hidden="true"
      loading="lazy"
    />
  );
}

const VINYL_LAYOUT = [
  { top: '6%', left: '4%', size: 150, img: 'Pink Floyd The Dark Side of the Moon.png', from: { x: -420, y: -260, rotate: -140 } },
  { top: '2%', left: '38%', size: 130, img: 'Dorian Electra My Agenda.png', from: { x: 0, y: -380, rotate: 90 } },
  { top: '4%', left: '68%', size: 170, img: 'worst girl in america vinyl.png', from: { x: 320, y: -320, rotate: 160 } },
  { top: '38%', left: '2%', size: 140, img: 'Clairo Site 1 1000x1000.webp', from: { x: -460, y: 60, rotate: -220 } },
  { top: '32%', left: '30%', size: 190, img: 'Freddie Gibbs Vinyl Pinata.png', from: { x: 0, y: 200, rotate: -90 } },
  { top: '28%', left: '62%', size: 150, img: 'Magdalena Bay Imaginal Disk.webp', from: { x: 380, y: -80, rotate: 180 } },
  { top: '64%', left: '14%', size: 160, img: 'Black Country New Road Forever Howlong.webp', from: { x: -340, y: 280, rotate: -180 } },
  { top: '58%', left: '48%', size: 200, img: 'Mac DeMarco Salad Days.png', from: { x: 440, y: 180, rotate: 200 } },
];

function VinylField({ active }) {
  const refs = useRef([]);

  useEffect(() => {
    if (!active) return;
    const els = refs.current.filter(Boolean);
    animate(els, {
      translateX: [(_, i) => VINYL_LAYOUT[i].from.x, 0],
      translateY: [(_, i) => VINYL_LAYOUT[i].from.y, 0],
      rotate: [(_, i) => VINYL_LAYOUT[i].from.rotate, 0],
      opacity: [0, 1],
      easing: 'easeOutExpo',
      duration: 1100,
      delay: stagger(90),
    });
  }, [active]);

  return (
    <div className="sanguine__vinylfield" aria-hidden="true">
      {VINYL_LAYOUT.map((v, i) => (
        <div
          className="sanguine__vinyl"
          key={i}
          ref={(el) => (refs.current[i] = el)}
          style={{ top: v.top, left: v.left }}
        >
          <VinylDisc img={v.img} size={v.size} />
        </div>
      ))}
    </div>
  );
}

const PAGES = [
  {
    eyebrow: 'SANGUINE · 01',
    heading: 'A music app built for the future.',
    image: { id: 'BX3WFzL', alt: 'Sanguine homepage' },
    body: [
      "Sanguine is, in simple terms, a music app made for the future. It's built to fix the things the big platforms get wrong.",
      "It doesn't aim to compete with Spotify or Apple Music — it's about bringing all the smaller music apps and sites into one place, with the best features of each.",
      'Full customisability, a beautiful interface, and a growing vinyl aesthetic — see the actual pressing of the album you\'re playing.',
    ],
  },
  {
    eyebrow: 'SANGUINE · 02',
    heading: 'Every feature, rebuilt from scratch.',
    features: [
      {
        title: 'A smarter shuffle',
        text: "Ever notice Spotify keeps handing you the same songs on shuffle? That's because it plays it safe with tracks it already knows you like. Sanguine uses machine learning to decide what you'd want next based on what's actually playing.",
      },
      {
        title: 'Advanced playlists',
        text: 'Playlists that evolve on their own — daily refreshes and rules-based lists that change with you instead of sitting still.',
      },
      {
        title: 'Ambient soundscapes',
        text: 'An infinite loop of handpicked tracks and soundscapes from smaller artists, plus the option to generate your own — describe a vibe like "tennis in Monaco" and get the perfect soundscape back.',
      },
      {
        title: 'Podcasts',
        text: 'A minimal, beautiful player built just for podcasts.',
      },
      {
        title: 'Auto-tagging your library',
        text: "Drop in a folder of messy files and Sanguine listens to them — like Shazam for your own music — filling in the track, artist, and album art automatically.",
      },
      {
        title: 'Autogenerated playlists',
        text: 'Built straight from the music you already have, no manual curation required.',
      },
    ],
  },
  {
    eyebrow: 'SANGUINE · 03',
    heading: 'Everything you already use, in one place.',
    image: { id: 'QtS69ps', alt: 'Sanguine integrations' },
    features: [
      {
        title: 'Last.fm',
        text: 'Connect your Last.fm account and your scrobbles sync straight in — see what your friends are listening to, right inside Sanguine.',
      },
      {
        title: 'Bandcamp, then SoundCloud',
        text: 'Bandcamp streaming is already built in, with SoundCloud integration planned next.',
      },
      {
        title: 'Your own media server',
        text: 'Log into your own private server — Plex or Jellyfin — and stream your personal library alongside everything else.',
      },
    ],
  },
  {
    eyebrow: 'SANGUINE · 04',
    heading: 'Every album, as a record.',
    image: { id: 'F79rAH0', alt: 'Sanguine customisability' },
    body: [
      "Sanguine is moving toward a full vinyl aesthetic — see the real pressing of the album you're playing, and shape the whole app around how you like to look at music.",
    ],
    vinyl: true,
  },
];

export default function SanguineShowcase() {
  const wrapRef = useRef(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const count = PAGES.length;

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    let raf = 0;

    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const raw = scrollable > 0 ? -rect.top / scrollable : 0;
      const clamped = Math.min(1, Math.max(0, raw));
      setProgress(clamped);
      setActive(Math.min(count - 1, Math.floor(clamped * count)));
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
  }, [count]);

  return (
    <section
      className="sanguine"
      id="sanguine"
      data-theme="dark"
      ref={wrapRef}
      style={{ height: `${count * 140}vh` }}
    >
      <div className="sanguine__pin">
        <div className="sanguine__pages">
          {PAGES.map((p, i) => (
            <div className={`sanguine__page${i === active ? ' is-active' : ''}`} key={p.heading}>
              {p.vinyl ? (
                <VinylField active={i === active} />
              ) : (
                p.image && (
                  <div className="sanguine__mediaframe">
                    <SanguineMedia id={p.image.id} alt={p.image.alt} />
                  </div>
                )
              )}

              <div className="sanguine__textblock">
                <p className="sanguine__eyebrow">{p.eyebrow}</p>
                <h2 className="sanguine__heading">{p.heading}</h2>

                {p.body && (
                  <div className="sanguine__body">
                    {p.body.map((para) => (
                      <p key={para}>{para}</p>
                    ))}
                  </div>
                )}

                {p.features && (
                  <ul className="sanguine__features">
                    {p.features.map((f) => (
                      <li key={f.title}>
                        <span className="sanguine__feature-title">{f.title}</span>
                        <span className="sanguine__feature-text">{f.text}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {p.vinyl && p.image && (
                  <div className="sanguine__mediaframe sanguine__mediaframe--inline">
                    <SanguineMedia id={p.image.id} alt={p.image.alt} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="sanguine__progress">
          <span className="sanguine__count">
            [{active + 1}/{count}]
          </span>
          <div className="sanguine__track">
            <div className="sanguine__bar" style={{ width: `${progress * 100}%` }} />
          </div>
        </div>
      </div>
    </section>
  );
}
