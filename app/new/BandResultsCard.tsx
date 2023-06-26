import { NewBand, SpotifyBand } from '@/types/global';
import classNames from 'classnames';
import Image from 'next/image';
import { HTMLAttributes } from 'react';

type BandResultsCardProps = HTMLAttributes<HTMLDivElement> & {
  band: SpotifyBand;
  selectedBand: NewBand | undefined;
  onClick: (band: SpotifyBand) => void;
};

function BandResultsCard({
  band,
  selectedBand,
  onClick
}: BandResultsCardProps) {
  return (
    <div className="flex justify-center">
      <div
        onClick={onClick}
        className={classNames(
          'group flex h-[160px] w-full cursor-pointer items-center gap-6 p-6 text-white sm:gap-8',
          {
            'bg-gradient-to-tr from-zinc-100/10 to-zinc-500/10 to-50%':
              selectedBand?.band === band.name,
            ' hover:border-zinc-600/40 hover:bg-zinc-900/40':
              selectedBand?.band !== band.name
          }
        )}
      >
        <div className="h-[112px] w-[112px] shrink-0 overflow-hidden rounded-lg bg-zinc-900">
          {band.images.length > 0 && (
            <Image
              width={112}
              height={112}
              src={band.images[0].url}
              alt={band.name}
              className="h-[112px] w-[112px] object-cover"
              priority
            />
          )}
          {band.images.length === 0 && (
            <div className="flex h-[112px] w-[112px] items-center justify-center text-5xl text-zinc-400">
              {band.name[0]}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col sm:gap-0">
            <span className="text-xl font-semibold text-zinc-300 transition-colors group-hover:text-white sm:text-lg">
              {band.name}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {band.genres.slice(0, 4).map(genre => (
              <p
                key={genre}
                className="whitespace-nowrap rounded border border-zinc-700/60 p-2 px-3 text-xs font-medium text-zinc-300 shadow-sm"
              >
                {genre}
              </p>
            ))}
            {band.genres.length > 4 && (
              <p className="flex items-center justify-center rounded bg-zinc-700/30 p-2 text-xs">
                +{band.genres.length - 4}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BandResultsCard;
