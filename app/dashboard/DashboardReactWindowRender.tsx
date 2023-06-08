import { CSSProperties } from 'react';
import { Database } from '@/types/supabase';
import DashboardBandCard from './DashboardBandCard';

type DashboardReactWindowRenderProps = {
  index: number;
  style: CSSProperties;
  data: Database['public']['Tables']['Bands']['Row'][];
  setQuery: (query: string) => void;
  resetScrollPosition: () => void;
};

function DashboardReactWindowRender({
  index,
  style,
  data,
  setQuery,
  resetScrollPosition
}: DashboardReactWindowRenderProps) {
  return (
    <div style={style}>
      <DashboardBandCard
        band={data[index]}
        setQuery={setQuery}
        resetScrollPosition={resetScrollPosition}
      />
    </div>
  );
}

export default DashboardReactWindowRender;
