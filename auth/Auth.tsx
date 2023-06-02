"use client";

import { ReactNode, useEffect, useState } from "react";
import { AuthContext, User } from "./AuthContext";
import { useRouter, usePathname } from "next/navigation";
import supabase from "@/utils/supabase";

function Auth({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const path = usePathname();

  async function getSession() {
    const { data, error } = await supabase.auth.getSession();

    if (!error && data.session) {
      return setUser(data.session.user);
    }

    throw new Error("Could not refresh the session");
  }

  useEffect(() => {
    if (
      typeof window !== undefined &&
      localStorage.getItem("sb-guerfzlhzjrpooirzvlf-auth-token") &&
      !user
    ) {
      getSession();
    }

    if (
      typeof window !== undefined &&
      !localStorage.getItem("sb-guerfzlhzjrpooirzvlf-auth-token") &&
      !user
    ) {
      router.push("/login");
    }

    if ((user && path === "/login") || (user && path === "/")) {
      router.push("/dashboard");
    }
  }, [user, router, path]);

  return (
    <AuthContext.Provider value={{ supabase, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default Auth;
