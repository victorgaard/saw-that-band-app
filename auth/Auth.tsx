"use client";

import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { ReactNode, useState } from "react";
import { AuthContext, User } from "./AuthContext";

function Auth({ children }: { children: ReactNode }) {
  const [supabase] = useState(() => createPagesBrowserClient());
  const [user, setUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default Auth;
