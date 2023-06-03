"use client";

import { AuthContext } from "@/auth/AuthContext";
import SearchBar from "@/components/SearchBar";
import { ToastContext } from "@/components/Toast/ToastContext";
import { Database } from "@/types/supabase";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useContext, useEffect, useState } from "react";

function Dashboard() {
  const { supabase, user } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);

  const [bands, setBands] =
    useState<Database["public"]["Tables"]["Bands"]["Row"][]>();
  const [query, setQuery] = useState("");

  useEffect(() => {
    async function getBands() {
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
    }
    if (user && !bands) {
      getBands();
    }
  }, [user, bands, toast, supabase]);

  if (!bands) return <>Loading...</>;

  const treatedQuery = query.trim().toLowerCase();
  const filteredBands = bands.filter(
    (band) =>
      band.band.toLowerCase().includes(treatedQuery) ||
      band.genre.some((genre) => genre.toLowerCase().includes(treatedQuery)) ||
      band.concerts.some((concert) =>
        concert.location.toLowerCase().includes(treatedQuery)
      ) ||
      band.concerts.some((concert) =>
        concert.date.toLowerCase().includes(treatedQuery)
      )
  );

  return (
    <div>
      <SearchBar
        query={query}
        setQuery={setQuery}
        bandsCount={filteredBands.length}
        handleChange={(e) => setQuery(e.target.value)}
      />
      {filteredBands.length === 0 && (
        <div className="mt-20 flex flex-col items-center justify-center gap-8 px-8 pt-8 sm:mt-48">
          <div className="flex flex-col items-center gap-2">
            <p className="text-zinc-400">There are no results for: </p>
            <p className="max-w-[calc(100vw-48px)] truncate text-xl font-medium text-white sm:max-w-[calc(100vw-480px)]">
              {query}
            </p>
          </div>
          <button
            onClick={() => {
              setQuery("");
            }}
            type="button"
            className="flex items-center gap-4 rounded bg-zinc-900 p-4 text-zinc-400 hover:bg-zinc-700/50 hover:text-white sm:hidden"
          >
            <p>Clear search</p>
            <XMarkIcon className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="mt-20">
        {filteredBands.map((band) => (
          <p key={band.id}>{band.band}</p>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
