import { APP_URL } from '../utils/helpers';

import styles from './Footer.module.css';
import Logo from './Logo';

const FOOTER_NAV = [
  {
    heading: 'Discover',
    links: [
      { label: 'Trending', href: `${APP_URL}/trending/daily` },
      { label: 'Genres', href: `${APP_URL}/genres` },
      { label: 'Lists', href: `${APP_URL}/lists` },
      { label: 'Search', href: `${APP_URL}/search` },
    ],
  },
  {
    heading: 'Account',
    links: [
      { label: 'Sign in', href: `${APP_URL}/login` },
      { label: 'Create account', href: `${APP_URL}/signup` },
    ],
  },
  {
    heading: 'Support',
    links: [{ label: 'Contact us', href: `${APP_URL}/contact` }],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Terms of Service', href: `${APP_URL}/terms` },
      { label: 'Privacy Policy', href: `${APP_URL}/privacy` },
    ],
  },
];

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className={styles.logoCol}>
          <Logo />
          <p className={styles.description}>
            Your destination for literary exploration. Discover, read, and
            connect with fellow book lovers.
          </p>
        </div>

        <div className={styles.navColBox}>
          {FOOTER_NAV.map((col) => (
            <nav key={col.heading} className={styles.navCol}>
              <p className={styles.footerHeading}>{col.heading}</p>
              <ul className={styles.footerNav}>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className={styles.footerLink}
                      target="_blank"
                      rel="noopener"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className={styles.copyrightBox}>
        <div className="container">
          <div className={styles.copyrightContent}>
            <p>© {new Date().getFullYear()} Yarnbound. All rights reserved.</p>
            <p>Designed and developed with ❤️ for book lovers everywhere</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
