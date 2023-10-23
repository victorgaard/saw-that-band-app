'use client';

import { Token } from '@/app/api/spotify/token/route';
import { SpotifySearchResults } from '@/types/global';
import { useCallback } from 'react';

function useSpotify() {
  const getSpotifyToken = useCallback(async () => {
    const res = await fetch(`/api/spotify/token`);

    if (!res.ok) throw new Error('Could not get spotify token');

    const data: Token = await res.json();
    return data;
  }, []);

  const search = useCallback(async (token: string, query: string) => {
    const res = await fetch(`/api/spotify/search?token=${token}&band=${query}`);

    if (!res.ok) throw new Error('Could not search for bands');

    const data: SpotifySearchResults = await res.json();
    return data;
  }, []);

  return { getSpotifyToken, search };
}

export default useSpotify;
