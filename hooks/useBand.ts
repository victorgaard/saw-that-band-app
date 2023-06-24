'use client';

import { Band } from '@/types/global';
import supabase from '@/utils/supabase';
import { useCallback } from 'react';

function useBand() {
  const getBand = useCallback(async (userId: string, bandId: string) => {
    const { data, error } = await supabase
      .from('Bands')
      .select()
      .eq('user_id', userId)
      .eq('id', bandId);

    if (error) throw new Error('Could not get the band');

    return data;
  }, []);

  const updateBand = useCallback(
    async (userId: string, bandId: string, payload: Band) => {
      const { data, error } = await supabase
        .from('Bands')
        .update({ concerts: payload.concerts, genre: payload.genre })
        .eq('user_id', userId)
        .eq('id', bandId);

      if (error) throw new Error(`Band could not be updated: ${error}`);

      return data;
    },
    []
  );

  return { getBand, updateBand };
}

export default useBand;
