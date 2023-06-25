import { ChangeEvent, KeyboardEvent, useState } from 'react';

type AddGenreProps = {
  addGenre: (newGenre: string) => void;
};

function AddGenre({ addGenre }: AddGenreProps) {
  const [newGenre, setNewGenre] = useState('');

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const formattedValue = e.target.value
      .replace(/[^a-z\s-]/g, '')
      .toLowerCase();
    setNewGenre(formattedValue);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (!newGenre) return;

    if (e.key === 'Enter') {
      addGenre(newGenre);
      setNewGenre('');
    }
  }

  return (
    <input
      value={newGenre}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      placeholder="new genre..."
      className="h-[34px] min-w-[200px] flex-1 bg-transparent focus:border-0 focus:outline-none"
      autoComplete="off"
      data-lpignore="true"
      data-form-type="other"
      maxLength={40}
      autoFocus
    />
  );
}

export default AddGenre;
