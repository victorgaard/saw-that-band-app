import { useWrapped } from '@/hooks/useWrapped';
import { Bands, Profile } from '@/types/global';

type WrappedContentProps = {
  year: string;
  user: Profile;
  bands: Bands;
};

export function WrappedContent({ year, user, bands }: WrappedContentProps) {
  const {
    username,
    firstConcert,
    lastConcert,
    concertStats,
    mostSeenBand,
    bandGenres
  } = useWrapped({ year, user, bands });

  return (
    <div className="flex flex-col gap-4">
      <p>Stats for {username}</p>
      <p>Unique bands seen in 2024: {concertStats.uniqueBands}</p>
      <p>Total concerts in 2024: {concertStats.totalConcerts}</p>
      <p>First concert: {firstConcert}</p>
      <p>Last concert: {lastConcert}</p>
      <section>
        Most seen band in 2024:
        {mostSeenBand.map(band => (
          <p key={band.id}>- {band.band}</p>
        ))}
      </section>
      <section>
        Favorite genres in 2024:
        {bandGenres.map(genre => (
          <p key={genre.genre}>
            - {genre.genre}: {genre.count}
          </p>
        ))}
      </section>
    </div>
  );
}
