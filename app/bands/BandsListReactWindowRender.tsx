import { Bands } from '@/types/global';
import { CSSProperties } from 'react';
import DashboardBandCard from './BandCard';

type BandsListReactWindowRenderProps = {
  index: number;
  style: CSSProperties;
  data: Bands;
  setQuery: (query: string) => void;
};

function BandsListReactWindowRender({
  index,
  style,
  data,
  setQuery
}: BandsListReactWindowRenderProps) {
  return (
    <div style={style}>
      <DashboardBandCard band={data[index]} setQuery={setQuery} />
    </div>
  );
}

export default BandsListReactWindowRender;
