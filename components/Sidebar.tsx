'use client';

import { AuthContext } from '@/auth/AuthContext';
import {
  ArrowLeftOnRectangleIcon,
  ChatBubbleBottomCenterTextIcon,
  PlusCircleIcon,
  TicketIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';
import { useContext } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import Button from './Button';
import Tooltip from './Tooltip';

function Sidebar() {
  const { user } = useContext(AuthContext);
  const path = usePathname();

  const routes = [
    {
      label: 'Bands',
      href: '/bands',
      icon: <TicketIcon className="h-6 w-6" />
    },
    {
      label: 'Profile',
      href: '/profile',
      icon: <UserCircleIcon className="h-6 w-6" />
    }
  ];

  if (!user) return null;

  return (
    <div className="relative flex w-20 flex-col items-center justify-between gap-7 p-6">
      <div className="flex flex-col items-center gap-6">
        <div>
          <Link href="/new" className="group relative">
            <Button size="sm">
              <PlusCircleIcon className="h-6 w-6" />
              <Tooltip>Add new band</Tooltip>
            </Button>
          </Link>
        </div>
        <div className="flex flex-col gap-4">
          {routes.map(route => {
            const isActive = path.includes(route.href);
            return (
              <Link
                key={route.label}
                href={route.href}
                aria-label={`Navigate to ${route.label}`}
                className={classNames('group relative flex items-center', {
                  'rounded outline outline-2 outline-zinc-500/80': isActive
                })}
              >
                <div
                  className={classNames(
                    'absolute -left-5 w-[5px] rounded-r transition-all',
                    {
                      'h-8 bg-zinc-500': isActive,
                      'h-3 bg-zinc-800 group-hover:h-4': !isActive
                    }
                  )}
                />
                <div
                  className={classNames(
                    'flex h-10 w-10 items-center justify-center rounded transition-colors',
                    {
                      'bg-zinc-600 text-white': isActive,
                      'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 active:bg-zinc-800':
                        !isActive
                    }
                  )}
                >
                  {route.icon}
                </div>
                <Tooltip>{route.label}</Tooltip>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="h-full w-[1px] bg-zinc-700/50" />
      <div className="flex flex-col gap-4">
        <a
          href="https://saw-that-band.canny.io/feedback"
          target="_blank"
          rel="noreferrer"
          className="group relative flex h-10 w-10 shrink-0 items-center justify-center rounded bg-zinc-800 text-zinc-400 transition-colors hover:bg-zinc-700 active:bg-zinc-800"
        >
          <ChatBubbleBottomCenterTextIcon className="h-6 w-6" />
          <Tooltip>Share feedback</Tooltip>
        </a>
        <Link
          href="/logout"
          className="group relative flex h-10 w-10 shrink-0 items-center justify-center rounded bg-zinc-800 text-zinc-400 transition-colors hover:bg-zinc-700 active:bg-zinc-800"
        >
          <ArrowLeftOnRectangleIcon className="h-6 w-6" />
          <Tooltip>Logout</Tooltip>
        </Link>
      </div>
      <div className="flex shrink-0 items-end justify-center text-sm text-zinc-600">
        <p className="rotate-180 [writing-mode:vertical-lr]">
          <span className="font-semibold text-zinc-500">
            {user?.user_metadata.username?.toLowerCase()}
          </span>{' '}
          saw that band
        </p>
      </div>
    </div>
  );
}

export default Sidebar;
