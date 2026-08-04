import { useEffect, useRef } from 'react';

/*
 * Scroll-reveal. Attach the returned ref to a container; every descendant
 * with the class `.reveal` fades + rises into view as it enters the viewport
 * (the .reveal / .is-visible rules live in index.css).
 *
 * WHY A MUTATION OBSERVER: the cards in async sections (trending, authors)
 * don't exist when this hook first runs — loading skeletons are on screen,
 * and the real `.reveal` cards only appear once the fetch resolves. An
 * approach that scans the container only on mount finds only skeletons and
 * never sees the cards that arrive later, so they stay at opacity: 0 forever.
 * The MutationObserver watches the container for children added at ANY time
 * and reveals those too — so this works whether content is static (genres)
 * or arrives after a network request.
 *
 * Each element reveals once, then is unobserved. `stagger` adds a per-card
 * delay so a row cascades in instead of popping all at once.
 */
export function useReveal(stagger = 60) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.15 },
    );

    // Give a card its stagger delay from its DOM position, then watch it.
    // Skip cards already revealed so a re-scan never resets them.
    function observe(el) {
      if (el.classList.contains('is-visible')) return;
      const index = [...container.querySelectorAll('.reveal')].indexOf(el);
      el.style.setProperty('--reveal-delay', `${index * stagger}ms`);
      io.observe(el);
    }

    // 1) Cards already in the DOM (static content, e.g. genres).
    container.querySelectorAll('.reveal').forEach(observe);

    // 2) Cards added later (async content replacing skeletons).
    const mo = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType !== Node.ELEMENT_NODE) return;
          if (node.matches('.reveal')) observe(node);
          node.querySelectorAll('.reveal').forEach(observe);
        });
      });
    });
    mo.observe(container, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [stagger]);

  return containerRef;
}
