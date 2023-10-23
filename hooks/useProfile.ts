'use client';

import { NewProfile, ProfileForm } from '@/types/global';
import supabase from '@/utils/supabase';
import { useCallback } from 'react';

function useProfile() {
  const createProfileFromUserId = useCallback(
    async (newProfile: NewProfile) => {
      const { data, error } = await supabase.from('Users').insert([newProfile]);

      if (error) throw new Error('Could not create profile from this userId');

      return data;
    },
    []
  );

  const getProfileFromUserId = useCallback(async (userId: string) => {
    const { data, error } = await supabase
      .from('Users')
      .select()
      .eq('id', userId);

    if (error)
      throw new Error('Could not retrieve the profile from this userId');

    return data;
  }, []);

  const uploadProfilePicture = useCallback(
    async (userId: string, file: File) => {
      const fileName = `/${userId}/${new Date().toISOString()}`;

      const { data, error } = await supabase.storage
        .from('Avatar')
        .upload(fileName, file);

      if (error)
        throw new Error(
          'There was an error uploading your profile picture. Please try again later.'
        );

      return `${process.env.NEXT_PUBLIC_SUPABASE_STORATE_URL}${data.path}`;
    },
    []
  );

  const updateProfile = useCallback(
    async (userId: string, profile: ProfileForm) => {
      const payload = {
        name: profile.name,
        picture: profile.picture,
        bio: profile.bio,
        links: profile.links.filter(link => link.url)
      };
      const { data, error } = await supabase
        .from('Users')
        .update(payload)
        .eq('id', userId);

      if (error)
        throw new Error(
          'There was an error updating your profile. Please try again later.'
        );

      return data;
    },
    []
  );

  return {
    createProfileFromUserId,
    getProfileFromUserId,
    uploadProfilePicture,
    updateProfile
  };
}

export default useProfile;
