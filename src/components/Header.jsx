import { useEffect, useRef, useState } from 'react';

import styles from './Header.module.css';
import Hero from './Hero';
import Navbar from './Navbar';

function Header() {
  const headerRef = useRef(null);
  const navRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    // Measure the navbar's real height
    const navHeight = navRef.current?.offsetHeight ?? 0;

    /*
     * Header watch: observe the full-height header. When it scrolls out of
     * view (minus a navHeight margin so the nav sticks slightly early), flip the
     * nav to sticky.
     */
    const observer = new IntersectionObserver(
      ([entry]) => setIsSticky(!entry.isIntersecting),
      { root: null, rootMargin: `-${navHeight}px`, threshold: 0 },
    );
    observer.observe(el);

    // Without this, every mount leaks a live observer (StrictMode doubles it).
    return () => observer.disconnect();
  }, []);

  return (
    <header
      id="top"
      ref={headerRef}
      className={`${styles.header} ${isSticky ? styles.sticky : ''}`}
    >
      <Navbar ref={navRef} isSticky={isSticky} />
      <Hero />
    </header>
  );
}

export default Header;
