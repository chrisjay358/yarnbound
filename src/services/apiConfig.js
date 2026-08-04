export const REQUEST_TIMEOUT_MS = 15_000;

// The API root
export const API_BASE_URL = 'https://openlibrary.org';

export const BOOK_RESULTS_LIMIT = 6;
// Daily fetches 3 extra so the hero can show covers 6–8 (books the trending
// grid, which shows the first 6, never displays) — no duplicate covers.
export const DAILY_BOOK_RESULTS_LIMIT = 9;
export const HERO_COVER_LIMIT = DAILY_BOOK_RESULTS_LIMIT - BOOK_RESULTS_LIMIT;

export const AUTHOR_BOOK_RESULTS_LIMIT = 9;
export const FEATURED_AUTHORS_LIMIT = 6;

export const ENDPOINTS = {
  TRENDING: `${API_BASE_URL}/search`,
  AUTHORS_SEARCH: `${API_BASE_URL}/search/authors.json`,
};

// Query strings — filter conditions for the Open Library search API
export const TRENDING_QUERIES = {
  // Books with the biggest activity spike today vs their personal baseline
  daily:
    'trending_score_hourly_sum:[10 TO *] readinglog_count:[4 TO *] language:eng',

  // Books with the biggest activity spike this week vs their 7-day baseline
  weekly: 'trending_z_score:{0 TO *] readinglog_count:[4 TO *] language:eng', // {0 = exclusive lower bound (Lucene): z-score strictly greater than 0

  // Books trending with proven reader engagement (200+ log entries)
  monthly:
    'trending_score_hourly_sum:[10 TO *] readinglog_count:[200 TO *] language:eng',

  // Books trending with meaningful reader engagement (50+ log entries)
  yearly: 'trending_z_score:{0 TO *] readinglog_count:[50 TO *] language:eng', // {0 = exclusive lower bound (Lucene): z-score strictly greater than 0
};

// Sort keys — must match Open Library's exact sort parameter values
export const TRENDING_SORT = {
  daily: 'trending', // z-score — biggest spike today vs baseline
  weekly: 'trending', // z-score — biggest spike this week vs 7-day baseline
  monthly: 'readinglog', // trending this month, ranked by cumulative reading engagement
  yearly: 'readinglog', // trending this year, ranked by cumulative reading engagement
};

// Data Fields / Query Parameters
export const FIELDS = {
  BOOK: 'key,title,subtitle,author_name,author_key,cover_i,editions,first_publish_year,edition_count',
};

/**
 * Wraps a fetch's cancellation signal with a deadline.
 *
 * Every fetch in this app can be cancelled for two reasons:
 *   1. The request became OUTDATED — React Query fires the signal it gave
 *      the queryFn (new keystroke, page change, unmount). Throws
 *      'AbortError'; React Query swallows it. Never an error UI.
 *   2. The request is TOO SLOW — the deadline created here fires after
 *      REQUEST_TIMEOUT_MS. Throws 'TimeoutError'; flows to ErrorDisplay
 *      as a real failure ("Request Timed Out" → ServerError).
 *
 * fetch() accepts only one signal, so AbortSignal.any() merges both:
 * whichever fires first cancels the request. When a caller has no signal
 * (a fetch outside React Query), the deadline alone is used.
 *
 * USAGE — one-word change at every fetch site:
 *   before:  fetch(url, { signal })
 *   after:   fetch(url, { signal: withTimeout(signal) })
 *
 * @param {AbortSignal} [signal] - the caller's cancellation signal
 *   (React Query's, threaded through the fetch function's parameters)
 * @param {number} [ms=REQUEST_TIMEOUT_MS] - deadline in milliseconds
 * @returns {AbortSignal} one merged signal carrying both cancel reasons
 */
export function withTimeout(signal, ms = REQUEST_TIMEOUT_MS) {
  const deadline = AbortSignal.timeout(ms);
  return signal ? AbortSignal.any([signal, deadline]) : deadline;
}
