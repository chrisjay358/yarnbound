import { ALL_GENRES_URL, bookGenres } from '../data/bookGenres';
import { useReveal } from '../hooks/useReveal';

import styles from './SectionGenres.module.css';
import SectionHeader from './SectionHeader';

function SectionGenres() {
  const gridRef = useReveal();

  return (
    <section className="section" id="genres" aria-labelledby="genres-heading">
      <div className="container text-center">
        <SectionHeader
          id="genres-heading"
          tag="Genres"
          heading="Find Books By Genre"
          description="From thrilling mysteries to heartwarming romances, there's something here for every reader."
        />
      </div>

      <div className="container">
        <ul className={styles.genreBox} ref={gridRef}>
          {bookGenres.map(({ name, href, blurb, Icon }) => (
            <li key={name} className="reveal">
              <a
                href={href}
                className={styles.genreItem}
                target="_blank"
                rel="noopener"
              >
                <span className={styles.iconWrap}>
                  <Icon className={styles.genreIcon} aria-hidden="true" />
                </span>
                <h3 className={styles.genreName}>{name}</h3>
                <p className={styles.genreText}>{blurb}</p>
              </a>
            </li>
          ))}
        </ul>

        <p className={styles.allGenres}>
          <a
            href={ALL_GENRES_URL}
            className={styles.allGenresLink}
            target="_blank"
            rel="noopener"
          >
            See all genres <span aria-hidden="true">→</span>
          </a>
        </p>
      </div>
    </section>
  );
}

export default SectionGenres;
