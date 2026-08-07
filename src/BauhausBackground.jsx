import { useEffect, useRef } from 'react';

// Ported from the "Nested Frames" Bauhaus canvas piece: concentric rectangles
// zoom endlessly inward via seamless log-scale rebasing. Runs contained within
// whatever element renders this (the hero), not as a sitewide fixed layer.
//
// Rings are generated on the fly from an unbounded integer index `k` (via a
// deterministic hash of k), rather than drawn from a fixed-length array whose
// scale factor gets modulo-wrapped. A modulo wrap snaps every ring's size back
// instantly once per period; indexing by an ever-increasing k instead means
// the window of visible rings slides forward by exactly one ring per period,
// so the pattern advances continuously with no reset pop.
export default function BauhausBackground({ className }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const BG = '#101012';
    const PAL = ['#e63329', '#1f5fbf', '#f2c20e', '#111114', '#ece8df'];

    const RINGS = 9;
    const SCALE = 1.85;
    const golden = 0.61803398875;
    const mod = (n, m) => ((n % m) + m) % m;

    function ringAt(k) {
      return {
        col: PAL[mod(k, PAL.length)],
        ar: 0.74 + 0.42 * (mod(k * 7, 5) / 5),
        ox: (mod(k * golden, 1) - 0.5) * 0.22,
        oy: (mod(k * golden * 2.0, 1) - 0.5) * 0.17,
        rot: (mod(k, 2) ? 1 : -1) * 0.035,
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

    // g increases without bound (never wrapped) — that's what makes the loop
    // seamless: the set of ring indices in view shifts by one integer every
    // PERIOD instead of every ring's scale snapping back to its start value.
    function composition(g) {
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, W, H);
      const kTop = Math.floor(g) + 1;
      for (let j = 0; j < RINGS; j++) {
        const k = kTop - j;
        const m = Math.pow(SCALE, k - g);
        frame(m, ringAt(k));
      }
      const coreK = kTop - RINGS;
      const core = ringAt(coreK);
      const cm = Math.pow(SCALE, coreK - g);
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
    const PERIOD = 16000;

    function loop(ts) {
      if (!running) return;
      if (!t0) t0 = ts;
      composition((ts - t0) / PERIOD);
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
