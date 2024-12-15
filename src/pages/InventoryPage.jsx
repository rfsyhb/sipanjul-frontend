import { useState } from 'react';
import { produce } from 'immer';
import Modal from 'react-modal';
import InventoryItemCard from '../components/inventorypage/InventoryItemCard';
import useIsMobile from '../hooks/useIsMobile';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import api from '../utils/api/api';
import { itemList } from '../utils/dummyData';

// Atur root element untuk modal agar rendering benar
Modal.setAppElement('#root');

export default function InventoryPage() {
  const queryClient = useQueryClient();
  const [searchInput, setSearchInput] = useState(''); // Untuk pencarian
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [newItem, setNewItem] = useState({
    name: '',
    stock: '',
    price: '',
    packageSize: '',
    type: '',
    imageUrl: '',
  });
  const isMobile = useIsMobile(768);

  // Fetch data dari API menggunakan Tanstack Query
  const {
    data: itemsFromApi = [], // Default ke array kosong jika data belum ada
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['adminInventory'], // Key unik untuk query ini
    queryFn: api.getItems, // Fungsi untuk fetch data
  });

  // Gunakan dummy data jika items API kurang dari 2
  const items = itemsFromApi.length >= 2 ? itemsFromApi : itemList;

  const refetchItems = () => {
    console.log('Refetching items...');
    queryClient.invalidateQueries(['adminInventory']);
  };

  const mutation = useMutation({
    mutationFn: api.addProduct, // Fungsi untuk menambahkan item
    onSuccess: () => {
      // Invalidasi query agar data terbaru di-refetch
      refetchItems();
      console.log('Product added successfully!');
    },
    onError: (error) => {
      console.error('Error adding product:', error.message);
    },
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
      stock: '',
      price: '',
      packageSize: '',
      type: '',
      imageUrl: '',
    });
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    mutation.mutate(newItem);
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
    // TODO: Tambahkan logika untuk menyinkronkan penghapusan dengan API (jika diperlukan)
    console.log('Item Deleted:', id);
  };

  // Saat data sedang dimuat
  if (isLoading) {
    return <div>Loading inventory data...</div>;
  }

  // Saat terjadi error
  if (isError) {
    return <div>Error fetching inventory: {error.message}</div>;
  }

  // Filter data berdasarkan input pencarian
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-1 lg:gap-3 p-4">
      <div className="flex flex-row justify-between lg:px-4 w-full">
        <button
          className="bg-actionBtn text-white px-3 py-1 rounded-md hover:bg-activeBtn hover:text-bg border border-actionBtn"
          onClick={openModal}
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
      <div className="flex flex-wrap gap-6 lg:gap-8 justify-center h-[84vh] lg:h-auto overflow-y-auto">
        {filteredItems.map((item) => (
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
              />
            </label>
            <div className="flex flex-row gap-2">
              <label className="flex-1">
                Stok:
                <input
                  type="number"
                  value={newItem.stock}
                  onChange={(e) =>
                    handleChange('stock', Number(e.target.value))
                  }
                  className="border p-2 w-full"
                  min={0}
                  required
                />
              </label>
              <label className="w-2/3">
                Harga:
                <input
                  type="number"
                  value={newItem.price}
                  onChange={(e) =>
                    handleChange('price', Number(e.target.value))
                  }
                  className="border p-2 w-full"
                  min={1000}
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
