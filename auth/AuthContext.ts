import { Database } from '@/types/global';
import supabase from '@/utils/supabase';
import { SupabaseClient, User } from '@supabase/supabase-js';
import { createContext } from 'react';

type Context = {
  user: User | null;
  setUser: (user: User | null) => void;
  supabase: SupabaseClient<Database>;
};

const context: Context = {
  user: null,
  setUser: () => {},
  supabase: supabase
};

export const AuthContext = createContext(context);
