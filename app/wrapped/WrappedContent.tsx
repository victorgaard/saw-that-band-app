import { useWrapped } from '@/hooks/useWrapped';
import { Bands, type Profile } from '@/types/global';
import Image from 'next/image';

type ProfileImageProps = {
  name: string;
  src: string | null;
};

function ProfileImage({ name, src }: ProfileImageProps) {
  if (!src)
    return (
      <div className="flex size-16 items-center justify-center rounded-lg border border-zinc-600 bg-zinc-700 text-2xl uppercase text-zinc-300">
        {name[0]}
      </div>
    );

  return (
    <Image
      src={src}
      width={64}
      height={64}
      alt={`${name} avatar`}
      className="size-16 rounded-lg"
    />
  );
}

type ProfileHeaderProps = {
  profile: { name: string; joined: string; picture: string | null };
};

function ProfileHeader({ profile }: ProfileHeaderProps) {
  return (
    <div className="flex flex-col gap-4">
      <p>Stats for {profile.name}</p>
      <ProfileImage name={profile.name} src={profile.picture} />
      <p>Joined {profile.joined}</p>
    </div>
  );
}

type WrappedContentProps = {
  year: string;
  user: Profile;
  bands: Bands;
};

export function WrappedContent({ year, user, bands }: WrappedContentProps) {
  const {
    profile,
    hasBands,
    firstConcert,
    lastConcert,
    concertStats,
    mostSeenBand,
    bandGenres
  } = useWrapped({ year, user, bands });

  if (!hasBands)
    return (
      <div>
        <ProfileHeader profile={profile} />
        You have not attended concerts in 2024. Please try again next year!
      </div>
    );

  return (
    <div className="flex flex-col gap-4">
      <ProfileHeader profile={profile} />
      <p>Unique bands seen in 2024: {concertStats.uniqueBands}</p>
      <p>Total concerts in 2024: {concertStats.totalConcerts}</p>
      <p>Time spent in concerts: {concertStats.timeSpent}</p>
      <p>First concert: {firstConcert.band}</p>
      <p>Last concert: {lastConcert.band}</p>

      {mostSeenBand.length > 0 && (
        <section>
          Most seen band in 2024:
          {mostSeenBand.map(band => (
            <p key={band.id}>
              - {band.band}: {band.concerts.length} times
            </p>
          ))}
        </section>
      )}

      <section>
        Favorite genres in 2024:
        {bandGenres.map(genre => (
          <p key={genre.genre}>
            - {genre.genre}: {genre.count}
          </p>
        ))}
      </section>
      <p className="text-red-300">Most active month: to come</p>
      <p className="text-red-300">Locations: to come</p>
    </div>
  );
}
