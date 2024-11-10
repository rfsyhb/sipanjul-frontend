import { useState } from 'react';
import ToggleButton from '../common/ToggleButton';
import ItemCard from './ItemCard';
import { bestSellingList } from '../../utils/dummyData';

export default function BestSellingCard() {
  const [activeButton, setActiveButton] = useState('Mingguan');

  const handleClick = (label) => {
    setActiveButton(label);
    alert(`${label} clicked`);
  };
  
  const selectedItems = activeButton === 'Mingguan' ? bestSellingList.weekly : bestSellingList.monthly;

  return (
    <section className="flex flex-col rounded-2xl bg-white w-auto p-4 gap-2">
      {/* w-full adalah koentji */}
      <div className="flex flex-row items-center justify-between w-full">
        <h2 className="text-lg font-medium">Barang Terlaris</h2>
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
        {selectedItems.map((item) => (
          <ItemCard key={item.name} imageUrl={item.imageUrl} name={item.name} />
        ))}
      </div>
    </section>
  );
}
