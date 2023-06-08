'use client';

import { TicketIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { useContext } from 'react';
import { AuthContext } from '@/auth/AuthContext';
import { usePathname } from 'next/navigation';
import LayoutSideBar from './LayoutSideBar';

function LayoutSideBarContainer() {
  const { user } = useContext(AuthContext);
  const path = usePathname();

  const routes = [
    {
      label: 'Bands',
      href: '/dashboard',
      icon: <TicketIcon className="h-6 w-6" />
    },
    {
      label: 'Profile',
      href: '/profile',
      icon: <UserCircleIcon className="h-6 w-6" />
    }
  ];

  return (
    <LayoutSideBar
      profileName={user?.user_metadata.name}
      routes={routes}
      path={path}
    />
  );
}

export default LayoutSideBarContainer;
