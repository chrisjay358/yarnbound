import { useState } from 'react';

/*
 * Open Library often has no photo for an author — and instead of a 404 it
 * serves a 1×1 blank pixel, which a normal onError never catches. So we check
 * the loaded image's natural size (onLoad) AND catch real errors (onError),
 * falling back to an initials avatar in both cases.
 *
 * alt is intentionally EMPTY and the fallback is aria-hidden: every photo on
 * this site sits beside the author's name, so announcing it here would repeat
 * the name. Loading is always lazy; fetchPriority stays at the browser default.
 */
function AuthorPhoto({ src, initials, imgClass, fallbackClass }) {
  const [hasValidImage, setHasValidImage] = useState(!!src);

  function handleLoad(e) {
    const { naturalHeight, naturalWidth } = e.currentTarget;
    if (naturalHeight <= 1 || naturalWidth <= 1) setHasValidImage(false);
  }

  if (hasValidImage) {
    return (
      <img
        src={src}
        alt=""
        loading="lazy"
        decoding="async" // Allows browser to decode image async
        className={imgClass}
        onLoad={handleLoad}
        onError={() => setHasValidImage(false)}
      />
    );
  }

  return (
    <div className={fallbackClass} aria-hidden="true">
      <span>{initials}</span>
    </div>
  );
}

export default AuthorPhoto;
