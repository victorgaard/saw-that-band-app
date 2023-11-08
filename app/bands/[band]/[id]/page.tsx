'use client';

import { AuthContext } from '@/auth/AuthContext';
import Button from '@/components/Button';
import { Tab, TabContent, Tabs, TabsList } from '@/components/Tabs';
import { ToastContext } from '@/components/Toast/ToastContext';
import useBands from '@/hooks/useBands';
import { Band, Concert } from '@/types/global';
import {
  LightBulbIcon,
  TrashIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useContext, useEffect, useRef, useState } from 'react';
import { BandsContext } from '../../layout';
import EditConcert from '@/components/EditConcert';
import AddGenre from '@/components/AddGenre';
import AddConcert from '@/components/AddConcert';
import Loading from './loading';
import { useRouter } from 'next/navigation';
import useIsOpen from '@/hooks/useIsOpen';
import { Modal, ModalFooter } from '@/components/Modal';

type EditBandPageProps = {
  params: { id: string };
};

type TabType = 'concerts' | 'genres';

function EditBandPage({ params }: EditBandPageProps) {
  const { id } = params;
  const { user } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);
  const { setHasUpdate } = useContext(BandsContext);
  const { getBand, updateBand, deleteBand } = useBands();
  const {
    isOpen: isDeleteModalOpen,
    open: openDeleteModal,
    close: closeDeleteModal
  } = useIsOpen();

  const [band, setBand] = useState<Band>();
  const [selectedTab, setSelectedTab] = useState<TabType>('concerts');
  const [isDeletingBand, setIsDeletingBand] = useState(false);

  const bandRef = useRef<Band>();
  const router = useRouter();

  const width = (typeof window !== 'undefined' && window.innerWidth) || 0;
  const isMobile = width < 640;

  useEffect(() => {
    if (user) {
      getBand(user.id, id)
        .then(res => {
          setBand(res[0]);
          bandRef.current = res[0];
        })
        .catch(() =>
          toast({
            type: 'error',
            title: 'Band could not be loaded',
            message:
              'There was an error loading this band. Please try again later.'
          })
        );
    }
  }, [user, id, toast, getBand]);

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

  function editBand() {
    if (!user || !band) return;

    if (band.genre.length === 0) {
      setSelectedTab('genres');
      return toast({
        type: 'error',
        title: `Genre is missing for ${band.band}`,
        message: 'Add at least one genre to proceed'
      });
    }

    updateBand(user.id, id, band)
      .then(() => {
        setHasUpdate(true);
        bandRef.current = band;
        toast({
          type: 'success',
          title: 'Band updated',
          message: `${band.band} was successfully updated.`
        });
      })
      .catch(() => {
        toast({
          type: 'error',
          title: 'Band could not be updated',
          message:
            'There was an error updating this band. Please try again later.'
        });
      });
  }

  function onDeleteBand() {
    if (!user || !band) return;

    setIsDeletingBand(true);

    deleteBand(user.id, band.id)
      .then(() => {
        toast({
          type: 'success',
          title: 'Band deleted',
          message: `${band.band} was successfully deleted.`
        });
        setHasUpdate(true);
        router.push('/bands');
      })
      .catch(() => {
        toast({
          type: 'error',
          title: 'Band could not be deleted',
          message:
            'There was an error deleting this band. Please try again later.'
        });
      })
      .finally(() => setIsDeletingBand(false));
  }

  if (!band) return <Loading />;

  return (
    <div className="relative bg-zinc-850 p-4 sm:p-8">
      <div className="-my-8 -mr-8 flex h-[calc(100dvh-71px)] flex-col gap-4 overflow-auto pb-12 pr-8 pt-8 sm:h-[calc(100vh-101px)]">
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
            <p className="text-sm text-zinc-400">
              Seen live {band.concerts.length}{' '}
              {band.concerts.length === 1 ? 'once' : 'times'}
            </p>
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
        <Button style="ghost" onClick={openDeleteModal}>
          <TrashIcon className="h-5 w-5" />
          {!isMobile && 'Delete'}
        </Button>
        <Button style="outline" onClick={() => router.push('/bands')}>
          Cancel
        </Button>
        <div className="flex w-full flex-col">
          <Button disabled={band === bandRef.current} onClick={editBand}>
            Save changes
          </Button>
        </div>
      </div>
      <Modal isOpen={isDeleteModalOpen} close={closeDeleteModal}>
        <p className="text-lg font-medium text-white">Delete {band.band}</p>
        <p className="mt-4 text-sm text-zinc-300">
          Are you sure you want to delete {band.band} from your catalogue?
        </p>
        <p className="mt-4 text-sm text-zinc-300">
          Keep in mind that all concerts from {band.band} will be deleted as
          well in the process.
        </p>
        <ModalFooter>
          <Button style="ghost" onClick={closeDeleteModal}>
            Cancel
          </Button>
          <Button
            style="delete"
            onClick={onDeleteBand}
            loading={isDeletingBand}
          >
            Delete {band.band}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default EditBandPage;
