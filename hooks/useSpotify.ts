'use client';

import { Token } from '@/app/api/spotify/token/route';
import { useCallback } from 'react';

function useSpotify() {
  const getSpotifyToken = useCallback(async () => {
    const res = await fetch(`/api/spotify/token`);

    if (!res.ok) throw new Error('Could not get spotify token');

    const json = await res.json();
    const data: Token = json;
    return data;
  }, []);

  const search = useCallback(async (token: string, query: string) => {
    const res = await fetch(`/api/spotify/search?token=${token}&band=${query}`);

    if (!res.ok) throw new Error('Could not search for bands');

    const data = await res.json();
    return data;
  }, []);

  return { getSpotifyToken, search };
}

export default useSpotify;
