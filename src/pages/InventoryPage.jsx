import { useState } from 'react';
import { produce } from 'immer';
import Modal from 'react-modal';
import InventoryItemCard from '../components/inventorypage/InventoryItemCard';
import { itemList as initialItemList } from '../utils/dummyData';
import useIsMobile from '../hooks/useIsMobile';

// Atur root element untuk modal agar rendering benar
Modal.setAppElement('#root');

export default function InventoryPage() {
  const [searchInput, setSearchInput] = useState('');
  const [items, setItems] = useState(initialItemList);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    stock: '',
    price: '',
    packageSize: '',
    type: '',
    imageUrl: '',
  });
  const isMobile = useIsMobile(768);

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewItem({
      name: '',
      stock: '',
      price: '',
      packageSize: '',
      type: '',
      imageUrl: '',
    });
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    // Tambah item baru ke dalam daftar
    setItems(
      produce((draft) => {
        draft.push({
          ...newItem,
          id: `item-${items.length + 1}`,
          imageUrl: newItem.imageUrl || 'https://via.placeholder.com/150',
        });
      })
    );
    closeModal();
  };

  const handleChange = (field, value) => {
    setNewItem(
      produce((draft) => {
        draft[field] = value;
      })
    );
  };

  const handleDeleteItem = (id) => {
    setItems(
      produce((draft) => {
        const index = draft.findIndex((item) => item.id === id);
        if (index !== -1) {
          draft.splice(index, 1);
        }
      })
    );
  };

  return (
    <div className="flex flex-col gap-1 lg:gap-3 p-4">
      <div className="flex flex-row justify-between lg:px-4 w-full">
        <button
          className="bg-actionBtn text-white px-3 py-1 rounded-md hover:bg-activeBtn hover:text-bg border border-actionBtn"
          onClick={openModal} // Membuka modal untuk menambah item baru
        >
          <span className="font-medium lg:text-base text-sm">
            Tambah {!isMobile && 'Barang'}
          </span>
        </button>
        <input
          type="text"
          value={searchInput}
          onChange={handleSearch}
          className="px-2 border border-inactiveBtn rounded-md max-w-[200px]"
          placeholder="Cari barang..."
        />
      </div>
      <div className="flex flex-wrap gap-6 lg:gap-8 justify-center h-[84vh] lg:h-auto overflow-y-auto ">
        {items
          .filter((item) =>
            item.name.toLowerCase().includes(searchInput.toLowerCase())
          )
          .map((item) => (
            // console.log(item),
            <InventoryItemCard
              key={item.id}
              item={item}
              onDelete={() => handleDeleteItem(item.id)}
            />
          ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Tambah Barang Modal"
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-lg w-[85vw] lg:w-auto"
        overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-lg font-bold mb-4">Tambah Barang Baru</h2>
        <form onSubmit={handleAddItem}>
          <div className="flex flex-col gap-2">
            <label>
              Nama Barang:
              <input
                type="text"
                value={newItem.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="border p-2 w-full"
                required
                placeholder='e.g. "Beras Manis Kita"'
              />
            </label>
            <div className="flex flex-row gap-2">
              <label className='flex-1'>
                Stok:
                <input
                  type="number"
                  value={newItem.stock}
                  onChange={(e) =>
                    handleChange('stock', Number(e.target.value))
                  }
                  className="border p-2 w-full"
                  min={0}
                  placeholder='e.g. "10"'
                  required
                />
              </label>
              <label className='w-2/3'>
                Harga:
                <input
                  type="number"
                  value={newItem.price}
                  onChange={(e) =>
                    handleChange('price', Number(e.target.value))
                  }
                  className="border p-2 w-full"
                  min={1000}
                  placeholder='e.g. "10000"'
                />
              </label>
            </div>  
            <label>
              Ukuran Paket:
              <input
                type="text"
                value={newItem.packageSize}
                onChange={(e) => handleChange('packageSize', e.target.value)}
                className="border p-2 w-full"
                required
                placeholder='e.g. "1kg", "500gr", "1lt"'
              />
            </label>
            <label>
              Tipe Barang:
              <select
                value={newItem.type}
                onChange={(e) => handleChange('type', e.target.value)}
                className="border p-2 w-full"
                required
              >
                <option value="">Pilih tipe barang</option>
                <option value="beras">Beras</option>
                <option value="lainnya">Lainnya</option>
              </select>
            </label>
            <label>
              URL Gambar:
              <input
                type="url"
                value={newItem.imageUrl}
                onChange={(e) => handleChange('imageUrl', e.target.value)}
                className="border p-2 w-full"
                required
                placeholder='e.g. "https://via.placeholder.com/150"'
              />
            </label>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              type="button"
              onClick={closeModal}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
