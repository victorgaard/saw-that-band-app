import { Bands } from '@/types/global';
import { CSSProperties } from 'react';
import DashboardBandCard from './DashboardBandCard';

type DashboardReactWindowRenderProps = {
  index: number;
  style: CSSProperties;
  data: Bands;
  setQuery: (query: string) => void;
};

function DashboardReactWindowRender({
  index,
  style,
  data,
  setQuery
}: DashboardReactWindowRenderProps) {
  return (
    <div style={style}>
      <DashboardBandCard band={data[index]} setQuery={setQuery} />
    </div>
  );
}

export default DashboardReactWindowRender;
