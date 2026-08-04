import { useState } from 'react';

import SectionHeader from './SectionHeader';
import styles from './SectionNewsletter.module.css';

function SectionNewsletter() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');

  function handleSubmit(e) {
    // stop the native GET reload
    e.preventDefault();
    if (!email) return;

    setSubmitted(true);
  }

  return (
    <section className="section section-line" id="newsletter">
      <div className="container">
        <SectionHeader
          tag="Newsletter"
          heading="Stay in the loop"
          description="Occasional emails with new features and reading ideas. No spam, unsubscribe anytime."
        />

        {submitted ? (
          <p className={styles.success} role="status">
            Thanks — you're on the list. We'll be in touch.
          </p>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <label htmlFor="newsletter-email" className={styles.srOnly}>
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className={styles.formInput}
            />
            <button type="submit" className={styles.formBtn}>
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

export default SectionNewsletter;
