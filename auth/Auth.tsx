"use client";

import { ReactNode, useEffect, useState } from "react";
import { AuthContext, User } from "./AuthContext";
import { useRouter } from "next/navigation";
import supabase from "@/utils/supabase";

function Auth({ children }: { children: ReactNode }) {
  // const [supabase] = useState(() => createPagesBrowserClient());
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (
      typeof window !== undefined &&
      localStorage.getItem("sb-guerfzlhzjrpooirzvlf-auth-token") &&
      !user
    ) {
      const newUser = JSON.parse(
        localStorage.getItem("sb-guerfzlhzjrpooirzvlf-auth-token")!
      ).user;
      setUser(newUser);
    }

    if (typeof window !== undefined && !user) {
      router.push("/login");
    }

    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  return (
    <AuthContext.Provider value={{ supabase, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default Auth;
