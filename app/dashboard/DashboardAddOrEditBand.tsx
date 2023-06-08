import Button from '@/components/Button';
import Input from '@/components/Input';
import { Band } from '@/types/global';
import Image from 'next/image';

type DashboardAddOrEditBandProps = {
  selectedBand: Band | undefined;
  addGenre: () => void;
};

function DashboardAddOrEditBand({
  selectedBand,
  addGenre
}: DashboardAddOrEditBandProps) {
  if (!selectedBand)
    return (
      <div className="bg-zinc-900 p-12 py-6">
        Select a band or add a new band
      </div>
    );
  return (
    <div className="flex max-h-screen flex-col gap-6 overflow-auto bg-zinc-900 p-12 py-6">
      <div className="flex items-center gap-6">
        <Image
          src={selectedBand.picture}
          width={144}
          height={144}
          className="h-36 w-36 rounded-lg bg-black object-cover"
          alt={selectedBand.band}
        />
        <p className="text-4xl font-bold text-white">{selectedBand.band}</p>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {selectedBand.genre.map(currentGenre => (
          <Input
            key={currentGenre}
            label="Genre"
            value={currentGenre}
            type="text"
            onChange={() => {}}
          />
        ))}
      </div>
      {selectedBand.concerts.map(concert => (
        <div className="grid grid-cols-2 gap-6" key={concert.date}>
          <Input
            label="Date"
            value={concert.date}
            type="text"
            onChange={() => {}}
          />
          <Input
            label="Location"
            value={concert.location}
            type="text"
            onChange={() => {}}
          />
        </div>
      ))}
      <Button>Save changes</Button>
    </div>
  );
}

export default DashboardAddOrEditBand;
