import { CSSProperties } from "react";
import BandsListItem from "./BandsListItem";
import { Database } from "@/types/supabase";

type BandsListRenderItemProps = {
  index: number;
  style: CSSProperties;
  data: Database["public"]["Tables"]["Bands"]["Row"][];
  setQuery: (query: string) => void;
  resetScroll: () => void;
};

function BandsListRenderItem({
  index,
  style,
  data,
  setQuery,
  resetScroll,
}: BandsListRenderItemProps) {
  const band = data[index];
  return (
    <div style={style}>
      <BandsListItem
        band={band}
        setQuery={setQuery}
        resetScroll={resetScroll}
      />
    </div>
  );
}

export default BandsListRenderItem;
