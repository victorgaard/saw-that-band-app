"use client";

import { TicketIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import SlimSideBar from "./SlimSideBar";
import { useContext } from "react";
import { AuthContext } from "@/auth/AuthContext";

function SlimSideBarContainer() {
  const { user } = useContext(AuthContext);

  if (!user) return null;

  const routes = [
    {
      label: "Bands",
      href: "/dashboard",
      icon: <TicketIcon className="h-6 w-6" />,
    },
    {
      label: "Profile",
      href: "/profile",
      icon: <UserCircleIcon className="h-6 w-6" />,
    },
  ];

  return <SlimSideBar profileName={user?.user_metadata.name} routes={routes} />;
}

export default SlimSideBarContainer;
