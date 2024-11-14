import { Database, Profile } from '@/types/global';
import supabase from '@/utils/supabase';
import { SupabaseClient, User } from '@supabase/supabase-js';
import { createContext } from 'react';

type Context = {
  user: Profile | null;
  setUser: (user: Profile | null) => void;
  supabase: SupabaseClient<Database>;
};

const context: Context = {
  user: null,
  setUser: () => {},
  supabase: supabase
};

export const AuthContext = createContext(context);
