export const APP_URL = 'https://yarnbound-marketplace.vercel.app';

function buildEntityDetailsPath({ entity, id, slug }) {
  // Guard clause
  if (!id) return null;

  const slugPath = slug ? `/${slug}` : '';

  return `${APP_URL}/${entity}/${id}${slugPath}`;
}

function getNameInitials(fullName) {
  // Falsy input (null/undefined/"") can't yield initials — bail with a glyph
  // that reads as "no data" rather than crashing on .trim() below.
  if (!fullName) return '?';

  // Split on any whitespace run so double spaces and tabs don't create
  // empty tokens: "  bell   hooks " → ["bell", "hooks"].
  const words = fullName.trim().split(/\s+/);

  // Pulls the first Unicode *letter* from a word, skipping leading
  // punctuation/digits. \p{L} matches letters in any script (Latin,
  // Cyrillic, CJK, accented), so "Çelik" → "Ç" and "(pseud)" → "P".
  // Returns null when a token has no letter at all.
  const firstLetterOf = (word) =>
    word.match(/\p{L}/u)?.[0]?.toUpperCase() ?? null;

  // Single-word name (mononym): one initial is the correct, honest output.
  if (words.length === 1) {
    return firstLetterOf(words[0]) ?? '?';
  }

  // Multi-word: first initial of the first word + first initial of the last.
  // Middle names are intentionally ignored — two initials is the avatar norm.
  const first = firstLetterOf(words[0]);
  const last = firstLetterOf(words.at(-1));

  // If either end-word had no letter (e.g. "J. (creator)"), fall back to
  // whichever side produced a letter, then to "?" if neither did.
  return (first ?? '') + (last ?? '') || '?';
}

export function formatBookResults(results) {
  // Guard clause
  if (!Array.isArray(results) || results.length === 0) {
    return [];
  }

  const bookResults = results.map((result, i) => {
    // Get edition data
    const edition = result.editions?.docs?.[0] ?? null;
    const editionKey = edition?.key?.replace(/\D/g, '') ?? null; // Extract digits only (OL123A → 123)
    const titleSlug = createSlug(edition?.title || result.title);

    return {
      authors: result?.author_name,
      coverUrl: edition?.cover_i
        ? `https://covers.openlibrary.org/b/id/${edition.cover_i}-L.jpg`
        : null,
      id: editionKey,
      editionsCount: result.edition_count ?? 0,
      firstPublishYear: result.first_publish_year || null,
      link: buildEntityDetailsPath({
        entity: 'books',
        id: editionKey,
        slug: titleSlug,
      }),

      subtitle: edition?.subtitle || result?.subtitle,
      title: edition?.title || result.title,
    };
  });

  return bookResults;
}

export function formatAuthorResults(results) {
  // Guard clause
  if (!Array.isArray(results) || results.length === 0) {
    return [];
  }

  const authorResults = results.map((result) => {
    // Kebab case & lowercase for URL best practice
    const nameSlug = createSlug(result?.name);

    const key = result.key.replace(/\D/g, ''); //Remove anything that is not a number

    return {
      name: result.name,
      photoUrl: `https://covers.openlibrary.org/a/olid/${result.key}-M.jpg`,
      id: key,
      initials: getNameInitials(result.name),
      link: buildEntityDetailsPath({
        entity: 'authors',
        id: key,
        slug: nameSlug,
      }),
      topBook: result.top_work,
    };
  });

  return authorResults;
}

function createSlug(input) {
  // Guard clause
  if (!input) return null;

  // Kebab case & lowercase for URL best practice
  return (
    input
      .toLowerCase() // Convert to lowercase for canonical consistency
      .trim() // Remove leading and trailing whitespace
      .normalize('NFC') // Normalize Unicode characters to canonical composed form ("é" as one char)
      .replace(/[\/]+/g, '-')
      .replace(/[^\p{L}\p{N}\s\-()]/gu, '') // Remove anything NOT:
      // - \p{L} = any letter (Greek, Arabic, Chinese, etc.)
      // - \p{N} = any number
      // - whitespace
      // - dash
      // "u" enables Unicode
      // Everything else (apostrophes, punctuation, symbols) is removed.
      .replace(/\s+/g, '-') // Replace one or more spaces with single dash
      .replace(/-+/g, '-') // Replace multiple dashes with single dash
      .replace(/^-+|-+$/g, '') // Remove leading OR trailing dashes
  );
}

export function normalizeApiKey(id) {
  // Every OL identifier follows the pattern OL{number}{suffix}.
  const suffix = 'A'; // This is for authors

  const key = String(id);

  // Already canonical — return immediately, no work needed
  if (key.startsWith('OL') && key.endsWith(suffix)) return key;

  // Strip whatever is present and rebuild correctly
  const numeric = key
    .replace(/^OL/i, '')
    .replace(new RegExp(`${suffix}$`, 'i'), '');

  return `OL${numeric}${suffix}`;
}
