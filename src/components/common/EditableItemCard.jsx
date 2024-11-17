import PropTypes from 'prop-types';
import { useState } from 'react';
import Modal from 'react-modal';

// Atur root element untuk modal agar rendering benar
Modal.setAppElement('#root');

export default function EditableItemCard({
  imageUrl,
  name,
  stock,
  price,
  packageSize,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedStock, setEditedStock] = useState(stock);
  const [editedPrice, setEditedPrice] = useState(price);
  const [editedPackageSize, setEditedPackageSize] = useState(packageSize);

  // Fungsi untuk membuka dan menutup modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const editedData = { editedName, editedStock, editedPrice, editedPackageSize };
    alert(JSON.stringify(editedData, null));
    closeModal();
  };

  return (
    <div
      className={`relative border ${
        stock < 20 ? 'border-red-400 border-2' : 'border-gray-300'
      } rounded-lg flex flex-col w-40 group`}
    >
      {stock < 20 && (
        <div className="absolute inset-0 bg-red-400 opacity-10 rounded-lg"></div>
      )}
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-40 object-cover rounded-lg overflow-hidden"
      />
      <div
        className={`absolute top-1 right-1 text-xs px-2 py-1 rounded ${
          stock < 20 ? 'bg-red-400 font-medium' : 'bg-gray-200'
        }`}
      >
        stok: {stock}
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
          onClick={openModal}
          className="border border-actionBtn bg-actionBtn text-white px-4 py-1 rounded-lg hover:bg-activeBtn hover:text-inactiveBtn"
        >
          <span className="font-medium text-sm">Edit Barang</span>
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Item Modal"
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-lg"
        overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-lg font-bold mb-4">Edit Barang</h2>
        <form onSubmit={handleSave}>
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
              <input
                type="number"
                value={editedStock}
                onChange={(e) => setEditedStock(Number(e.target.value))}
                className="border p-2 w-full"
              />
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
              Ukuran Paket:
              <input
                type="text"
                value={editedPackageSize}
                onChange={(e) => setEditedPackageSize(e.target.value)}
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

EditableItemCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  stock: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  packageSize: PropTypes.string.isRequired,
};
