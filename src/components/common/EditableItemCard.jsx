import PropTypes from 'prop-types';
import { useState } from 'react';
import Modal from 'react-modal';
import { useEditProductStock } from '../../hooks/useEditProductStock';
import { useEditProductData } from '../../hooks/useEditProductData';
import { useDeleteProduct } from '../../hooks/useDeleteProduct';

// Atur root element untuk modal agar rendering benar
Modal.setAppElement('#root');

export default function EditableItemCard({
  id,
  imageUrl,
  name,
  stock,
  price,
  type,
  packageSize,
  division,
}) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);
  const [editedImageUrl, setEditedImageUrl] = useState(imageUrl);
  const [editedName, setEditedName] = useState(name);
  const [editedStock, setEditedStock] = useState(stock);
  const [editedPrice, setEditedPrice] = useState(price);
  const [editedType, setEditedType] = useState(type);
  const [editedPackageSize, setEditedPackageSize] = useState(packageSize);
  const [editedDivision, setEditedDivision] = useState(division);
  const [addStock, setAddStock] = useState(0);
  const [reduceStock, setReduceStock] = useState(0);
  const [descEdit, setDescEdit] = useState('');
  const { mutate: editProductData } = useEditProductData();
  const { mutate: editProductStock } = useEditProductStock();
  const { mutate: onDelete } = useDeleteProduct();
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fungsi untuk membuka dan menutup modal edit item
  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  // Fungsi untuk membuka dan menutup modal update stok
  const openStockModal = (e) => {
    e.stopPropagation(); // Mencegah submit form saat membuka modal stok
    setIsStockModalOpen(true);
  };

  const closeStockModal = () => {
    setIsStockModalOpen(false);
  };

  const handleEditData = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const editedData = {
      id,
      name: editedName,
      type: editedType,
      packagesize: editedPackageSize,
      price: editedPrice,
      image_url: editedImageUrl,
      division: editedDivision,
    };
    editProductData(editedData, {
      onSuccess: () => {
        closeEditModal();
        setIsLoading(false);
      },
    });
  };

  const handleEditStock = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const editedStockData = {
      id,
      stock: reduceStock > 0 ? reduceStock : addStock,
      description: descEdit,
      isNegative: reduceStock > 0,
    };
    editProductStock(editedStockData, {
      onSuccess: () => {
        setIsLoading(false);
        setAddStock(0);
        setReduceStock(0);
        closeStockModal();
        closeEditModal();
      },
    });
  };

  const handleDeleteProduct = (id) => {
    setIsDeleteLoading(true);
    onDelete(id, {
      onSuccess: () => {
        closeEditModal();
        setIsDeleteLoading(false);
      },
    });
  };

  return (
    <div
      className={`relative border ${
        editedStock < 20 ? 'border-red-400 border-2' : 'border-gray-300'
      } rounded-lg flex flex-col w-40 group`}
    >
      {editedStock < 20 && (
        <div className="absolute inset-0 bg-red-400 opacity-10 rounded-lg"></div>
      )}
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-40 object-cover rounded-lg overflow-hidden"
      />
      <div
        className={`absolute top-1 right-1 text-xs px-2 py-1 rounded ${
          editedStock < 20 ? 'bg-red-400 font-medium' : 'bg-gray-200'
        }`}
      >
        stok: {editedStock}
      </div>
      <div className="absolute bottom-1 left-1 bg-gray-200 text-xs px-2 py-1 rounded">
        Rp. {price.toLocaleString()}
      </div>
      <div className="absolute bottom-1 right-1 bg-gray-200 text-xs px-2 py-1 rounded">
        {packageSize}
      </div>

      {/* Button Edit Barang */}
      <div className="absolute inset-0 flex items-center justify-center bg-gray-300 bg-opacity-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={openEditModal}
          className="border border-actionBtn bg-actionBtn text-white px-4 py-1 rounded-lg hover:bg-activeBtn hover:text-inactiveBtn"
        >
          <span className="font-medium text-sm">Edit Barang</span>
        </button>
      </div>

      {/* Modal untuk Edit Item */}
      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={closeEditModal}
        contentLabel="Edit Item Modal"
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-lg"
        overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-lg font-bold mb-4">Edit Barang</h2>
        <form onSubmit={handleEditData} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label>
              Nama Barang:
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="border p-2 w-full"
              />
            </label>
            <label>
              Stok:
              <div className="flex flex-row ">
                <input
                  type="number"
                  value={editedStock}
                  className="border p-2 w-1/4 text-gray-500"
                  readOnly
                />
                <div className="p-1 w-3/4">
                  <button
                    className="w-full h-full rounded-md hover:bg-activeBtn border border-actionBtn bg-actionBtn text-white"
                    onClick={openStockModal}
                    type="button" // Menambahkan type agar tidak memicu form submission
                  >
                    Update Stock
                  </button>
                </div>
              </div>
            </label>
            <label>
              Harga:
              <input
                type="number"
                value={editedPrice}
                onChange={(e) => setEditedPrice(Number(e.target.value))}
                className="border p-2 w-full"
              />
            </label>
            <label>
              Tipe Barang:
              <select
                className="border p-2 w-full"
                value={editedType}
                onChange={(e) => setEditedType(e.target.value)}
              >
                <option value="Beras">Beras</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </label>
            <label>
              Divisi:
              <select
                value={editedDivision}
                onChange={(e) => setEditedDivision(e.target.value)}
                className="border p-2 w-full"
                required
              >
                <option value="">Pilih divisi barang</option>
                <option value="SCPP">Supply Chain dan Pelayanan Publik</option>
                <option value="Komersil">Komersil</option>
              </select>
            </label>
            <label>
              Ukuran Paket:
              <input
                type="text"
                value={editedPackageSize}
                onChange={(e) => setEditedPackageSize(e.target.value)}
                className="border p-2 w-full"
              />
            </label>
            <label>
              URL Gambar:
              <input
                type="url"
                value={editedImageUrl}
                onChange={(e) => setEditedImageUrl(e.target.value)}
                className="border p-2 w-full"
              />
            </label>
          </div>
          <div className="flex flex-row justify-between gap-4 lg:gap0">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={closeEditModal}
                className={`bg-gray-500 text-white px-4 py-2 rounded ${isLoading ? 'cursor-not-allowed' : 'hover:bg-gray-600'}`}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`bg-blue-500 text-white px-4 py-2 rounded ${isLoading ? 'cursor-not-allowed opacity-50' : 'hover:bg-blue-600'}`}
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : 'Update'}
              </button>
            </div>
            <button
              type="button"
              className={`bg-red-500 text-white px-4 py-2 rounded ${isDeleteLoading ? 'cursor-not-allowed opacity-50' : 'hover:bg-red-600'}`}
              onClick={() => handleDeleteProduct(id)}
              disabled={isDeleteLoading || isLoading}
            >
              {isDeleteLoading ? 'Loading...' : 'Delete'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal untuk Update Stok */}
      <Modal
        isOpen={isStockModalOpen}
        onRequestClose={closeStockModal}
        contentLabel="Update Stock Modal"
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-lg"
        overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-lg font-bold mb-4">Update Stok</h2>
        <form onSubmit={handleEditStock} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label>
              Tambah Stok:
              <input
                type="number"
                value={addStock}
                onChange={(e) => setAddStock(Number(e.target.value))}
                className="border p-2 w-full"
                min="0"
              />
            </label>
            <label>
              Kurangi Stok:
              <input
                type="number"
                value={reduceStock}
                onChange={(e) => setReduceStock(Number(e.target.value))}
                className="border p-2 w-full"
                min="0"
              />
            </label>
            <label>
              Deskripsi:
              <input
                type="text"
                value={descEdit}
                onChange={(e) => setDescEdit(e.target.value)}
                className="border p-2 w-full"
                placeholder="diambil untuk paket"
              />
            </label>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              type="button"
              onClick={closeStockModal}
              className={`bg-gray-500 text-white px-4 py-2 rounded ${isLoading ? 'cursor-not-allowed' : 'hover:bg-gray-600'}`}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`bg-blue-500 text-white px-4 py-2 rounded ${isLoading ? 'cursor-not-allowed opacity-50' : 'hover:bg-blue-600'}`}
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Update'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

EditableItemCard.propTypes = {
  id: PropTypes.number.isRequired,
  imageUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  stock: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  packageSize: PropTypes.string.isRequired,
  division: PropTypes.string.isRequired,
};
