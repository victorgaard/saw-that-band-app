import Button from '@/components/Button';
import Input from '@/components/Input';
import { Concert } from '@/types/global';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

type BandPageAddConcertProps = {
  addConcert: (newConcert: Concert) => void;
};

function BandPageAddConcert({ addConcert }: BandPageAddConcertProps) {
  const [add, setAdd] = useState(false);
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    setLocation('');
    setDate('');
  }, [addConcert]);

  if (add)
    return (
      <div className="flex flex-col gap-4 rounded-lg bg-zinc-700 p-6">
        <p className="font-medium">Add new concert</p>
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
        <div className="flex items-center justify-end gap-2">
          <Button style="ghost" onClick={() => setAdd(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              setAdd(false);
              addConcert({
                location,
                date
              });
            }}
            style="secondary"
            disabled={!location || !date}
          >
            Add concert
          </Button>
        </div>
      </div>
    );

  return (
    <div
      onClick={() => setAdd(true)}
      className="flex cursor-pointer items-center gap-4 rounded-lg border border-zinc-700 bg-transparent p-6 text-sm hover:bg-zinc-700"
    >
      <PlusCircleIcon className="h-6 w-6" /> Add new concert
    </div>
  );
}

export default BandPageAddConcert;
