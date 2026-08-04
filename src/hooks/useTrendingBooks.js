import { useQuery } from '@tanstack/react-query';

import { getTrendingBooks } from '../services/apiBooks';
import { BOOK_RESULTS_LIMIT } from '../services/apiConfig';

export function useTrendingBooks(timeframe, limit) {
  const {
    data: books = [],
    isPending: isLoading,
    isError,
  } = useQuery({
    queryKey: ['trendingBooks', timeframe],
    queryFn: ({ signal }) => getTrendingBooks(timeframe, signal),
  });

  const resolvedBooks = limit
    ? books.slice(-limit)
    : books.slice(0, BOOK_RESULTS_LIMIT);

  return { books: resolvedBooks, isLoading, isError };
}
