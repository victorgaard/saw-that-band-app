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
import LoadingSpinner from '@/icons/LoadingSpinner';
import { usePathname, useRouter } from 'next/navigation';
import Button from '@/components/Button';

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
  const router = useRouter();
  const dashboardBandCardRef = useRef<BandsReactWindowList>(null);
  const path = usePathname();
  const width = (typeof window !== 'undefined' && window.innerWidth) || 0;
  const isMobile = width < 640;

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
  }, [user, toast, getAllBands, router]);

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
      setHasUpdate(false);
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

  if (!filteredBandsList) return <LoadingSpinner />;
  if (bands?.length === 0)
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
        <span className="text-2xl font-semibold">
          Welcome to Saw that Band 🤘
        </span>
        <span className="text-zinc-400">Start adding your bands today</span>
        <Button onClick={() => router.push('/new')}>Add new band</Button>
      </div>
    );

  return (
    <BandsContext.Provider value={{ hasUpdate, setHasUpdate }}>
      <div className="-mx-4 -my-8 grid grid-cols-1 sm:-mx-12 sm:grid-cols-2">
        {isMobile && path === '/bands' && (
          <BandsList
            query={query}
            setQuery={setQuery}
            filteredBandsList={filteredBandsList}
            dashboardBandCardRef={dashboardBandCardRef}
            isMobile={isMobile}
          />
        )}
        {!isMobile && (
          <BandsList
            query={query}
            setQuery={setQuery}
            filteredBandsList={filteredBandsList}
            dashboardBandCardRef={dashboardBandCardRef}
            isMobile={isMobile}
          />
        )}
        {children}
      </div>
    </BandsContext.Provider>
  );
}

export default DashboardLayout;
