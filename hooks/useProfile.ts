'use client';

import { NewProfile, ProfileForm } from '@/types/global';
import supabase from '@/utils/supabase';
import { useCallback } from 'react';

function useProfile() {
  const checkIfUsernameIsReservedAndUserHasRightsToUse = useCallback(
    async (email: string, username: string) => {
      const { data, error } = await supabase
        .from('Waitlist')
        .select()
        .eq('username', username);

      if (error) throw new Error('Could not retrieve the username');

      if (data.length === 0) return { hasRightsToUse: true };

      const res = data[0];
      if (res.email === email) return { hasRightsToUse: true };

      return { hasRightsToUse: false };
    },
    []
  );

  const checkIfUsernameExists = useCallback(async (username: string) => {
    const { data, error } = await supabase
      .from('Users')
      .select('username')
      .eq('username', username);

    if (error) throw new Error('Could not retrieve the username');
    if (data.length > 0) return true;
    return false;
  }, []);

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
    checkIfUsernameIsReservedAndUserHasRightsToUse,
    checkIfUsernameExists,
    createProfileFromUserId,
    getProfileFromUserId,
    uploadProfilePicture,
    updateProfile
  };
}

export default useProfile;
