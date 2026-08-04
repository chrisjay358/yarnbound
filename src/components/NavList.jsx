import { useActiveSection } from '../hooks/useActiveSection';

import styles from './NavList.module.css';

const NAV_LINKS = [
  { label: 'Home', href: '#top', id: 'top' },
  { label: 'Genres', href: '#genres', id: 'genres' },
  { label: 'Trending', href: '#trending', id: 'trending' },
  { label: 'Authors', href: '#authors', id: 'authors' },
  { label: 'Testimonials', href: '#testimonials', id: 'testimonials' },
];

const SECTION_IDS = NAV_LINKS.map((link) => link.id);

function NavList({ id, isOpen, onClose }) {
  const activeId = useActiveSection(SECTION_IDS);

  return (
    <ul id={id} className={`${styles.navList} ${isOpen ? styles.open : ''}`}>
      {NAV_LINKS.map((link) => {
        const isActive = activeId === link.id;
        return (
          <li key={link.href}>
            <a
              href={link.href}
              onClick={onClose}
              className={`${styles.navLink} ${isActive ? styles.active : ''}`}
              /* aria-current is the audio equivalent of the active underline —
                 it tells a screen reader which section the reader is in. */
              aria-current={isActive ? 'true' : undefined}
            >
              {link.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export default NavList;
