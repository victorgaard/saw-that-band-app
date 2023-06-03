"use client";

import { AuthContext } from "@/auth/AuthContext";
import { useContext } from "react";
import Link from "next/link";

function Navbar() {
  const { user } = useContext(AuthContext);

  return (
    <nav className="fixed bg-black right-0 left-0 flex items-center py-4 px-8 justify-between">
      <span>Welcome {user ? user.email : "Guest"}</span>
      {user && (
        <>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/profile">Profile</Link>
        </>
      )}
      {user ? (
        <Link href="/logout">Sign out</Link>
      ) : (
        <Link href="/login">Sign in</Link>
      )}
    </nav>
  );
}

export default Navbar;
