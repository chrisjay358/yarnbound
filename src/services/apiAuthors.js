import { formatAuthorResults } from '../utils/helpers';

import { fetchTrendingBooks } from './apiBooks';
import {
  AUTHOR_BOOK_RESULTS_LIMIT,
  FEATURED_AUTHORS_LIMIT,
  withTimeout,
} from './apiConfig';
import { buildAuthorSearchEndpoint } from './apiEndpointBuilders';


export async function getFeaturedAuthors(signal) {
  const trendingData = await fetchTrendingBooks({
    timeframe: 'monthly',
    signal,
    limit: AUTHOR_BOOK_RESULTS_LIMIT,
  });


  const extractedAuthorKeys = [
    ...new Set(
      (trendingData ?? []).map((doc) => doc?.author_key?.[0]).filter(Boolean),
    ),
  ].slice(0, FEATURED_AUTHORS_LIMIT);

  if (extractedAuthorKeys.length === 0) return [];

  const authorResults = await fetchAuthorResults(extractedAuthorKeys, signal);


  const formattedAuthors = formatAuthorResults(authorResults);


  return formattedAuthors;
}

export async function fetchAuthorResults(authorIds, signal) {
  const authorResultsRes = await fetch(buildAuthorSearchEndpoint(authorIds), {
    signal: withTimeout(signal),
  });



  if (!authorResultsRes.ok) {
    throw new Error(
      `HTTP ${authorResultsRes.status}: Failed to fetch author results`,
    );
  }

  const authorResultsData = await authorResultsRes.json();



  return authorResultsData?.docs ?? [];
}
