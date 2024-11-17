import { useState } from 'react';
import { produce } from 'immer';
import Modal from 'react-modal';
import InventoryItemCard from '../components/inventorypage/InventoryItemCard';
import { itemList as initialItemList } from '../utils/dummyData';

// Atur root element untuk modal agar rendering benar
Modal.setAppElement('#root');

export default function InventoryPage() {
  const [searchInput, setSearchInput] = useState('');
  const [items, setItems] = useState(initialItemList);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    stock: 0,
    price: 0,
    packageSize: '',
    imageUrl: '',
  });

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
      stock: 0,
      price: 0,
      packageSize: '',
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

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row justify-between px-4">
        <button
          className="bg-actionBtn text-white p-2 rounded-md hover:bg-white hover:text-bg outline outline-actionBtn"
          onClick={openModal} // Membuka modal untuk menambah item baru
        >
          Tambah Barang
        </button>
        <input
          type="text"
          value={searchInput}
          onChange={handleSearch}
          className="px-2"
        />
      </div>
      <div className="flex flex-row flex-wrap gap-8 justify-center">
        {items
          .filter((item) =>
            item.name.toLowerCase().includes(searchInput.toLowerCase())
          )
          .map((item) => (
            <InventoryItemCard key={item.id} item={item} />
          ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Tambah Barang Modal"
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-lg"
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
              />
            </label>
            <label>
              Stok:
              <input
                type="number"
                value={newItem.stock}
                onChange={(e) => handleChange('stock', Number(e.target.value))}
                className="border p-2 w-full"
              />
            </label>
            <label>
              Harga:
              <input
                type="number"
                value={newItem.price}
                onChange={(e) => handleChange('price', Number(e.target.value))}
                className="border p-2 w-full"
              />
            </label>
            <label>
              Ukuran Paket:
              <input
                type="text"
                value={newItem.packageSize}
                onChange={(e) => handleChange('packageSize', e.target.value)}
                className="border p-2 w-full"
              />
            </label>
            <label>
              URL Gambar:
              <input
                type="text"
                value={newItem.imageUrl}
                onChange={(e) => handleChange('imageUrl', e.target.value)}
                className="border p-2 w-full"
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
