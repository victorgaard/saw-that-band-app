import { Band, Bands } from '@/types/global';
import { RefObject } from 'react';
import { FixedSizeList as DashboardReactWindowList } from 'react-window';
import DashboardAddOrEditBand from './DashboardAddOrEditBand';
import DashboardBands from './DashboardBands';

type DashboardProps = {
  query: string;
  filteredBandsList: undefined | Bands;
  dashboardBandCardRef: RefObject<DashboardReactWindowList<any>>;
  selectedBand: Band | undefined;
  setQuery: (query: string) => void;
  resetScrollPosition: () => void;
  selectBand: (selectedBand: Band) => void;
  addGenre: () => void;
};

function Dashboard({
  query,
  filteredBandsList,
  dashboardBandCardRef,
  selectedBand,
  setQuery,
  resetScrollPosition,
  selectBand,
  addGenre
}: DashboardProps) {
  if (!filteredBandsList) return <>Loading...</>;

  return (
    <div className="-mx-12 -my-8 grid grid-cols-2">
      <DashboardBands
        query={query}
        setQuery={setQuery}
        filteredBandsList={filteredBandsList}
        dashboardBandCardRef={dashboardBandCardRef}
        resetScrollPosition={resetScrollPosition}
        selectBand={selectBand}
      />
      <DashboardAddOrEditBand selectedBand={selectedBand} addGenre={addGenre} />
    </div>
  );
}

export default Dashboard;
