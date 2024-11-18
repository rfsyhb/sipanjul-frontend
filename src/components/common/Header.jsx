import { useState } from 'react';
import { BsFillLockFill, BsUnlockFill } from 'react-icons/bs';
import Modal from 'react-modal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Setting the app element for accessibility
Modal.setAppElement('#root');

export default function Header() {
  const [isLocked, setIsLocked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleLock = () => {
    setIsLocked((prevState) => !prevState);
    setIsModalOpen(false);
    if (isLocked) {
      toast.success('Toko telah dibuka!');
    } else {
      toast.error('Toko telah ditutup!');
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const date = new Date();
  const options = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
  const formattedDate = date.toLocaleDateString('id-ID', options);

  return (
    <>
      <header className="w-full px-4 pt-2 flex items-center justify-between">
        <div className="flex flex-row items-center gap-4">
          {/* on off toko */}
          <div className="flex flex-row p-1 bg-white rounded-full">
            <div
              className={`p-4 px-6 ${!isLocked ? 'bg-green-400' : ''} rounded-full cursor-pointer`}
              onClick={!isLocked ? undefined : openModal}
            >
              <BsUnlockFill size={24} />
            </div>
            <div
              className={`p-4 px-6 ${isLocked ? 'bg-red-400' : ''} rounded-full cursor-pointer`}
              onClick={isLocked ? undefined : openModal}
            >
              <BsFillLockFill size={24} />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-medium">Hello Operator!</h1>
            <span>Hari ini, {formattedDate}</span>
          </div>
        </div>
        <img src="/assets/logobulog.png" alt="logobulog" className="w-32" />
      </header>
      {/* Confirmation Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Confirmation Modal"
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-lg"
        overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-lg font-semibold mb-4">
          Apakah anda ingin{' '}
          {isLocked ? (
            <span className="font-bold text-green-800 bg-green-200 px-1 rounded-sm">
              membuka
            </span>
          ) : (
            <span className="font-bold text-red-800 bg-red-200 px-1 rounded-sm">
              menutup
            </span>
          )}{' '}
          toko?
        </h2>
        <div className="flex gap-4 mt-4">
          <button
            onClick={toggleLock}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Yes
          </button>
          <button
            onClick={closeModal}
            className="bg-gray-500 text-white p-2 rounded"
          >
            No
          </button>
        </div>
      </Modal>

      {/* Toast Container */}
      <ToastContainer />
    </>
  );
}
