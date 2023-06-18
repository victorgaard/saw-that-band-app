'use client';

import Button from '@/components/Button';
import { useRouter } from 'next/navigation';

function DashboardPage() {
  const router = useRouter();
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-zinc-800">
      Select a band to edit or add a new band
      <Button onClick={() => router.push('/new')}>Add new band</Button>
    </div>
  );
}

export default DashboardPage;
