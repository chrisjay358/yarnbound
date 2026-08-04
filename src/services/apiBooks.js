import { formatBookResults } from '../utils/helpers';

import {
  BOOK_RESULTS_LIMIT,
  DAILY_BOOK_RESULTS_LIMIT,
  withTimeout,
} from './apiConfig';
import { buildTrendingBooksEndpoint } from './apiEndpointBuilders';

export async function getTrendingBooks(timeframe, signal) {
  const limit =
    timeframe === 'daily' ? DAILY_BOOK_RESULTS_LIMIT : BOOK_RESULTS_LIMIT;

  const trendingBooksData = await fetchTrendingBooks({
    timeframe,
    signal,
    limit,
  });

  const formattedBooks = formatBookResults(trendingBooksData);

  return formattedBooks;
}

export async function fetchTrendingBooks({
  timeframe = 'daily',
  signal,
  limit,
}) {
  const trendingBooksRes = await fetch(
    buildTrendingBooksEndpoint(timeframe, limit),
    {
      signal: withTimeout(signal),
    },
  );

  if (!trendingBooksRes.ok) {
    throw new Error(
      `HTTP ${trendingBooksRes.status}: Failed to fetch trending books`,
    );
  }

  const trendingBooksData = await trendingBooksRes.json();

  return trendingBooksData.docs ?? [];
}
