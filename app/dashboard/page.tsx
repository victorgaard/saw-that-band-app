'use client';

import { AuthContext } from '@/auth/AuthContext';
import BandsListRenderItem from '@/components/BandsListRender';
import SearchBar from '@/components/SearchBar';
import { ToastContext } from '@/components/Toast/ToastContext';
import { Database } from '@/types/supabase';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useContext, useEffect, useRef, useState } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';

function Dashboard() {
  const { supabase, user } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);

  const [bands, setBands] =
    useState<Database['public']['Tables']['Bands']['Row'][]>();
  const [query, setQuery] = useState('');

  const listRef = useRef<List>(null);

  function resetScroll() {
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

  const treatedQuery = query.trim().toLowerCase();
  const filteredBands = bands?.filter(
    band =>
      band.band.toLowerCase().includes(treatedQuery) ||
      band.genre.some(genre => genre.toLowerCase().includes(treatedQuery)) ||
      band.concerts.some(concert =>
        concert.location.toLowerCase().includes(treatedQuery)
      ) ||
      band.concerts.some(concert =>
        concert.date.toLowerCase().includes(treatedQuery)
      )
  );

  if (!filteredBands) return <>Loading...</>;

  return (
    <div className="-mx-12 -my-8 grid grid-cols-2">
      <div>
        <SearchBar
          query={query}
          setQuery={setQuery}
          bandsCount={filteredBands.length}
          handleChange={e => setQuery(e.target.value)}
        />
        {filteredBands.length === 0 && (
          <div className="mt-20 flex flex-col items-center justify-center gap-8 px-8 pt-8 sm:mt-48">
            <div className="flex flex-col items-center gap-2">
              <p className="text-zinc-400">There are no results for: </p>
              <p className="max-w-[calc(100vw-48px)] truncate text-xl font-medium text-white sm:max-w-[calc(100vw-480px)]">
                {query}
              </p>
            </div>
            <button
              onClick={() => {
                setQuery('');
              }}
              type="button"
              className="flex items-center gap-4 rounded bg-zinc-900 p-4 text-zinc-400 hover:bg-zinc-700/50 hover:text-white sm:hidden"
            >
              <p>Clear search</p>
              <XMarkIcon className="h-4 w-4" />
            </button>
          </div>
        )}

        <div className="h-[calc(100vh-80px)] w-full">
          <AutoSizer>
            {({ height, width }: { height: number; width: number }) => (
              <List
                ref={listRef}
                width={width}
                height={height}
                itemSize={160}
                itemCount={filteredBands.length}
              >
                {(props: ListChildComponentProps) => (
                  <BandsListRenderItem
                    index={props.index}
                    style={props.style}
                    data={filteredBands}
                    setQuery={setQuery}
                    resetScroll={resetScroll}
                  />
                )}
              </List>
            )}
          </AutoSizer>
        </div>
      </div>
      <div className="bg-zinc-900 p-12 py-6">
        Select a band or add a new band
      </div>
    </div>
  );
}

export default Dashboard;
