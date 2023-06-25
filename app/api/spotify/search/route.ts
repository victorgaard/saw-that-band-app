import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');
  const band = searchParams.get('band');

  const res = await fetch(
    `${process.env.SPOTIFY_URL}/search?type=artist&limit=20&q=${band}`,
    {
      cache: 'no-cache',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
  );

  const data = await res.json();
  console.log(data);

  return NextResponse.json(data);
}
