'use client';

import { Token } from '@/app/api/spotify/token/route';
import { SpotifySearchResults } from '@/types/global';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from './useDebounce';

export const dynamic = 'force-dynamic';

async function getSpotifyToken() {
  const res = await fetch('/api/spotify/token', {
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error('Could not get spotify token');
  }

  return (await res.json()) as Token;
}

async function searchSpotify(token: string, query: string) {
  const res = await fetch(
    `/api/spotify/search?token=${token}&band=${encodeURIComponent(query)}`,
    {
      cache: 'no-store'
    }
  );

  if (!res.ok) {
    throw new Error('Could not search for bands');
  }

  return (await res.json()) as SpotifySearchResults;
}

function useSpotify(query: string) {
  const debouncedQuery = useDebounce(query.trim(), 700);

  const tokenQuery = useQuery({
    queryKey: ['spotify-token'],
    queryFn: getSpotifyToken,
    staleTime: 50 * 60 * 1000
  });

  const isWaitingForDebounce =
    query.trim().length > 0 && query.trim() !== debouncedQuery;

  const searchQuery = useQuery({
    queryKey: ['spotify-search', debouncedQuery],
    enabled: Boolean(debouncedQuery && tokenQuery.data?.access_token),
    queryFn: () => searchSpotify(tokenQuery.data!.access_token, debouncedQuery),
    select: data => data.artists.items
  });

  const searchLoading = isWaitingForDebounce || searchQuery.isPending;

  return {
    searchResults: searchQuery.data,
    searchLoading,
    searchError: searchQuery.error,
    tokenError: tokenQuery.error
  };
}

export default useSpotify;
