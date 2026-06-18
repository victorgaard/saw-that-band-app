import supabase from '@/utils/supabase';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  const { data, error } = await supabase
    .from('Bands')
    .select()
    .eq('user_id', userId);

  if (error) return NextResponse.json({ error: 'Invalid userId' });

  return NextResponse.json(data);
}
