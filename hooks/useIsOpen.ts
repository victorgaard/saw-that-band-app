'use client';

import { useState } from 'react';

function useIsOpen(defaultState: boolean = false) {
  const [isOpen, setIsOpen] = useState(defaultState);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  function toggle() {
    setIsOpen(!isOpen);
  }

  return { isOpen, open, close, toggle };
}

export default useIsOpen;
