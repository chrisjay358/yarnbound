import { normalizeApiKey } from '../utils/helpers';

import {
  ENDPOINTS,
  FIELDS,
  TRENDING_QUERIES,
  TRENDING_SORT,
} from './apiConfig';

export function buildTrendingBooksEndpoint(timeframe, limit) {
  const query = `${TRENDING_QUERIES[timeframe]} cover_i:*`;

  return `${ENDPOINTS.TRENDING}.json?q=${encodeURIComponent(query)}&sort=${TRENDING_SORT[timeframe]}&fields=${FIELDS.BOOK}&limit=${limit}`;
}

export function buildAuthorSearchEndpoint(authorIds) {
  const ids = Array.isArray(authorIds) ? authorIds : [authorIds];

  const keyQuery = ids
    .map((id) => {
      // 1. Force to string and clean any whitespace
      const cleanId = String(id || '').trim();

      // 2. If it already starts with '/authors/', keep it as is
      if (cleanId.startsWith('/authors/')) {
        return cleanId;
      }

      // 3. Otherwise, safely normalize the ID and prepend the path
      return `/authors/${normalizeApiKey(cleanId)}`;
    })
    .join(' OR ');

  return `${ENDPOINTS.AUTHORS_SEARCH}?q=key:(${encodeURIComponent(keyQuery)})`;
}
