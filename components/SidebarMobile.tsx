'use client';

import {
  ArrowLeftOnRectangleIcon,
  ChatBubbleLeftRightIcon,
  HeartIcon,
  PlusCircleIcon,
  TicketIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Button from './Button';
import { useContext } from 'react';
import { AuthContext } from '@/auth/AuthContext';

function SidebarMobile() {
  const { user } = useContext(AuthContext);
  const path = usePathname();

  if (!user) return null;

  return (
    <div className="absolute bottom-0 left-0 right-0 flex h-20 items-center border-t border-zinc-850 bg-zinc-900">
      <div className="flex w-full justify-between gap-2 px-2">
        <Link href="/new" className="group relative">
          <Button>
            <PlusCircleIcon className="h-6 w-6" />
          </Button>
        </Link>
        <Link
          href="/bands"
          className="group relative flex flex-1 shrink-0 items-center justify-center rounded-lg bg-zinc-800 text-zinc-400 transition-colors hover:bg-zinc-700 active:bg-zinc-800"
        >
          <TicketIcon className="h-6 w-6" />
        </Link>
        <Link
          href="/profile"
          className="group relative flex flex-1 shrink-0 items-center justify-center rounded-lg bg-zinc-800 text-zinc-400 transition-colors hover:bg-zinc-700 active:bg-zinc-800"
        >
          <UserCircleIcon className="h-6 w-6" />
        </Link>
        <a
          href="https://www.buymeacoffee.com/sawthatband"
          target="_blank"
          rel="noreferrer"
          className="group relative flex flex-1 shrink-0 items-center justify-center rounded-lg bg-zinc-800 text-zinc-400 transition-colors hover:bg-zinc-700 active:bg-zinc-800"
        >
          <HeartIcon className="h-6 w-6" />
        </a>
        <a
          href="https://saw-that-band.canny.io/feedback"
          target="_blank"
          rel="noreferrer"
          className="group relative flex flex-1 shrink-0 items-center justify-center rounded-lg bg-zinc-800 text-zinc-400 transition-colors hover:bg-zinc-700 active:bg-zinc-800"
        >
          <ChatBubbleLeftRightIcon className="h-6 w-6" />
        </a>
        <Link
          href="/logout"
          className="group relative flex flex-1 shrink-0 items-center justify-center rounded-lg bg-zinc-800 text-zinc-400 transition-colors hover:bg-zinc-700 active:bg-zinc-800"
        >
          <ArrowLeftOnRectangleIcon className="h-6 w-6" />
        </Link>
      </div>
    </div>
  );
}

export default SidebarMobile;
