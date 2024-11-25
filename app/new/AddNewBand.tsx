import AddConcert from '@/components/AddConcert';
import AddGenre from '@/components/AddGenre';
import Button from '@/components/Button';
import EditConcert from '@/components/EditConcert';
import { Tab, TabContent, Tabs, TabsList } from '@/components/Tabs';
import { ToastContext } from '@/components/Toast/ToastContext';
import useBands from '@/hooks/useBands';
import { Concert, NewBand } from '@/types/global';
import { trimString } from '@/utils/trimString';
import { LightBulbIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

type AddNewBandProps = {
  selectedBand: NewBand | undefined;
  isMobile: boolean;
  resetBandPicked: () => void;
};

type TabType = 'concerts' | 'genres';

function AddNewBand({
  selectedBand,
  isMobile,
  resetBandPicked
}: AddNewBandProps) {
  const { addBand } = useBands();
  const { toast } = useContext(ToastContext);

  const router = useRouter();

  const [band, setBand] = useState<NewBand>();
  const [selectedTab, setSelectedTab] = useState<TabType>('concerts');

  useEffect(() => {
    setBand(selectedBand);
  }, [selectedBand]);

  function addConcert(newConcert: Concert) {
    if (!band) return;
    const sanitizedConcert = {
      ...newConcert,
      location: trimString(newConcert.location)
    };
    const concerts = [...band.concerts, sanitizedConcert];
    setBand({ ...band, concerts });
  }

  function editConcert(idx: number, updatedConcert: Concert) {
    if (!band) return;
    const sanitizedConcert = {
      ...updatedConcert,
      location: trimString(updatedConcert.location)
    };
    const concerts = [...band.concerts];
    concerts[idx] = sanitizedConcert;
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

  function addBandToCatalogue() {
    if (!band) return;

    if (band.genre.length === 0) {
      setSelectedTab('genres');
      return toast({
        type: 'error',
        title: `Genre is missing for ${band.band}`,
        message: 'Add at least one genre to proceed'
      });
    }

    addBand(band)
      .then(res => {
        toast({
          type: 'success',
          title: 'Band added',
          message: `${res[0].band} was successfully added to your catalogue`
        });
        const bandNameFormatted = res[0].band.replaceAll(' ', '-');
        router.push(`bands/${bandNameFormatted}/${res[0].id}`);
      })
      .catch(() =>
        toast({
          type: 'error',
          title: 'Band not added',
          message: `${band.band} could not be added to your catalogue. Please try again later.`
        })
      );
  }

  if (!band) return null;

  return (
    <div className="relative bg-zinc-850 p-4 sm:p-8">
      <div className="-my-8 -mr-8 flex h-[calc(100dvh-130px)] animate-fade-in-left-no-forwards flex-col gap-4 overflow-auto pb-12 pr-8 pt-8 sm:h-[calc(100vh-101px)] sm:animate-none">
        <div className="flex items-center gap-6">
          {band.picture && (
            <Image
              width={112}
              height={112}
              src={band.picture}
              alt={band.band}
              className="h-[112px] w-[112px] rounded-lg object-cover"
              priority
            />
          )}
          {!band.picture && (
            <div className="flex h-[112px] w-[112px] items-center justify-center rounded-lg bg-zinc-870 text-5xl text-zinc-400">
              {band.band[0]}
            </div>
          )}
          <div className="flex flex-col gap-2">
            <p className="text-2xl font-semibold sm:text-4xl">{band.band}</p>
            {band.concerts.length !== 0 && (
              <p className="text-sm text-zinc-400">
                Seen live {band.concerts.length}{' '}
                {band.concerts.length === 1 ? 'once' : 'times'}
              </p>
            )}
          </div>
        </div>
        <div>
          <Tabs
            defaultValue="concerts"
            value={selectedTab}
            onValueChange={value => setSelectedTab(value as TabType)}
          >
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
                      isMobile={isMobile}
                    />
                  </div>
                ))}
                <AddConcert addConcert={addConcert} isMobile={isMobile} />
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
      <div className="fixed bottom-0 left-0 right-0 z-40 -mx-4 flex gap-4 border-t border-zinc-700 bg-zinc-800 p-6 pr-8 sm:absolute sm:mx-0 sm:bg-zinc-850 sm:p-8">
        <Button style="outline" onClick={resetBandPicked}>
          Cancel
        </Button>
        <div className="flex w-full flex-col">
          <Button
            disabled={band.concerts.length === 0}
            onClick={addBandToCatalogue}
          >
            Add {band.band} {!isMobile && 'to the catalogue'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddNewBand;
