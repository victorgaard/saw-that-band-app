"use client";

import { AuthContext } from "@/auth/AuthContext";
import { ToastContext } from "@/components/Toast/ToastContext";
import { Database } from "@/types/supabase";
import { useCallback, useContext, useEffect, useState } from "react";

function Dashboard() {
  const { user, supabase } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);

  const [bands, setBands] =
    useState<Database["public"]["Tables"]["Bands"]["Row"][]>();

  const getBands = useCallback(async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("Bands")
      .select()
      .eq("user_id", user.id)
      .order("band", { ascending: true });

    if (error)
      return toast({
        type: "error",
        title: "Bands could not be loaded",
        message:
          "There was an error loading your bands. Please try again later.",
      });

    setBands(data);
  }, [supabase, user, toast]);

  useEffect(() => {
    if (user && !bands) {
      getBands();
    }
  }, [user, bands, getBands]);

  if (!bands) return <>Loading...</>;

  return (
    <>
      {bands.map((band) => (
        <p key={band.id}>{band.band}</p>
      ))}
    </>
  );
}

export default Dashboard;
