'use client';

import { Band, NewBand } from '@/types/global';
import supabase from '@/utils/supabase';
import { useCallback } from 'react';

function useBands() {
  const getAllBands = useCallback(async (userId: string) => {
    const { data, error } = await supabase
      .from('Bands')
      .select()
      .eq('user_id', userId)
      .order('band', { ascending: true });

    if (error) throw new Error('Could not load all bands');
    return data;
  }, []);

  const getBand = useCallback(async (userId: string, bandId: string) => {
    const { data, error } = await supabase
      .from('Bands')
      .select()
      .eq('user_id', userId)
      .eq('id', bandId);

    if (error) throw new Error('Could not load this band');

    return data;
  }, []);

  const addBand = useCallback(async (payload: NewBand) => {
    const { data, error } = await supabase
      .from('Bands')
      .insert([{ ...payload }]);

    if (error) throw new Error(`Band could not be updated: ${error}`);
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

  return { getAllBands, getBand, addBand, updateBand };
}

export default useBands;
