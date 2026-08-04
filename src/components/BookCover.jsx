import { useState } from 'react';

import bookCover from '../assets/book-cover.png';

/*
 * Always renders with a valid src: falls back to a bundled placeholder when
 * src is missing or the network request fails (onError).
 *
 * alt is intentionally EMPTY: every cover on sits beside text that already
 * names the book (or, in the hero, is purely decorative), so an alt would
 * make a screen reader announce the same book twice.
 * Loading is always lazy and fetchPriority is left at the browser default (auto),
 * because no cover on this site is the LCP element.
 */
function BookCover({ src, imgClass }) {
  const [imgSrc, setImgSrc] = useState(src || bookCover);

  return (
    <img
      src={imgSrc}
      alt=""
      loading="lazy"
      decoding="async" // Allows browser to decode image async
      className={imgClass}
      onError={() => setImgSrc(bookCover)}
    />
  );
}

export default BookCover;
