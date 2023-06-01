"use client";

import { AuthContext } from "@/auth/AuthContext";
import { useContext } from "react";

async function Logout() {
  const { supabase, setUser } = useContext(AuthContext);

  await supabase.auth.signOut();
  setUser(null);

  return null;
}

export default Logout;
