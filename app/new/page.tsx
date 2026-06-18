'use client';

import { useContext, useState } from 'react';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

import AddNewBand from './AddNewBand';
import BandResultsCard from './BandResultsCard';

import SpotifyIcon from '@/components/SpotifyIcon';
import { ToastContext } from '@/components/Toast/ToastContext';
import useSpotify from '@/hooks/useSpotify';
import LoadingSpinner from '@/icons/LoadingSpinner';
import { NewBand, SpotifyBand } from '@/types/global';
import { cn } from '@/utils/cn';

export const dynamic = 'force-dynamic';

function NewBandPage() {
  const { toast } = useContext(ToastContext);

  const [query, setQuery] = useState('');
  const [selectedBand, setSelectedBand] = useState<NewBand>();

  const { searchResults, searchLoading, tokenError, searchError } =
    useSpotify(query);

  const width = (typeof window !== 'undefined' && window.innerWidth) || 0;
  const isMobile = width < 640;

  const hasQuery = query.trim().length > 0;

  if (tokenError) {
    toast({
      type: 'error',
      title: 'Spotify server instability',
      message:
        'There was an issue on our end connecting to Spotify servers. Please try again later.'
    });
  }

  if (searchError) {
    toast({
      type: 'error',
      title: 'Search error',
      message:
        'There was an error searching for this band. Please try again later.'
    });
  }

  function pickBand(pickedBand: SpotifyBand) {
    setSelectedBand({
      band: pickedBand.name,
      genre: pickedBand.genres,
      picture: pickedBand.images.length > 0 ? pickedBand.images[0].url : '',
      concerts: []
    });
  }

  function resetBandPicked() {
    setSelectedBand(undefined);
  }

  if (isMobile && selectedBand) {
    return (
      <div className="-mx-4 -my-8 grid h-[100dvh] grid-cols-1 sm:-mx-12 sm:h-screen sm:grid-cols-2">
        <AddNewBand
          selectedBand={selectedBand}
          isMobile={isMobile}
          resetBandPicked={resetBandPicked}
        />
      </div>
    );
  }

  return (
    <div className="-mx-4 -my-8 grid h-[100dvh] grid-cols-1 sm:-mx-12 sm:h-screen sm:grid-cols-2">
      <div className="border-zinc-700 sm:border-r">
        <div className="relative flex h-[80px] w-full items-center justify-between border-b border-zinc-700 bg-zinc-870/70 pr-6 text-sm">
          <MagnifyingGlassIcon className="absolute left-6 hidden h-4 w-4 text-zinc-500 sm:block" />

          <input
            value={query}
            onChange={e => setQuery(e.currentTarget.value)}
            placeholder="Search for the band name"
            className={cn(
              'h-full w-full shrink-0 bg-transparent p-6 text-white placeholder:text-zinc-400 focus:outline-none focus:placeholder:text-zinc-400 sm:pl-14'
            )}
          />
        </div>

        <div className="max-h-[calc(100vh-80px)] overflow-y-auto [scrollbar-color:#3f3f46_transparent] [&::-webkit-scrollbar-thumb]:rounded-lg [&::-webkit-scrollbar-thumb]:bg-zinc-700 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:bg-transparent">
          {!hasQuery && (
            <div className="flex w-full flex-col items-center justify-center pt-24">
              <span>Search for a band to add to your catalogue</span>

              <p className="mt-4 flex items-center gap-2 text-sm text-zinc-400">
                Results powered by Spotify
                <SpotifyIcon className="h-5 w-5" />
              </p>
            </div>
          )}

          {hasQuery && searchLoading && (
            <div className="flex w-full items-center justify-center py-24">
              <LoadingSpinner />
            </div>
          )}

          {hasQuery && !searchLoading && searchResults?.length === 0 && (
            <p className="p-6 text-center text-zinc-400">
              No results for "{query}". Please keep in mind the band must be
              registered on Spotify to be listed here.
            </p>
          )}

          {hasQuery &&
            !searchLoading &&
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

      <AddNewBand
        selectedBand={selectedBand}
        isMobile={isMobile}
        resetBandPicked={resetBandPicked}
      />
    </div>
  );
}

export default NewBandPage;
