import { Database } from '@/types/supabase';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { RefObject } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';
import DashboardSearchBar from '@/app/dashboard/DashboardSearchBar';
import DashboardReactWindowRender from './DashboardReactWindowRender';

type DashboardProps = {
  query: string;
  setQuery: (query: string) => void;
  filteredBandsList: undefined | Database['public']['Tables']['Bands']['Row'][];
  listRef: RefObject<List<any>>;
  resetScrollPosition: () => void;
};

function Dashboard({
  query,
  setQuery,
  filteredBandsList,
  listRef,
  resetScrollPosition
}: DashboardProps) {
  if (!filteredBandsList) return <>Loading...</>;

  return (
    <div className="-mx-12 -my-8 grid grid-cols-2">
      <div>
        <DashboardSearchBar
          query={query}
          setQuery={setQuery}
          bandsCount={filteredBandsList.length}
          handleChange={e => setQuery(e.target.value)}
        />
        {filteredBandsList.length === 0 && (
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
                itemCount={filteredBandsList.length}
              >
                {(props: ListChildComponentProps) => (
                  <DashboardReactWindowRender
                    index={props.index}
                    style={props.style}
                    data={filteredBandsList}
                    setQuery={setQuery}
                    resetScrollPosition={resetScrollPosition}
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
