import AddConcert from '@/components/AddConcert';
import AddGenre from '@/components/AddGenre';
import Button from '@/components/Button';
import EditConcert from '@/components/EditConcert';
import { Tab, TabContent, Tabs, TabsList } from '@/components/Tabs';
import { Concert, NewBand } from '@/types/global';
import { LightBulbIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

type AddNewBandProps = {
  selectedBand: NewBand | undefined;
};

function AddNewBand({ selectedBand }: AddNewBandProps) {
  const [band, setBand] = useState<NewBand>();
  const bandRef = useRef<NewBand>();

  useEffect(() => {
    setBand(selectedBand);
  }, [selectedBand]);

  function addConcert(newConcert: Concert) {
    if (!band) return;
    const concerts = [...band.concerts, newConcert];
    setBand({ ...band, concerts });
  }

  function editConcert(idx: number, updatedConcert: Concert) {
    if (!band) return;
    const concerts = [...band.concerts];
    concerts[idx] = updatedConcert;
    setBand({ ...band, concerts });
  }

  function deleteConcert(idx: number) {
    if (!band) return;
    const concerts = [...band.concerts];
    concerts.splice(idx, 1);
    setBand({ ...band, concerts });
  }

  function addGenre(newGenre: string) {
    if (!band) return;
    const genre = [...band.genre, newGenre];
    setBand({ ...band, genre });
  }

  function removeGenre(idx: number) {
    if (!band) return;
    const genre = [...band.genre];
    genre.splice(idx, 1);
    setBand({ ...band, genre });
  }

  function addBand() {}

  if (band)
    return (
      <div className="relative bg-zinc-850 p-8">
        <div className="-my-8 -mr-8 flex h-[calc(100vh-101px)] flex-col gap-4 overflow-auto pb-12 pr-8 pt-8">
          <div className="flex items-center gap-6">
            <Image
              src={band.picture}
              width={128}
              height={128}
              alt={band.band}
              className="h-[128px] w-[128px] shrink-0 rounded-lg bg-zinc-600 object-cover shadow-2xl"
            />
            <div className="flex flex-col gap-2">
              <p className="text-4xl font-semibold">{band.band}</p>
              <p className="text-sm text-zinc-400">
                Seen live {band.concerts.length}{' '}
                {band.concerts.length === 1 ? 'time' : 'times'}
              </p>
            </div>
          </div>
          <div>
            <Tabs defaultValue="concerts">
              <TabsList className="-mx-8 flex items-center gap-4 px-8">
                <Tab value="concerts">Concerts</Tab>
                <Tab value="genres">Genres</Tab>
              </TabsList>
              <TabContent value="concerts">
                <div className="flex flex-col gap-2">
                  {band.concerts.map((concert, idx) => (
                    <div key={concert.date}>
                      <EditConcert
                        idx={idx}
                        concert={concert}
                        numOfConcerts={band.concerts.length}
                        editConcert={editConcert}
                        deleteConcert={deleteConcert}
                      />
                    </div>
                  ))}
                  <AddConcert addConcert={addConcert} />
                </div>
              </TabContent>
              <TabContent value="genres">
                <div className="flex flex-wrap gap-3 rounded-lg border border-zinc-700 bg-zinc-900/70 p-4 text-sm">
                  {band.genre.map((genre, idx) => (
                    <div
                      key={`${idx}${genre}`}
                      className="flex cursor-default items-center justify-between gap-2 whitespace-nowrap rounded-lg border border-transparent bg-zinc-850 px-3 py-1 pr-1 hover:border-zinc-700"
                    >
                      <span>{genre}</span>
                      <Button
                        style="ghost"
                        size="xs"
                        onClick={() => removeGenre(idx)}
                      >
                        <XMarkIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <AddGenre addGenre={addGenre} />
                </div>
                <div className="mt-4 flex items-center gap-1 text-xs text-zinc-300">
                  <LightBulbIcon className="h-3 w-3" /> Press enter to add a new
                  genre
                </div>
              </TabContent>
            </Tabs>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 flex flex-col border-t border-zinc-700 bg-zinc-850 p-8 py-6">
          <Button disabled={band === bandRef.current} onClick={addBand}>
            Add {band.band} to the catalogue
          </Button>
        </div>
      </div>
    );

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-zinc-800">
      Search for a band to add to your catalogue
    </div>
  );
}

export default AddNewBand;