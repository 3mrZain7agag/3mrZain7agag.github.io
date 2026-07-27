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
