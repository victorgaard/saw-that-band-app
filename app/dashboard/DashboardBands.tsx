import { Bands } from '@/types/global';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { RefObject } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import {
  FixedSizeList as DashboardReactWindowList,
  ListChildComponentProps as DashboardReactWindowListProps
} from 'react-window';
import DashboardReactWindowRender from './DashboardReactWindowRender';
import DashboardSearchBar from './DashboardSearchBar';

type DashboardBandsProps = {
  query: string;
  filteredBandsList: Bands;
  dashboardBandCardRef: RefObject<DashboardReactWindowList<any>>;
  setQuery: (query: string) => void;
};

function DashboardBands({
  query,
  filteredBandsList,
  dashboardBandCardRef,
  setQuery
}: DashboardBandsProps) {
  return (
    <div className="border-r border-zinc-700">
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
            <DashboardReactWindowList
              ref={dashboardBandCardRef}
              width={width}
              height={height}
              itemSize={160}
              itemCount={filteredBandsList.length}
              className="[scrollbar-color:#3f3f46_transparent] [&::-webkit-scrollbar-thumb]:rounded-lg [&::-webkit-scrollbar-thumb]:bg-zinc-700 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:bg-transparent"
            >
              {(props: DashboardReactWindowListProps) => (
                <DashboardReactWindowRender
                  index={props.index}
                  style={props.style}
                  data={filteredBandsList}
                  setQuery={setQuery}
                />
              )}
            </DashboardReactWindowList>
          )}
        </AutoSizer>
      </div>
    </div>
  );
}

export default DashboardBands;
