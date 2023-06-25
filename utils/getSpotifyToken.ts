import { Token } from '@/app/api/spotify/token/route';

async function getSpotifyToken() {
  const res = await fetch(`/api/spotify/token`);

  if (!res.ok) throw new Error('Could not get spotify token');

  const json = await res.json();
  const data: Token = json;

  return data;
}

export default getSpotifyToken;
