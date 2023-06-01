"use client";

import { AuthContext } from "@/auth/AuthContext";
import { useContext } from "react";
import Link from "next/link";

function Navbar() {
  const { user } = useContext(AuthContext);

  return (
    <nav className="flex items-center px-8 justify-between">
      <span>Welcome {user ? user.email : "Guest"}</span>
      {user ? (
        <Link href="/logout">Sign out</Link>
      ) : (
        <Link href="/login">Sign in</Link>
      )}
    </nav>
  );
}

export default Navbar;
