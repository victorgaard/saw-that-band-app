'use client';

import { NewBand, SpotifySearch } from '@/types/global';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import AddNewBand from './AddNewBand';
import getSpotifyToken from '@/utils/getSpotifyToken';

function NewBandPage() {
  const [query, setQuery] = useState('');
  const [spotifyToken, setSpotifyToken] = useState<string>();
  const [searchResults, setSearchResults] = useState<SpotifySearch>();
  const [selectedBand, setSelectedBand] = useState<NewBand>();
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    if (!spotifyToken) {
      getSpotifyToken()
        .then(res => setSpotifyToken(res.accessToken))
        .catch(err => console.log(err));
    }
  }, [spotifyToken]);

  useEffect(() => {
    let searchTimeout: ReturnType<typeof setTimeout>;

    if (query && spotifyToken) {
      setSearchLoading(true);
      searchTimeout = setTimeout(async () => {
        const res = await fetch(
          `/api/spotify/search?token=${spotifyToken}&band=${query}`
        );
        const json = await res.json();
        setSearchResults(json.artists.items);
        setSearchLoading(false);
      }, 700);
    }
    return () => clearTimeout(searchTimeout);
  }, [query, spotifyToken]);

  return (
    <div className="-mx-12 -my-8 grid h-screen grid-cols-2">
      <div>
        <div className="relative flex h-[80px] w-full items-center justify-between border-b border-zinc-700 bg-zinc-870/70 pr-6 text-sm">
          <MagnifyingGlassIcon className="absolute left-6 h-4 w-4 text-zinc-500" />
          <input
            onChange={e => {
              setQuery(e.currentTarget.value);
            }}
            value={query}
            placeholder="Search for the band name"
            className={classNames(
              'h-full w-[90.5%] shrink-0 bg-transparent pl-14 pr-6 text-white placeholder:text-zinc-400 focus:outline-none focus:placeholder:text-zinc-400',
              {
                'md:w-[50%]': query,
                'md:w-full': !query
              }
            )}
          />
        </div>
        {searchLoading && <p>Loading...</p>}
        {!searchLoading && searchResults?.length === 0 && (
          <p>No results for {query}</p>
        )}
        {!searchLoading &&
          searchResults?.map((res, idx) => (
            <p key={idx}>{JSON.stringify(res)}</p>
          ))}
      </div>
      <AddNewBand selectedBand={selectedBand} />
    </div>
  );
}

export default NewBandPage;
