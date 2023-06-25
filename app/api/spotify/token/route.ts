import { NextResponse } from 'next/server';

export type Token = {
  clientId: string;
  accessToken: string;
  accessTokenExpirationTimestampMs: number;
  isAnonymous: boolean;
};

export async function GET() {
  const res = await fetch(`${process.env.SPOTIFY_REQUEST_TOKEN_URL}/`, {
    cache: 'no-store',
    headers: {
      Accept: 'application/json'
    }
  });

  if (!res.ok) return null;

  const data: Token = await res.json();
  return NextResponse.json(data);
}