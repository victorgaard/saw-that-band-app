import Button from '@/components/Button';
import Input from '@/components/Input';
import { Concert } from '@/types/global';
import formatDate from '@/utils/formatDate';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

type BandPageEditConcertProps = {
  idx: number;
  concert: Concert;
  numOfConcerts: number;
  editConcert: (idx: number, updatedConcert: Concert) => void;
  deleteConcert: (idx: number) => void;
};

function BandPageEditConcert({
  idx,
  concert,
  numOfConcerts,
  editConcert,
  deleteConcert
}: BandPageEditConcertProps) {
  const [edit, setEdit] = useState(false);
  const [location, setLocation] = useState(concert.location);
  const [date, setDate] = useState(concert.date);

  if (edit)
    return (
      <div className="flex flex-col gap-4 rounded-lg bg-zinc-700 p-6">
        <p className="font-medium">Edit concert</p>
        <Input
          label="Location"
          value={location}
          onChange={e => setLocation(e.target.value)}
          autoFocus
        />
        <Input
          label="Date"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
        <div className="flex items-center justify-between">
          <Button
            style="ghost"
            onClick={() => {
              deleteConcert(idx);
              setEdit(false);
            }}
            disabled={numOfConcerts === 1}
          >
            <TrashIcon className="h-6 w-6" /> Delete concert
          </Button>
          <div className="flex items-center gap-2">
            <Button style="ghost" onClick={() => setEdit(false)}>
              Cancel
            </Button>
            <Button
              style="secondary"
              onClick={() => {
                editConcert(idx, { location, date });
                setEdit(false);
              }}
              disabled={!location || !date}
            >
              Save changes
            </Button>
          </div>
        </div>
      </div>
    );

  return (
    <div
      onClick={() => setEdit(true)}
      className="group flex cursor-pointer items-center justify-between gap-2 rounded-lg bg-zinc-800 p-6 text-sm hover:bg-zinc-700"
    >
      <div className="flex items-center gap-4">
        <p className="min-w-[100px] truncate">{concert.location}</p>
        <p>{formatDate(concert.date)}</p>
      </div>
      <span className="opacity-0 group-hover:opacity-100">Edit concert</span>
    </div>
  );
}

export default BandPageEditConcert;
