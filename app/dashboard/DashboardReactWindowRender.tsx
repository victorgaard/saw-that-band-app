import { Bands } from '@/types/global';
import { CSSProperties } from 'react';
import DashboardBandCard from './DashboardBandCard';

type DashboardReactWindowRenderProps = {
  index: number;
  style: CSSProperties;
  data: Bands;
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
