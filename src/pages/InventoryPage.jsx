import { itemList } from '../utils/dummyData';
import InventoryItemCard from '../components/inventorypage/InventoryItemCard';
import { useState } from 'react';

export default function InventoryPage() {
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row justify-between px-4">
        <button
          className="bg-actionBtn text-white p-2 rounded-md hover:bg-white hover:text-bg outline outline-actionBtn"
          onClick={() => alert(searchInput)}
        >
          Tambah Barang
        </button>
        <input type="text" value={searchInput} onChange={handleSearch} className='px-2' />
      </div>
      <div className="flex flex-row flex-wrap gap-8 justify-center">
        {itemList.map((item) => (
          <InventoryItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
