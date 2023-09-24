'use client';

import supabase from '@/utils/supabase';
import { useCallback } from 'react';

function useProfile() {
  const getProfileFromUserId = useCallback(async (userId: string) => {
    const { data: profile, error } = await supabase
      .from('Users')
      .select()
      .eq('id', userId);

    if (error)
      throw new Error('Could not retrieve the profile from this userId');
    return profile;
  }, []);

  return { getProfileFromUserId };
}

export default useProfile;
