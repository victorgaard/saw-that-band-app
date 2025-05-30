import Button from '@/components/Button';
import Input from '@/components/Input';
import { Concert } from '@/types/global';
import dayMonthYearToFullDateStyle from '@/utils/dayMonthYearToFullDateStyle';
import dayMonthYearToYearMonthDay from '@/utils/dayMonthYearToYearMonthDay';
import yearMonthDayToDayMonthYear from '@/utils/yearMonthDayToDayMonthYear';
import { TrashIcon } from '@heroicons/react/24/outline';
import { cn } from '@/utils/cn';
import { useEffect, useState } from 'react';

type EditConcertProps = {
  idx: number;
  concert: Concert;
  numOfConcerts: number;
  isMobile: boolean;
  editConcert: (idx: number, updatedConcert: Concert) => void;
  deleteConcert: (idx: number) => void;
};

function EditConcert({
  idx,
  concert,
  numOfConcerts,
  isMobile,
  editConcert,
  deleteConcert
}: EditConcertProps) {
  const [edit, setEdit] = useState(false);
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(dayMonthYearToYearMonthDay(''));

  useEffect(() => {
    setLocation(concert.location);
    setDate(dayMonthYearToYearMonthDay(concert.date));
  }, [edit, concert]);

  if (edit)
    return (
      <div
        className={cn('flex flex-col gap-4 rounded-lg bg-zinc-700 p-6', {
          'fixed inset-0 z-50 animate-fade-in-up-shorter': isMobile
        })}
      >
        <p className="font-medium">Edit concert</p>
        <Input
          label="Location"
          value={location}
          onChange={e => setLocation(e.target.value)}
          placeholder="Location"
          autoFocus
        />
        <Input
          type="date"
          label="Date"
          value={date}
          onChange={e => {
            setDate(e.target.value);
          }}
          placeholder="dd-mm-yyyy"
        />
        <div className="flex items-center justify-between">
          {numOfConcerts > 1 && (
            <Button
              style="ghost"
              onClick={() => {
                deleteConcert(idx);
                setEdit(false);
              }}
            >
              <TrashIcon className="h-6 w-6" /> {!isMobile && 'Delete concert'}
            </Button>
          )}
          <div className="flex w-full items-center justify-end gap-2">
            <Button style="ghost" onClick={() => setEdit(false)}>
              Cancel
            </Button>
            <Button
              style="secondary"
              onClick={() => {
                editConcert(idx, {
                  location,
                  date: yearMonthDayToDayMonthYear(date)
                });
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
      <div className="flex w-full items-center justify-between gap-4 sm:justify-normal">
        <p className="min-w-[100px] truncate">{concert.location}</p>
        <p>
          {dayMonthYearToFullDateStyle(
            concert.date,
            isMobile ? 'medium' : 'full'
          )}
        </p>
      </div>
      {!isMobile && (
        <span className="whitespace-nowrap opacity-0 group-hover:opacity-100">
          Edit concert
        </span>
      )}
    </div>
  );
}

export default EditConcert;
