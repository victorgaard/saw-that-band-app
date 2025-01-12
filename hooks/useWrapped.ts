import { Bands } from '@/types/global';
import { useState } from 'react';

export function useWrapped(bands: Bands, year: string) {
  const [wrappedBands] = useState(() => getBands());

  function getBands() {
    return bands
      .filter(band =>
        band.concerts.some(concert => {
          const [, , concertYear] = concert.date.split('-');
          return concertYear === year;
        })
      )
      .map(band => ({
        ...band,
        concerts: band.concerts
          .filter(concert => {
            const [, , concertYear] = concert.date.split('-');
            return concertYear === year;
          })
          .sort((a, b) => {
            const [dayA, monthA, yearA] = a.date.split('-').map(Number);
            const [dayB, monthB, yearB] = b.date.split('-').map(Number);

            const dateA = new Date(yearA, monthA - 1, dayA);
            const dateB = new Date(yearB, monthB - 1, dayB);

            return dateA.getTime() - dateB.getTime();
          })
      }))
      .sort((a, b) => {
        const [dayA, monthA, yearA] = a.concerts[0].date.split('-').map(Number);
        const [dayB, monthB, yearB] = b.concerts[0].date.split('-').map(Number);

        const dateA = new Date(yearA, monthA - 1, dayA);
        const dateB = new Date(yearB, monthB - 1, dayB);

        return dateA.getTime() - dateB.getTime();
      });
  }

  function getConcertStats() {
    const totalConcerts = wrappedBands.reduce(
      (total, band) => total + band.concerts.length,
      0
    );
    const uniqueBands = wrappedBands.length;

    return {
      uniqueBands,
      totalConcerts
    };
  }

  function getMostSeenBand() {
    const mostConcerts = wrappedBands.reduce((maxConcerts, currentBand) => {
      return Math.max(maxConcerts, currentBand.concerts.length);
    }, 0);

    return wrappedBands.filter(band => band.concerts.length === mostConcerts);
  }

  return {
    bands: wrappedBands,
    stats: getConcertStats(),
    mostSeenBand: getMostSeenBand()
  };
}
