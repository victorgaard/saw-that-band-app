import { Band } from '@/types/global';
import Image from 'next/image';
import BandCardCollapsedTags from './BandCardCollapsedTags';
import { usePathname, useRouter } from 'next/navigation';
import classNames from 'classnames';

type BandCardProps = {
  band: Band;
  setQuery: (query: string) => void;
};

function BandCard({ band, setQuery }: BandCardProps) {
  const router = useRouter();
  const path = usePathname();
  const bandNameFormatted = band.band.replaceAll(' ', '-');
  return (
    <div className="flex justify-center">
      <div
        onClick={() => router.push(`/bands/${bandNameFormatted}/${band.id}`)}
        className={classNames(
          'group flex h-[130px] w-full cursor-pointer items-center gap-6 p-4 text-white sm:h-[160px] sm:gap-8 sm:p-6',
          {
            'bg-gradient-to-tr from-zinc-100/10 to-zinc-500/10 to-50%':
              path.includes(band.id),
            ' hover:border-zinc-600/40 hover:bg-zinc-900/40': !path.includes(
              band.id
            )
          }
        )}
      >
        <div className="h-[112px] w-[112px] shrink-0 overflow-hidden rounded-lg bg-zinc-900">
          <Image
            width={112}
            height={112}
            src={band.picture}
            alt={band.band}
            className="h-[112px] w-[112px] object-cover"
            priority
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col sm:gap-0">
            <span className="text-lg font-semibold text-zinc-300 transition-colors group-hover:text-white">
              {band.band}
            </span>
            <p className="mt-0.5 flex flex-col text-sm text-zinc-400 transition-colors group-hover:text-zinc-300 sm:flex-row sm:gap-1">
              <span>
                {band.concerts[0].date.slice(6)} in {band.concerts[0].location}{' '}
              </span>
              {band.concerts.length > 1 && (
                <span>
                  & {band.concerts.length - 1} other{' '}
                  {band.concerts.length === 2 ? 'time' : 'times'}
                </span>
              )}
            </p>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            {band.genre.slice(0, 2).map(genre => (
              <button
                type="button"
                key={genre}
                className="whitespace-nowrap rounded border border-zinc-700/60 p-2 px-3 text-xs font-medium text-zinc-300 shadow-sm transition-colors duration-75 hover:border-zinc-600 hover:bg-zinc-700/50 hover:text-white"
                onClick={e => {
                  e.stopPropagation();
                  setQuery(genre);
                }}
              >
                {genre}
              </button>
            ))}
            {band.genre.length > 2 && (
              <BandCardCollapsedTags
                bandGenre={band.genre}
                setQuery={setQuery}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BandCard;
