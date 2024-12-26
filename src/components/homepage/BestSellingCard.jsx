import { useState } from 'react';
import ToggleButton from '../common/ToggleButton';
import ItemCard from './ItemCard';
import { useQuery } from '@tanstack/react-query';
import api from '../../utils/api/api';

export default function BestSellingCard({ notify }) {
  const [activeButton, setActiveButton] = useState('mingguan');
  const {
    data: bestSellingProducts = {},
    isLoading: isBestSellingLoading,
    isRefetching: isBestSellingRefetching,
  } = useQuery({
    queryKey: ['bestSellingProducts'],
    queryFn: api.oprGetBestSellingItem,
  });

  const handleClick = (label) => {
    setActiveButton(label);
    notify(`${label} clicked`);
  };

  const selectedItems =
    activeButton === 'mingguan'
      ? bestSellingProducts?.mingguan || []
      : bestSellingProducts?.bulanan || [];

  return (
    <section className="flex flex-col rounded-2xl bg-white w-auto p-4 lg:p-4 gap-2 flex-shrink-0">
      {/* w-full adalah koentji */}
      <div className="flex flex-row items-center justify-between w-full">
        <h2 className="text-base lg:text-lg font-medium">
          Barang Terlaris{' '}
          {activeButton === 'mingguan' ? (
            <span className="text-xs lg:text-sm">(mingguan)</span>
          ) : (
            <span className="text-sm">(bulanan)</span>
          )}
        </h2>
        {/* 2 button */}
        <div className="flex flex-row gap-2">
          <ToggleButton
            label="mingguan"
            isActive={activeButton === 'mingguan'}
            onClick={() => handleClick('mingguan')}
          />
          <ToggleButton
            label="bulanan"
            isActive={activeButton === 'bulanan'}
            onClick={() => handleClick('bulanan')}
          />
        </div>
      </div>
      {/* w-full dan max-w adalah koentji */}
      <div className="flex flex-row h-32 lg:h-auto overflow-x-auto w-full max-w-[88vw]">
        {(isBestSellingLoading || isBestSellingRefetching) && (<p>loading...</p>)}
        {!isBestSellingLoading && !isBestSellingRefetching && selectedItems.map((item) => (
          <ItemCard key={item.name} imageUrl={item.imageUrl} name={item.name} />
        ))}
      </div>
    </section>
  );
}
