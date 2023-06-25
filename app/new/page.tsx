'use client';

import { NewBand, SpotifySearch } from '@/types/global';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import AddNewBand from './AddNewBand';
import getSpotifyToken from '@/utils/getSpotifyToken';
import BandResultsCard from './BandResultsCard';

function NewBandPage() {
  const [query, setQuery] = useState('');
  const [spotifyToken, setSpotifyToken] = useState<string>();
  const [searchResults, setSearchResults] = useState<SpotifySearch[]>();
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

  function pickBand(pickedBand: SpotifySearch) {
    const band: NewBand = {
      band: pickedBand.name,
      genre: pickedBand.genres,
      picture: pickedBand.images[0].url || '',
      concerts: []
    };
    setSelectedBand(band);
  }

  return (
    <div className="-mx-12 -my-8 grid h-screen grid-cols-2">
      <div className="border-r border-zinc-700">
        <div className="relative flex h-[80px] w-full items-center justify-between border-b border-zinc-700 bg-zinc-870/70 pr-6 text-sm">
          <MagnifyingGlassIcon className="absolute left-6 h-4 w-4 text-zinc-500" />
          <input
            onChange={e => {
              setQuery(e.currentTarget.value);
            }}
            value={query}
            placeholder="Search for the band name"
            className={classNames(
              'h-full w-full shrink-0 bg-transparent pl-14 pr-6 text-white placeholder:text-zinc-400 focus:outline-none focus:placeholder:text-zinc-400'
            )}
          />
        </div>
        <div className="max-h-[calc(100vh-80px)] overflow-y-auto [scrollbar-color:#3f3f46_transparent] [&::-webkit-scrollbar-thumb]:rounded-lg [&::-webkit-scrollbar-thumb]:bg-zinc-700 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:bg-transparent">
          {searchLoading && <p>Loading...</p>}
          {!searchLoading && searchResults?.length === 0 && (
            <p>No results for {query}</p>
          )}
          {!searchLoading &&
            searchResults?.map(band => (
              <BandResultsCard
                key={band.id}
                band={band}
                selectedBand={selectedBand}
                onClick={() => pickBand(band)}
              />
            ))}
        </div>
      </div>
      <AddNewBand selectedBand={selectedBand} />
    </div>
  );
}

export default NewBandPage;
