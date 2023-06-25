'use client';

import { AuthContext } from '@/auth/AuthContext';
import { ToastContext } from '@/components/Toast/ToastContext';
import useBands from '@/hooks/useBands';
import { Bands } from '@/types/global';
import { ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { FixedSizeList as DashboardReactWindowList } from 'react-window';
import DashboardBands from './DashboardBands';

function DashboardLayout({ children }: { children: ReactNode }) {
  const { user } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);
  const { getAllBands } = useBands();
  const dashboardBandCardRef = useRef<DashboardReactWindowList>(null);

  const [bands, setBands] = useState<Bands>();
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (user) {
      getAllBands(user.id)
        .then(res => {
          setBands(res);
        })
        .catch(() =>
          toast({
            type: 'error',
            title: 'Bands could not be loaded',
            message:
              'There was an error loading your bands. Please try again later.'
          })
        );
    }
  }, [user, toast, getAllBands]);

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
