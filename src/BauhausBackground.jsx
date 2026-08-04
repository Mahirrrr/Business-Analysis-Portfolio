import { useEffect, useRef } from 'react';

// Ported from the "Nested Frames" Bauhaus canvas piece: concentric rectangles
// zoom endlessly inward via seamless log-scale rebasing. Runs contained within
// whatever element renders this (the hero), not as a sitewide fixed layer.
export default function BauhausBackground({ className }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const BG = '#101012';
    const PAL = ['#e63329', '#1f5fbf', '#f2c20e', '#111114', '#ece8df'];

    const RINGS = 14;
    const ring = new Array(RINGS);
    const SCALE = 1.46;
    const golden = 0.61803398875;

    for (let i = 0; i < RINGS; i++) {
      ring[i] = {
        col: PAL[i % PAL.length],
        ar: 0.74 + 0.42 * (((i * 7) % 5) / 5),
        ox: (((i * golden) % 1) - 0.5) * 0.22,
        oy: (((i * golden * 2.0) % 1) - 0.5) * 0.17,
        rot: (i % 2 ? 1 : -1) * 0.035,
        fill: i % 2 === 0,
      };
    }

    let W = 0;
    let H = 0;
    let DPR = 1;
    let cx = 0;
    let cy = 0;
    let base = 0;

    function resize() {
      DPR = Math.min(2, window.devicePixelRatio || 1);
      W = cv.clientWidth;
      H = cv.clientHeight;
      cv.width = Math.max(1, W * DPR);
      cv.height = Math.max(1, H * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      cx = W / 2;
      cy = H / 2;
      base = Math.max(W, H) * 1.6;
    }

    function frame(m, r) {
      const w = base * m;
      const h = base * m * r.ar;
      const ex = cx + r.ox * w;
      const ey = cy + r.oy * h;
      ctx.save();
      ctx.translate(ex, ey);
      ctx.rotate(r.rot);
      ctx.fillStyle = r.col;
      ctx.fillRect(-w / 2, -h / 2, w, h);
      ctx.restore();
    }

    function composition(p) {
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, W, H);
      const grow = Math.pow(SCALE, p);
      for (let i = RINGS - 1; i >= 0; i--) {
        const m = Math.pow(SCALE, i - (RINGS - 1)) * grow;
        frame(m, ring[i]);
      }
      const core = ring[0];
      const cm = Math.pow(SCALE, -(RINGS - 1)) * grow;
      const s = base * cm * 0.62;
      const fx = cx + core.ox * base * cm;
      const fy = cy + core.oy * base * cm * core.ar;
      ctx.fillStyle = PAL[2];
      ctx.fillRect(fx - s / 2, fy - s / 2, s, s);
      ctx.beginPath();
      ctx.fillStyle = PAL[0];
      ctx.arc(fx, fy, s * 0.22, 0, 6.2831853);
      ctx.fill();
    }

    let running = true;
    let raf = 0;
    let t0 = 0;
    const PERIOD = 5200;

    function loop(ts) {
      if (!running) return;
      if (!t0) t0 = ts;
      const p = ((ts - t0) % PERIOD) / PERIOD;
      composition(p);
      raf = requestAnimationFrame(loop);
    }

    function start() {
      if (!running) {
        running = true;
        t0 = 0;
        raf = requestAnimationFrame(loop);
      }
    }
    function stop() {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    }

    const onResize = () => {
      resize();
      if (reduce) composition(0.42);
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    window.addEventListener('resize', onResize, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);

    resize();
    if (reduce) {
      composition(0.42);
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      stop();
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
