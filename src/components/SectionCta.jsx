import { APP_URL } from '../utils/helpers';

import styles from './SectionCta.module.css';

const APP_SIGNUP_URL = `${APP_URL}/signup`;

function SectionCta() {
  return (
    <section className="section section-cta">
      <div className="container text-center">
        <h2 className={styles.ctaHeading}>Start your reading life today</h2>
        <p className={styles.ctaDescription}>
          Create a free account to track what you read, build lists, and follow
          the authors you love — all in one place.
        </p>
        <a
          href={APP_SIGNUP_URL}
          className={`btn ${styles.ctaBtn}`}
          target="_blank"
          rel="noopener"
        >
          Create your free account
        </a>
      </div>
    </section>
  );
}

export default SectionCta;
