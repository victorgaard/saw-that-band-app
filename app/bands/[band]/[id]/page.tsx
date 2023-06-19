'use client';

import { AuthContext } from '@/auth/AuthContext';
import Button from '@/components/Button';
import { Tab, TabContent, Tabs, TabsList } from '@/components/Tabs';
import { ToastContext } from '@/components/Toast/ToastContext';
import { Band, Concert } from '@/types/global';
import supabase from '@/utils/supabase';
import Image from 'next/image';
import { useContext, useEffect, useRef, useState } from 'react';
import BandPageAddConcert from './BandPageAddConcert';
import BandPageEditConcert from './BandPageEditConcert';
import Input from '@/components/Input';
import { XMarkIcon } from '@heroicons/react/24/outline';

type EditBandPageProps = {
  params: { id: string };
};

function EditBandPage({ params }: EditBandPageProps) {
  const { id } = params;
  const { user } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);

  const [band, setBand] = useState<Band>();
  const bandRef = useRef<Band>();

  useEffect(() => {
    async function getBand() {
      if (!user) return;

      const { data, error } = await supabase
        .from('Bands')
        .select()
        .eq('user_id', user.id)
        .eq('id', id);

      if (error || data.length > 1)
        return toast({
          type: 'error',
          title: 'Band could not be loaded',
          message:
            'There was an error loading this band. Please try again later.'
        });

      setBand(data[0]);
      bandRef.current = data[0];
    }

    if (user && !band) {
      getBand();
    }
  }, [user, band, toast, id]);

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

  function addGenre() {
    if (!band) return;
    const genre = [...band.genre, ''];
    setBand({ ...band, genre });
  }

  function removeGenre(idx: number) {
    if (!band) return;
    const genre = [...band.genre];
    genre.splice(idx, 1);
    setBand({ ...band, genre });
  }

  if (!band) return <div className="bg-zinc-850 p-8">Loading band</div>;

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
                    <BandPageEditConcert
                      idx={idx}
                      concert={concert}
                      numOfConcerts={band.concerts.length}
                      editConcert={editConcert}
                      deleteConcert={deleteConcert}
                    />
                  </div>
                ))}
                <BandPageAddConcert addConcert={addConcert} />
              </div>
            </TabContent>
            <TabContent value="genres">
              <div className="grid grid-cols-2 gap-4">
                {band.genre.map((genre, idx) => (
                  <div
                    key={`${idx}${genre}`}
                    className="flex items-center justify-between gap-2"
                  >
                    <Input
                      value={genre}
                      placeholder="Genre"
                      onChange={() => {}}
                    />
                    <Button
                      style="ghost"
                      size="sm"
                      onClick={() => removeGenre(idx)}
                    >
                      <XMarkIcon className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button style="secondary" onClick={addGenre}>
                  Add genre
                </Button>
              </div>
            </TabContent>
          </Tabs>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex flex-col border-t border-zinc-700 bg-zinc-850 p-8 py-6">
        <Button disabled={band === bandRef.current}>
          Save changes to {band.band}
        </Button>
      </div>
    </div>
  );
}

export default EditBandPage;
