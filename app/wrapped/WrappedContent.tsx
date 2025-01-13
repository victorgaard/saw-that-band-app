import { useWrapped } from '@/hooks/useWrapped';
import { Bands, Profile } from '@/types/global';

type WrappedContentProps = {
  year: string;
  user: Profile;
  userBands: Bands;
};

export function WrappedContent({ year, user, userBands }: WrappedContentProps) {
  const { bands, stats, mostSeenBand } = useWrapped(userBands, year);
  const { uniqueBands, totalConcerts } = stats;

  const name = user.name || user.username;
  const firstConcert = bands[0].band;
  const lastConcert = bands[bands.length - 1].band;

  return (
    <div className="flex flex-col gap-4">
      <p>Stats for {name}</p>
      <p>Unique bands seen in 2024: {uniqueBands}</p>
      <p>Total concerts in 2024: {totalConcerts}</p>
      <p>First concert: {firstConcert}</p>
      <p>Last concert: {lastConcert}</p>
      <section>
        Most seen band in 2024:{' '}
        {mostSeenBand.map(band => (
          <p key={band.id}>{band.band}</p>
        ))}
      </section>
    </div>
  );
}
