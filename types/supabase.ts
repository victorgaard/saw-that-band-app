export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export type Concerts = {
  date: string;
  location: string;
};

export type Database = {
  public: {
    Tables: {
      Bands: {
        Row: {
          band: string;
          concerts: Concerts[];
          genre: string[];
          id: string;
          picture: string;
          user_id: string;
        };
        Insert: {
          band: string;
          concerts: Concerts[];
          genre: string[];
          id?: string;
          picture: string;
          user_id?: string;
        };
        Update: {
          band?: string;
          concerts?: Json;
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
