import { useTrendingBooks } from '../hooks/useTrendingBooks';
import { HERO_COVER_LIMIT } from '../services/apiConfig';
import { APP_URL } from '../utils/helpers';

import BookCover from './BookCover';
import styles from './Hero.module.css';

const APP_SIGNUP_URL = `${APP_URL}/signup`;

function Hero() {
  /*
   * Daily so the covers change often. The trending section below shows the
   * first 6 of this same list; the hero takes the last 3, so a visitor never
   * sees the hero covers repeated when they scroll down.
   */
  const { books, isLoading } = useTrendingBooks('daily', HERO_COVER_LIMIT);

  // Show placeholders while loading OR if there aren't 3 covers to show, so
  // the fan never collapses to empty space on a slow/failed/short response.
  const showPlaceholders = isLoading || books.length < HERO_COVER_LIMIT;

  return (
    <div className={styles.hero}>
      <div className={styles.heroTextbox}>
        <h1 className={styles.primaryHeading}>
          Every reader has a half-remembered book.
        </h1>

        <p className={styles.heroDescription}>
          One line, one character, one feeling you can't shake — that's enough
          to find it again. Then keep every book you meet in one place.
        </p>

        <div className="btn-box">
          <a href="#genres" className="btn btn--primary">
            Browse collection
          </a>
          <a
            href={APP_SIGNUP_URL}
            className="btn btn--secondary btn--stretch"
            target="_blank"
            rel="noopener"
          >
            Join Book Club
          </a>
        </div>
      </div>

      <div className={styles.heroImgBox}>
        {showPlaceholders
          ? [1, 2, 3].map((slot) => (
              <div
                key={slot}
                className={`${styles.heroImg} ${styles[`heroImg${slot}`]} ${styles.heroImgPlaceholder}`}
                aria-hidden="true"
              />
            ))
          : books.map((book, i) => (
              // Decorative: the heading carries the message, not these specific
              // book covers — so alt="".
              <BookCover
                key={book.id}
                src={book.coverUrl}
                imgClass={`${styles.heroImg} ${styles[`heroImg${i + 1}`]}`}
              />
            ))}
      </div>
    </div>
  );
}

export default Hero;
