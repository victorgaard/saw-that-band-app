'use client';

import { AuthContext } from '@/auth/AuthContext';
import { ToastContext } from '@/components/Toast/ToastContext';
import { Database } from '@/types/supabase';
import { useContext, useEffect, useRef, useState } from 'react';
import { FixedSizeList as List } from 'react-window';
import Dashboard from './Dashboard';

function DashboardPage() {
  const { supabase, user } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);

  const [bands, setBands] =
    useState<Database['public']['Tables']['Bands']['Row'][]>();
  const [query, setQuery] = useState('');

  const listRef = useRef<List>(null);

  function resetScrollPosition() {
    listRef.current?.scrollToItem(0);
  }

  useEffect(() => {
    async function getBands() {
      if (!user) return;

      const { data, error } = await supabase
        .from('Bands')
        .select()
        .eq('user_id', user.id)
        .order('band', { ascending: true });

      if (error)
        return toast({
          type: 'error',
          title: 'Bands could not be loaded',
          message:
            'There was an error loading your bands. Please try again later.'
        });

      setBands(data);
    }
    if (user && !bands) {
      getBands();
    }
  }, [user, bands, toast, supabase]);

  const formattedQueryTerm = query.trim().toLowerCase();
  const filteredBandsList = bands?.filter(
    band =>
      band.band.toLowerCase().includes(formattedQueryTerm) ||
      band.genre.some(genre =>
        genre.toLowerCase().includes(formattedQueryTerm)
      ) ||
      band.concerts.some(concert =>
        concert.location.toLowerCase().includes(formattedQueryTerm)
      ) ||
      band.concerts.some(concert =>
        concert.date.toLowerCase().includes(formattedQueryTerm)
      )
  );

  return (
    <Dashboard
      query={query}
      setQuery={setQuery}
      filteredBandsList={filteredBandsList}
      listRef={listRef}
      resetScrollPosition={resetScrollPosition}
    />
  );
}

export default DashboardPage;
