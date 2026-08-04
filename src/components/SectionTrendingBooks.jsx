import { useState } from 'react';

import { useReveal } from '../hooks/useReveal';
import { useTrendingBooks } from '../hooks/useTrendingBooks';

import BookCover from './BookCover';
import SectionHeader from './SectionHeader';
import styles from './SectionTrendingBooks.module.css';

const TIMEFRAMES = [
  { id: 'daily', title: 'Today', heading: "Today's" },
  { id: 'weekly', title: 'This Week', heading: "This Week's" },
  { id: 'monthly', title: 'This Month', heading: "This Month's" },
  { id: 'yearly', title: 'This Year', heading: "This Year's" },
];

const BOOK_SKELETON_COUNT = 6;

function SectionTrendingBooks() {
  const [timeframe, setTimeframe] = useState('daily');
  const { books, isLoading, isError } = useTrendingBooks(timeframe);
  const gridRef = useReveal();

  const heading =
    TIMEFRAMES.find((t) => t.id === timeframe)?.heading ?? "Today's";

  const hasFailed = isError || (!isLoading && books.length === 0);

  function handleSelect(id) {
    if (id === timeframe) return;
    setTimeframe(id);
  }

  return (
    <section
      className="section section-inverse"
      id="trending"
      aria-labelledby="trending-heading"
    >
      <div className="container text-center">
        <SectionHeader
          id="trending-heading"
          tag="Trending"
          heading={`${heading} Top Picks`}
          description="Discover the books everyone's talking about right now."
        />
      </div>

      <div className={`container ${styles.content}`}>
        <TabbedMenu active={timeframe} onSelect={handleSelect} />

        {hasFailed ? (
          <p className="section-error">
            Couldn't load trending books right now.
          </p>
        ) : (
          <div
            className={styles.bookBox}
            ref={gridRef}
            aria-live="polite"
            aria-busy={isLoading}
          >
            {isLoading
              ? Array.from({ length: BOOK_SKELETON_COUNT }).map((_, i) => (
                  <div
                    key={i}
                    className={styles.bookSkeleton}
                    aria-hidden="true"
                  />
                ))
              : books.map((book) => <Book key={book.id} book={book} />)}
          </div>
        )}
      </div>
    </section>
  );
}

function TabbedMenu({ active, onSelect }) {
  return (
    <div className={styles.menuBox} role="tablist" aria-label="Timeframe">
      {TIMEFRAMES.map((t) => (
        <button
          key={t.id}
          type="button"
          role="tab"
          aria-selected={t.id === active}
          onClick={() => onSelect(t.id)}
          className={`${styles.menu} ${t.id === active ? styles.active : ''}`}
        >
          {t.title}
        </button>
      ))}
    </div>
  );
}

function Book({ book }) {
  const title = book.subtitle ? `${book.title}: ${book.subtitle}` : book.title;

  return (
    <a
      href={book.link}
      target="_blank"
      rel="noopener"
      className={`${styles.book} reveal`}
    >
      <BookCover src={book.coverUrl} imgClass={styles.bookImg} />
      <div className={styles.bookContent}>
        <h3 className={styles.bookTitle}>{title}</h3>
        {book.authors?.length > 0 && (
          <p className={styles.bookAuthor}>
            By <BookAuthors authors={book.authors} />
          </p>
        )}

        <div className={styles.bookMeta}>
          {book.firstPublishYear && (
            <p className={styles.bookPublish}>
              First published in {book.firstPublishYear}
            </p>
          )}
          {book.editionsCount > 0 && (
            <p className={styles.bookEditions}>{book.editionsCount} editions</p>
          )}
        </div>
      </div>
    </a>
  );
}

function BookAuthors({ authors }) {
  if (!authors?.length) return null;

  let text;
  if (authors.length === 1) {
    text = authors[0];
  } else if (authors.length === 2) {
    text = `${authors[0]} and ${authors[1]}`;
  } else {
    text = `${authors.slice(0, -1).join(', ')}, and ${authors.at(-1)}`;
  }

  return <span className={styles.authorName}>{text}</span>;
}

export default SectionTrendingBooks;
