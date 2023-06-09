'use client';

import { AuthContext } from '@/auth/AuthContext';
import { ToastContext } from '@/components/Toast/ToastContext';
import useBands from '@/hooks/useBands';
import { Bands } from '@/types/global';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';
import { FixedSizeList as BandsReactWindowList } from 'react-window';
import BandsList from './BandsList';

type Context = {
  hasUpdate: boolean;
  setHasUpdate: (hasUpdate: boolean) => void;
};
const context: Context = {
  hasUpdate: false,
  setHasUpdate: () => {}
};

export const BandsContext = createContext(context);

function DashboardLayout({ children }: { children: ReactNode }) {
  const { user } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);
  const { getAllBands } = useBands();
  const dashboardBandCardRef = useRef<BandsReactWindowList>(null);

  const [bands, setBands] = useState<Bands>();
  const [hasUpdate, setHasUpdate] = useState(false);
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

  useEffect(() => {
    if (user && hasUpdate) {
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
  }, [user, hasUpdate, toast, getAllBands]);

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
    <BandsContext.Provider value={{ hasUpdate, setHasUpdate }}>
      <div className="-mx-12 -my-8 grid grid-cols-2">
        <BandsList
          query={query}
          setQuery={setQuery}
          filteredBandsList={filteredBandsList}
          dashboardBandCardRef={dashboardBandCardRef}
        />
        {children}
      </div>
    </BandsContext.Provider>
  );
}

export default DashboardLayout;
