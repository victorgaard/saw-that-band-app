export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export type Concert = {
  date: string;
  location: string;
};

export type Database = {
  public: {
    Tables: {
      Bands: {
        Row: {
          band: string;
          concerts: Concert[];
          genre: string[];
          id: string;
          picture: string;
          user_id: string;
        };
        Insert: {
          band: string;
          concerts: Concert[];
          genre: string[];
          id?: string;
          picture: string;
          user_id?: string;
        };
        Update: {
          band?: string;
          concerts?: Concert[];
          genre?: string[];
          id?: string;
          picture?: string;
          user_id?: string;
        };
      };
      Waitlist: {
        Row: {
          created_at: string;
          email: string;
          id: string;
          username: string;
        };
        Insert: {
          created_at?: string;
          email: string;
          id?: string;
          username: string;
        };
        Update: {
          created_at?: string;
          email?: string;
          id?: string;
          username?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

export type Bands = Database['public']['Tables']['Bands']['Row'][];
export type Band = Database['public']['Tables']['Bands']['Row'];
