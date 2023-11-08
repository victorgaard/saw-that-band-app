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
import classNames from 'classnames';

function SidebarMobile() {
  const { user } = useContext(AuthContext);
  const path = usePathname();

  if (!user) return null;

  return (
    <div className="absolute bottom-0 left-0 right-0 flex h-20 items-center border-t border-zinc-850 bg-zinc-900">
      <div className="flex h-full w-full justify-between gap-2 p-2">
        <Link
          href="/new"
          className={classNames(
            'flex flex-1 shrink-0 items-center justify-center rounded-lg transition-colors active:bg-zinc-800',
            {
              'bg-zinc-600 text-white': path === '/new',
              'bg-zinc-800 text-zinc-400': path !== '/new'
            }
          )}
        >
          <PlusCircleIcon className="h-6 w-6" />
        </Link>
        <Link
          href="/bands"
          className={classNames(
            'flex flex-1 shrink-0 items-center justify-center rounded-lg transition-colors active:bg-zinc-800',
            {
              'bg-zinc-600 text-white': path === '/bands',
              'bg-zinc-800 text-zinc-400': path !== '/bands'
            }
          )}
        >
          <TicketIcon className="h-6 w-6" />
        </Link>
        <Link
          href="/profile"
          className={classNames(
            'flex flex-1 shrink-0 items-center justify-center rounded-lg transition-colors active:bg-zinc-800',
            {
              'bg-zinc-600 text-white': path === '/profile',
              'bg-zinc-800 text-zinc-400': path !== '/profile'
            }
          )}
        >
          <UserCircleIcon className="h-6 w-6" />
        </Link>
        <a
          href="https://www.buymeacoffee.com/sawthatband"
          target="_blank"
          rel="noreferrer"
          className="flex flex-1 shrink-0 items-center justify-center rounded-lg bg-zinc-800 text-zinc-400 transition-colors active:bg-zinc-800"
        >
          <HeartIcon className="h-6 w-6" />
        </a>
        <a
          href="https://saw-that-band.canny.io/feedback"
          target="_blank"
          rel="noreferrer"
          className="flex flex-1 shrink-0 items-center justify-center rounded-lg bg-zinc-800 text-zinc-400 transition-colors active:bg-zinc-800"
        >
          <ChatBubbleLeftRightIcon className="h-6 w-6" />
        </a>
        <Link
          href="/logout"
          className="group relative flex flex-1 shrink-0 items-center justify-center rounded-lg bg-zinc-800 text-zinc-400 transition-colors active:bg-zinc-800"
        >
          <ArrowLeftOnRectangleIcon className="h-6 w-6" />
        </Link>
      </div>
    </div>
  );
}

export default SidebarMobile;
