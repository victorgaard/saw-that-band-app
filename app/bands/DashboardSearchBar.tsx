import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { ChangeEvent } from 'react';

type DashboardSearchBarProps = {
  query: string;
  bandsCount: number;
  setQuery: (query: string) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

function DashboardSearchBar({
  query,
  bandsCount,
  setQuery,
  handleChange
}: DashboardSearchBarProps) {
  return (
    <div className="flex h-[80px] w-full items-center justify-between border-b border-zinc-700 bg-zinc-870/70 pr-6 text-sm backdrop-blur-lg">
      <MagnifyingGlassIcon className="absolute left-6 h-4 w-4 text-zinc-500" />
      <input
        onChange={e => {
          handleChange(e);
        }}
        value={query}
        placeholder="Search for band, genre, year or location"
        className={classNames(
          'h-full w-[90.5%] shrink-0 bg-transparent pl-14 pr-6 text-white placeholder:text-zinc-400 focus:outline-none focus:placeholder:text-zinc-400',
          {
            'md:w-[50%]': query,
            'md:w-full': !query
          }
        )}
      />
      {query && (
        <div className="items-center gap-4">
          <button
            onClick={() => {
              setQuery('');
            }}
            type="button"
            className="flex items-center gap-2 whitespace-nowrap rounded border border-zinc-700/60 bg-zinc-900/30 px-4 py-3 text-sm font-medium text-zinc-300 transition-colors duration-75 hover:border-zinc-600 hover:bg-zinc-700/50 hover:text-white"
          >
            <p className="hidden max-w-[15rem] truncate md:block">
              {bandsCount} {bandsCount === 1 ? 'result' : 'results'} for:{' '}
              {query}
            </p>
            <XMarkIcon className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}

export default DashboardSearchBar;
