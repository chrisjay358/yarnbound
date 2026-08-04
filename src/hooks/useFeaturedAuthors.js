import { useQuery } from '@tanstack/react-query';

import { getFeaturedAuthors } from '../services/apiAuthors';

export function useFeaturedAuthors() {
  const {
    data: authors = [],
    isPending: isLoading, // read v5's isPending; expose as isLoading
    isError,
  } = useQuery({
    queryKey: ['featuredAuthors'],
    queryFn: ({ signal }) => getFeaturedAuthors(signal),
  });

  return { authors, isLoading, isError };
}
