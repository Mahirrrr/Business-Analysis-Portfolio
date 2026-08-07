import { useEffect, useRef } from 'react';

// A small circle that follows the pointer. Uses mix-blend-mode: difference —
// the same trick as the hero/nav text — so its color always contrasts with
// whatever's behind it instead of needing a fixed color per background.
export default function Cursor() {
  const dotRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const dot = dotRef.current;
    if (!dot) return;

    let raf = 0;
    let x = 0;
    let y = 0;

    const move = (e) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          raf = 0;
          dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
        });
      }
    };

    const reveal = () => {
      document.documentElement.classList.add('has-cursor-dot');
      window.removeEventListener('mousemove', reveal);
    };

    window.addEventListener('mousemove', move, { passive: true });
    window.addEventListener('mousemove', reveal, { passive: true });

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousemove', reveal);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <div className="cursor-dot" ref={dotRef} aria-hidden="true" />;
}
