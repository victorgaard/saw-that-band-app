'use client';

import { AuthContext } from '@/auth/AuthContext';
import { ToastContext } from '@/components/Toast/ToastContext';
import { Bands } from '@/types/global';
import { ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { FixedSizeList as DashboardReactWindowList } from 'react-window';
import DashboardBands from './DashboardBands';

function DashboardLayout({ children }: { children: ReactNode }) {
  const { supabase, user } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);
  const dashboardBandCardRef = useRef<DashboardReactWindowList>(null);

  const [bands, setBands] = useState<Bands>();
  const [query, setQuery] = useState('');

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

  useEffect(() => {
    resetScrollPosition();
  }, [query]);

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

  if (!filteredBandsList) return <>Loading...</>;

  return (
    <div className="-mx-12 -my-8 grid grid-cols-2">
      <DashboardBands
        query={query}
        setQuery={setQuery}
        filteredBandsList={filteredBandsList}
        dashboardBandCardRef={dashboardBandCardRef}
      />
      {children}
    </div>
  );
}

export default DashboardLayout;
