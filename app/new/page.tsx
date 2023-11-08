'use client';

import { NewBand, SpotifyBand } from '@/types/global';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { useContext, useEffect, useState } from 'react';
import AddNewBand from './AddNewBand';
import BandResultsCard from './BandResultsCard';
import useSpotify from '@/hooks/useSpotify';
import { ToastContext } from '@/components/Toast/ToastContext';
import LoadingSpinner from '@/icons/LoadingSpinner';
import SpotifyIcon from '@/components/SpotifyIcon';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

function NewBandPage() {
  const { getSpotifyToken, search } = useSpotify();
  const { toast } = useContext(ToastContext);

  const [query, setQuery] = useState('');
  const [spotifyToken, setSpotifyToken] = useState<string>();
  const [searchResults, setSearchResults] = useState<SpotifyBand[]>();
  const [selectedBand, setSelectedBand] = useState<NewBand>();
  const [searchLoading, setSearchLoading] = useState(false);

  const width = (typeof window !== 'undefined' && window.innerWidth) || 0;
  const isMobile = width < 640;

  useEffect(() => {
    if (!spotifyToken) {
      getSpotifyToken()
        .then(res => setSpotifyToken(res.accessToken))
        .catch(() =>
          toast({
            type: 'error',
            title: 'Spotify server instability',
            message:
              'There was an issue on our end connecting to Spotify servers. Please try again later.'
          })
        );
    }
  }, [spotifyToken, getSpotifyToken, toast]);

  useEffect(() => {
    let searchTimeout: ReturnType<typeof setTimeout>;

    if (query && spotifyToken) {
      setSearchLoading(true);
      searchTimeout = setTimeout(async () => {
        search(spotifyToken, query)
          .then(res => {
            setSearchResults(res.artists.items);
            setSearchLoading(false);
          })
          .catch(() =>
            toast({
              type: 'error',
              title: 'Search error',
              message:
                'There was an error searching for this band. Please try again later.'
            })
          );
      }, 700);
    }
    return () => clearTimeout(searchTimeout);
  }, [query, spotifyToken, search, toast]);

  function pickBand(pickedBand: SpotifyBand) {
    const band: NewBand = {
      band: pickedBand.name,
      genre: pickedBand.genres,
      picture: pickedBand.images.length > 0 ? pickedBand.images[0].url : '',
      concerts: []
    };
    setSelectedBand(band);
  }

  return (
    <div className="-mx-4 -my-8 grid h-[100dvh] grid-cols-1 sm:-mx-12 sm:h-screen sm:grid-cols-2">
      <div className="border-zinc-700 sm:border-r">
        <div className="relative flex h-[80px] w-full items-center justify-between border-b border-zinc-700 bg-zinc-870/70 pr-6 text-sm">
          <MagnifyingGlassIcon className="absolute left-6 hidden h-4 w-4 text-zinc-500 sm:block" />
          <input
            onChange={e => {
              setQuery(e.currentTarget.value);
            }}
            value={query}
            placeholder="Search for the band name"
            className={classNames(
              'h-full w-full shrink-0 bg-transparent p-6 text-white placeholder:text-zinc-400 focus:outline-none focus:placeholder:text-zinc-400 sm:pl-14'
            )}
          />
        </div>
        <div className="max-h-[calc(100vh-80px)] overflow-y-auto [scrollbar-color:#3f3f46_transparent] [&::-webkit-scrollbar-thumb]:rounded-lg [&::-webkit-scrollbar-thumb]:bg-zinc-700 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:bg-transparent">
          {!searchLoading && !searchResults && (
            <div className="flex w-full flex-col items-center justify-center pt-24">
              <span>Search for a band to add to your catalogue</span>

              <p className="mt-4 flex items-center gap-2 text-sm text-zinc-400">
                Results powered by Spotify <SpotifyIcon className="h-5 w-5" />
              </p>
            </div>
          )}
          {searchLoading && (
            <div className="flex w-full items-center justify-center py-24">
              <LoadingSpinner />
            </div>
          )}
          {!searchLoading && searchResults?.length === 0 && (
            <p>
              No results for {query}. Please keep in mind the band must be
              registered on Spotify to be listed here.
            </p>
          )}
          {!searchLoading &&
            searchResults?.map(band => (
              <BandResultsCard
                key={band.id}
                band={band}
                selectedBand={selectedBand}
                isMobile={isMobile}
                onClick={() => pickBand(band)}
              />
            ))}
        </div>
      </div>
      <AddNewBand selectedBand={selectedBand} isMobile={isMobile} />
    </div>
  );
}

export default NewBandPage;
