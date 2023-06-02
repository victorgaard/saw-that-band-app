"use client";

import { AuthContext } from "@/auth/AuthContext";
import { Database } from "@/types/supabase";
import { useCallback, useContext, useEffect, useState } from "react";

function Dashboard() {
  const { user, supabase } = useContext(AuthContext);
  const [bands, setBands] =
    useState<Database["public"]["Tables"]["Bands"]["Row"][]>();

  const getBands = useCallback(async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("Bands")
      .select()
      .eq("user_id", user.id)
      .order("band", { ascending: true });

    if (error) throw new Error("Could not get bands for this user");

    setBands(data);
  }, [supabase, user]);

  useEffect(() => {
    if (user && !bands) {
      getBands();
    }
  }, [user, bands, getBands]);

  if (!bands) return <>Loading...</>;

  return <>{JSON.stringify(bands)}</>;
}

export default Dashboard;
