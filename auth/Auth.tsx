"use client";

import { ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { useRouter, usePathname } from "next/navigation";
import supabase from "@/utils/supabase";
import { User } from "@supabase/supabase-js";
import { ToastContext } from "@/components/Toast/ToastContext";

function Auth({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useContext(ToastContext);
  const router = useRouter();
  const path = usePathname();

  const getSession = useCallback(async () => {
    const { data, error } = await supabase.auth.getSession();

    if (!error && data.session) {
      return setUser(data.session.user);
    }

    return toast({
      type: "error",
      title: "Account error",
      message:
        "There was an error getting your account. Please try again later.",
    });
  }, [toast]);

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
      !user &&
      path !== "/signup"
    ) {
      router.push("/login");
    }

    if (
      (user && path === "/") ||
      (user && path === "/login") ||
      (user && path === "/signup")
    ) {
      router.push("/dashboard");
    }
  }, [user, router, path, getSession]);

  return (
    <AuthContext.Provider value={{ supabase, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default Auth;
