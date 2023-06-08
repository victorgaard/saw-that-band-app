'use client';

import { AuthContext } from '@/auth/AuthContext';
import { ToastContext } from '@/components/Toast/ToastContext';
import { Band, Bands } from '@/types/global';
import { useContext, useEffect, useRef, useState } from 'react';
import { FixedSizeList as DashboardReactWindowList } from 'react-window';
import Dashboard from './Dashboard';

function DashboardPage() {
  const { supabase, user } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);
  const dashboardBandCardRef = useRef<DashboardReactWindowList>(null);

  const [bands, setBands] = useState<Bands>();
  const [query, setQuery] = useState('');

  const [selectedBand, setSelectedBand] = useState<Band>();

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

  function resetScrollPosition() {
    dashboardBandCardRef.current?.scrollToItem(0);
  }

  function selectBand(currentBand: Band) {
    setSelectedBand(currentBand);
  }

  function closeSelectedBand() {
    setSelectedBand(undefined);
  }

  function addGenre() {
    if (!selectedBand) return;

    const newSelectedBand = { ...selectedBand };
    newSelectedBand.genre = [...newSelectedBand.genre, ''];
    setSelectedBand(newSelectedBand);
  }

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
      filteredBandsList={filteredBandsList}
      dashboardBandCardRef={dashboardBandCardRef}
      selectedBand={selectedBand}
      setQuery={setQuery}
      resetScrollPosition={resetScrollPosition}
      selectBand={selectBand}
      addGenre={addGenre}
    />
  );
}

export default DashboardPage;
