import { useState } from 'react';
import ToggleButton from '../common/ToggleButton';
import ItemCard from './ItemCard';
import { bestSellingList } from '../../utils/dummyData';
import { useQuery } from '@tanstack/react-query';
import api from '../../utils/api/api';

export default function BestSellingCard({ notify }) {
  const [activeButton, setActiveButton] = useState('Mingguan');
  const {
    data: bestSellingProducts = {},
    isLoading: isBestSellingLoading,
    isError: isBestSellingError,
  } = useQuery({
    queryKey: ['bestSellingProducts'],
    queryFn: api.oprGetBestSellingItem,
  });

  const handleClick = (label) => {
    setActiveButton(label);
    notify(`${label} clicked`);
  };

  // const selectedItems =
  //   activeButton === 'Mingguan'
  //     ? bestSellingProducts?.weekly || []
  //     : bestSellingProducts?.monthly || [];

  const selectedItems = bestSellingProducts

  return (
    <section className="flex flex-col rounded-2xl bg-white w-auto p-2 lg:p-4 gap-2 flex-shrink-0">
      {/* w-full adalah koentji */}
      <div className="flex flex-row items-center justify-between w-full">
        <h2 className="text-base lg:text-lg font-medium">
          Barang Terlaris{' '}
          {activeButton === 'Mingguan' ? (
            <span className="text-xs lg:text-sm">(weekly)</span>
          ) : (
            <span className="text-sm">(monthly)</span>
          )}
        </h2>
        {/* 2 button */}
        <div className="flex flex-row gap-2">
          <ToggleButton
            label="Mingguan"
            isActive={activeButton === 'Mingguan'}
            onClick={() => handleClick('Mingguan')}
          />
          <ToggleButton
            label="Bulanan"
            isActive={activeButton === 'Bulanan'}
            onClick={() => handleClick('Bulanan')}
          />
        </div>
      </div>
      {/* w-full dan max-w adalah koentji */}
      <div className="flex flex-row overflow-x-auto w-full max-w-[88vw]">
        {isBestSellingLoading && (<p>loading...</p>)}
        {!isBestSellingLoading && selectedItems.map((item) => (
          <ItemCard key={item.name} imageUrl={item.imageUrl} name={item.name} />
        ))}
      </div>
    </section>
  );
}
