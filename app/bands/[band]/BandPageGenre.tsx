import Button from '@/components/Button';
import Input from '@/components/Input';
import { XMarkIcon } from '@heroicons/react/24/outline';

type BandPageGenreProps = {
  idx: number;
  genre: string;
  removeGenre: (idx: number) => void;
};

function BandPageGenre({ idx, genre, removeGenre }: BandPageGenreProps) {
  return (
    <div
      key={`${idx}${genre}`}
      className="flex items-center justify-between gap-2"
    >
      <Input value={genre} placeholder="Genre" onChange={() => {}} />
      <Button style="ghost" size="sm" onClick={() => removeGenre(idx)}>
        <XMarkIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}

export default BandPageGenre;
