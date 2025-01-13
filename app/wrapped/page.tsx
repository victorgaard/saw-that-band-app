'use client';

import { AuthContext } from '@/auth/AuthContext';
import useBands from '@/hooks/useBands';
import LoadingSpinner from '@/icons/LoadingSpinner';
import { Bands } from '@/types/global';
import { useContext, useEffect, useState } from 'react';
import { WrappedContent } from './WrappedContent';

function WrappedPage() {
  const year = '2024';
  const { user } = useContext(AuthContext);
  const { getAllBands } = useBands();

  const [bands, setBands] = useState<Bands | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!user) return;
    setError(false);

    try {
      getAllBands(user.id).then(res => setBands(res));
    } catch (e) {
      console.warn(e);
      setError(true);
    }
  }, [user, getAllBands]);

  if (!bands || !user) return <LoadingSpinner />;
  if (!bands && !user && error)
    return <>There was an error, please try again later</>;

  return <WrappedContent year={year} user={user} bands={bands} />;
}

export default WrappedPage;
