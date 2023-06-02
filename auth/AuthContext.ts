import { Database } from "@/types/supabase";
import supabase from "@/utils/supabase";
import { SupabaseClient } from "@supabase/supabase-js";
import { createContext } from "react";

export type User = {
  id: string;
  aud: string;
  confirmation_sent_at?: string;
  recovery_sent_at?: string;
  email_change_sent_at?: string;
  new_email?: string;
  new_phone?: string;
  invited_at?: string;
  action_link?: string;
  email?: string;
  phone?: string;
  created_at: string;
  confirmed_at?: string;
  email_confirmed_at?: string;
  phone_confirmed_at?: string;
  last_sign_in_at?: string;
  role?: string;
  updated_at?: string;
};

type Context = {
  user: User | null;
  setUser: (user: User | null) => void;
  supabase: SupabaseClient<Database>
};

const context: Context = {
  user: null,
  setUser: () => {},
  supabase: supabase
};

export const AuthContext = createContext(context);
