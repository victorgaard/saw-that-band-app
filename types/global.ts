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
        Relationships: [
          {
            foreignKeyName: 'Bands_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      Users: {
        Row: {
          bio: string | null;
          created_at: string;
          email: string;
          id: string;
          links: ProfileLink[] | null;
          name: string | null;
          picture: string | null;
          username: string;
        };
        Insert: {
          bio?: string | null;
          created_at?: string;
          email: string;
          id: string;
          links?: ProfileLink[] | null;
          name?: string | null;
          picture?: string | null;
          username: string;
        };
        Update: {
          bio?: string | null;
          created_at?: string;
          email?: string;
          id?: string;
          links?: ProfileLink[] | null;
          name?: string | null;
          picture?: string | null;
          username?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'Users_id_fkey';
            columns: ['id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
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
export type Profile = Database['public']['Tables']['Users']['Row'];
export type NewBand = Database['public']['Tables']['Bands']['Insert'];

export type SpotifyBand = {
  external_urls: {
    spotify: string;
  };
  followers: {
    href: null;
    total: number;
  };
  genres: string[];
  href: string;
  id: string;
  images: {
    height: number;
    url: string;
    width: number;
  }[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
};

export type SpotifySearchResults = {
  artists: {
    href: string;
    items: SpotifyBand[];
  };
};

export type ExternalLinkProvider =
  | 'spotify'
  | 'youtube'
  | 'deezer'
  | 'apple'
  | 'lastfm'
  | 'setlist'
  | 'soundcloud'
  | 'instagram'
  | 'other';

export type ProfileLink = {
  type: ExternalLinkProvider;
  url: string;
};

export type ProfileForm = {
  name: string;
  picture: string;
  email: string;
  username: string;
  bio: string;
  links: ProfileLink[];
};
