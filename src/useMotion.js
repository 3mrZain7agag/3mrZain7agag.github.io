import { useEffect, useRef, useState } from "react";

/**
 * useMagnet — subtle mouse-following magnetic pull on hover, snapping back
 * on exit. Adapted from a drag-physics "magnet" concept, but implemented
 * with plain pointer tracking (no animation library, no draggable state).
 */
export function useMagnet({ padding = 60, strength = 6 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none)").matches) return; // skip on touch devices

    let raf = null;

    const handleMove = (e) => {
      const rect = node.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const reach = Math.max(rect.width, rect.height) / 2 + padding;

      if (dist < reach) {
        const x = dx / strength;
        const y = dy / strength;
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          node.style.transition = "transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)";
          node.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        });
      } else {
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          node.style.transition = "transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)";
          node.style.transform = "translate3d(0, 0, 0)";
        });
      }
    };

    const handleLeave = () => {
      if (raf) cancelAnimationFrame(raf);
      node.style.transition = "transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)";
      node.style.transform = "translate3d(0, 0, 0)";
    };

    window.addEventListener("mousemove", handleMove);
    node.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      node.removeEventListener("mouseleave", handleLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [padding, strength]);

  return ref;
}

/**
 * Shared cool-to-warm color stops + interpolator. Every tone-driven element
 * on the site (cursor glow, nav, dividers, card accents) reads from this
 * SAME function, so colors always agree with each other regardless of
 * which scroll metric drives them.
 */
export const TONE_STOPS = [
  { pos: 0, c: [76, 154, 255] },     // cool blue
  { pos: 0.55, c: [156, 127, 199] }, // transitional violet
  { pos: 1, c: [217, 163, 92] },     // warm amber
];

export function toneColorAt(t) {
  t = Math.min(Math.max(t, 0), 1);
  for (let i = 0; i < TONE_STOPS.length - 1; i++) {
    const a = TONE_STOPS[i], b = TONE_STOPS[i + 1];
    if (t >= a.pos && t <= b.pos) {
      const localT = (t - a.pos) / (b.pos - a.pos);
      return a.c.map((v, idx) => Math.round(v + (b.c[idx] - v) * localT));
    }
  }
  return TONE_STOPS[TONE_STOPS.length - 1].c;
}

function shade(rgb, amount) {
  // amount: -1..1, negative darkens toward black, positive lightens toward white
  return rgb.map((v) => {
    const target = amount < 0 ? 0 : 255;
    return Math.round(v + (target - v) * Math.abs(amount));
  });
}

/**
 * useCursorGlow — a soft glow that follows the cursor with slight easing
 * (not 1:1), whose color continuously blends across the page's cool-to-warm
 * palette based on overall scroll position (not discrete section jumps).
 * Disabled on touch devices and for prefers-reduced-motion.
 */
export function useCursorGlow() {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none)").matches) return; // no real cursor on touch

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let curX = mouseX;
    let curY = mouseY;
    let raf = null;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const loop = () => {
      curX += (mouseX - curX) * 0.09;
      curY += (mouseY - curY) * 0.09;

      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      const [r, g, b] = toneColorAt(progress);

      node.style.transform = `translate3d(${curX}px, ${curY}px, 0) translate(-50%, -50%)`;
      node.style.background = `radial-gradient(circle, rgba(${r}, ${g}, ${b}, 0.14), transparent 70%)`;

      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return ref;
}

/**
 * useScrollBlendColor — the CURRENT blended tone color at the present
 * scroll position (live, updates continuously). Used by elements that
 * represent "where you are now" — like the nav bar — so they always match
 * the cursor glow exactly, since both read the same live scroll progress.
 */
