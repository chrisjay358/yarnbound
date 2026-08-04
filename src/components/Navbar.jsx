import { useState } from 'react';
import { HiMenu, HiOutlineX } from 'react-icons/hi';

import Logo from './Logo';
import styles from './Navbar.module.css';
import NavList from './NavList';

function Navbar({ isSticky = false, ref }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleToggle() {
    setIsOpen((open) => !open);
  }

  return (
    /*
     * aria-label names this landmark — a page with more than one <nav> would
     * otherwise announce "navigation" twice with no way to tell them apart.
     * Sticky is a scoped module class driven by Header's IntersectionObserver
     * via prop.
     */
    <nav
      aria-label="Main"
      className={`${styles.navbar} ${isSticky ? styles.sticky : ''}`}
      ref={ref}
    >
      <Logo />

      <NavList
        id="primary-navigation"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />

      <button
        type="button"
        className={styles.btnMobileNav}
        onClick={handleToggle}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen} // reports drawer state
        aria-controls="primary-navigation" // names what it opens
      >
        {isOpen ? (
          <HiOutlineX className={styles.iconMobileNav} aria-hidden="true" />
        ) : (
          <HiMenu className={styles.iconMobileNav} aria-hidden="true" />
        )}
      </button>
    </nav>
  );
}

export default Navbar;
