import { useFeaturedAuthors } from '../hooks/useFeaturedAuthors';
import { useReveal } from '../hooks/useReveal';

import AuthorPhoto from './AuthorPhoto';
import styles from './SectionFeaturedAuthors.module.css';
import SectionHeader from './SectionHeader';

const AUTHOR_SKELETON_COUNT = 6;

function SectionFeaturedAuthors() {
  const { authors, isLoading, isError } = useFeaturedAuthors();
  const gridRef = useReveal();

  const hasFailed = isError || (!isLoading && authors.length === 0);

  return (
    <section className="section" id="authors" aria-labelledby="authors-heading">
      <div className="container text-center">
        <SectionHeader
          id="authors-heading"
          tag="Featured authors"
          heading="Meet the Writers"
          description="Discover the brilliant minds behind your favorite books."
        />
      </div>

      <div className="container">
        {hasFailed ? (
          <p className="section-error">Couldn't load authors right now.</p>
        ) : (
          <div className={styles.authorBox} ref={gridRef} aria-busy={isLoading}>
            {isLoading
              ? Array.from({ length: AUTHOR_SKELETON_COUNT }).map((_, i) => (
                  <div
                    key={i}
                    className={styles.authorSkeleton}
                    aria-hidden="true"
                  />
                ))
              : authors.map((author) => (
                  <Author key={author.id} author={author} />
                ))}
          </div>
        )}
      </div>
    </section>
  );
}

function Author({ author }) {
  return (
    <a
      href={author.link}
      className={`${styles.author} reveal`}
      target="_blank"
      rel="noopener"
    >
      <figure className={styles.authorFigure}>
        <AuthorPhoto
          src={author.photoUrl}
          initials={author.initials}
          imgClass={styles.authorImg}
          fallbackClass={styles.authorInitials}
        />
        <figcaption className={styles.authorDetails}>
          <h3 className={styles.authorName}>{author.name}</h3>
          {author.topBook && (
            <p className={styles.authorBook}>Known for "{author.topBook}"</p>
          )}
        </figcaption>
      </figure>
    </a>
  );
}

export default SectionFeaturedAuthors;