export function useScrollBlendColor() {
  const [rgb, setRgb] = useState(TONE_STOPS[0].c);

  useEffect(() => {
    let raf = null;
    const compute = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      setRgb(toneColorAt(progress));
      raf = null;
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
}

/**
 * usePositionAccent — a color FIXED to where an element actually sits in
 * the document (not the current scroll position). Used so that, within a
 * long section, an early card reads cooler and a later card reads warmer —
 * matching what the cursor glow shows as it passes each one — instead of
 * every element in a section sharing one flat color.
 * Returns [ref, { base, dim, soft }] — three CSS color strings.
 */
export function usePositionAccent() {
  const ref = useRef(null);
  const [colors, setColors] = useState({
    base: "rgb(76, 154, 255)",
    dim: "rgb(53, 115, 196)",
    soft: "rgb(156, 196, 255)",
  });

  useEffect(() => {
    const compute = () => {
      const node = ref.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const docY = rect.top + window.scrollY + rect.height / 2;
      const totalH = document.documentElement.scrollHeight;
      const t = totalH > 0 ? docY / totalH : 0;
      const base = toneColorAt(t);
      const dim = shade(base, -0.25);
      const soft = shade(base, 0.3);
      setColors({
        base: `rgb(${base.join(", ")})`,
        dim: `rgb(${dim.join(", ")})`,
        soft: `rgb(${soft.join(", ")})`,
      });
    };

    compute();
    window.addEventListener("resize", compute);
    // recompute after images/fonts settle and may shift layout
    const t1 = setTimeout(compute, 300);
    const t2 = setTimeout(compute, 1200);
    return () => {
      window.removeEventListener("resize", compute);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return [ref, colors];
}

/**
 * useEdgeFade — fades an element out as it scrolls toward/past the top of
 * the viewport, independent of any sticky sibling. Used to dissolve content
 * that should NOT follow a pinned element's motion — it just fades based
 * on its own natural (non-sticky) scroll position.
 */
export function useEdgeFade({ fadeZone = 220 } = {}) {
  const ref = useRef(null);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = null;

    const compute = () => {
      const node = ref.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const t = Math.min(Math.max(rect.top / fadeZone, 0), 1);
      setOpacity(t);
      raf = null;
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [fadeZone]);

  return [ref, opacity];
}

/**
 * useScrollFade — fades an element's opacity toward 0 as the user scrolls
 * through the final portion of its own height, so content dissolves away
 * rather than hard-clipping at the viewport edge. fadeStart is the
 * progress fraction (0-1) at which the fade begins.
 */
export function useScrollFade({ fadeStart = 0.55 } = {}) {
  const ref = useRef(null);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(max-width: 800px)").matches) return;

    let raf = null;

    const compute = () => {
      const node = ref.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrollable = rect.height - vh;
      if (scrollable <= 0) {
        setOpacity(1);
        return;
      }
      const progress = Math.min(Math.max(-rect.top / scrollable, 0), 1);
      if (progress < fadeStart) {
        setOpacity(1);
      } else {
        const t = (progress - fadeStart) / (1 - fadeStart);
        setOpacity(Math.max(1 - t, 0));
      }
      raf = null;
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [fadeStart]);

  return [ref, opacity];
}

/**
 * useStackCards — sticky-stacking scroll effect: as the user scrolls past
 * each card, it sticks near the top while the next card slides over it,
 * scaling the current one down slightly so it recedes. Implemented with a
 * single passive scroll listener + getBoundingClientRect (no animation
 * library, no Framer Motion useScroll/useTransform).
 */
export function useStackCards(count) {
  const containerRefs = useRef([]);
  const [scales, setScales] = useState(() => Array(count).fill(1));
  containerRefs.current = containerRefs.current.slice(0, count);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = null;

    const compute = () => {
      const vh = window.innerHeight;
      const next = containerRefs.current.map((node, i) => {
        if (!node) return 1;
        const rect = node.getBoundingClientRect();
        const scrollable = rect.height - vh;
        if (scrollable <= 0) return 1;
        const progress = Math.min(Math.max(-rect.top / scrollable, 0), 1);
        const targetScale = 1 - (count - 1 - i) * 0.03;
        return 1 - progress * (1 - targetScale);
      });
      setScales(next);
      raf = null;
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [count]);

  const setRef = (i) => (node) => {
    containerRefs.current[i] = node;
  };

  return { setRef, scales };
}

/**
 * useReveal — triggers a CSS class once an element scrolls into view.
 * Mirrors the "whileInView, once: true, margin -100px" pattern, but
 * implemented with plain Intersection Observer (no animation library).
 */
export function useReveal(options = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -100px 0px", threshold: 0.1, ...options }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

/**
 * useActiveSection — tracks which section id is currently most in view,
 * for highlighting the matching nav link.
 */
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
