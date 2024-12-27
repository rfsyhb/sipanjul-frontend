import { useState } from 'react';
import { BsFillLockFill, BsUnlockFill } from 'react-icons/bs';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUpdateStoreStatus } from '../../hooks/useUpdateStoreStatus';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../../utils/api/api';

// Setting the app element for accessibility
Modal.setAppElement('#root');

export default function Header() {
  const userId = localStorage.getItem('userId');

  const { data: storeStatus, isLoading: isStoreStatusLoading } = useQuery({
    queryKey: ['storeStatus'],
    queryFn: () => api.getStoreStatus(userId),
  });

  const [isStoreLoading, setIsStoreLoading] = useState(false);
  const queryClient = useQueryClient();
  const { mutate: updateStatus } = useUpdateStoreStatus();

  const toggleStoreStatus = () => {
    console.log('Current status:', storeStatus);
    setIsStoreLoading(true);

    updateStatus(storeStatus, {
      onSuccess: async () => {
        await queryClient.invalidateQueries(['storeStatus']); // Wait for the query to refetch
        const updatedStatus = queryClient.getQueryData(['storeStatus']);

        if (updatedStatus) {
          toast.success('Toko telah dibuka!', toastOptions);
        } else {
          toast.error('Toko telah ditutup!', toastOptions);
        }

        setIsStoreLoading(false);
      },
      onError: (error) => {
        toast.error(`Terjadi kesalahan: ${error.message}`, toastOptions);
        setIsStoreLoading(false);
      },
    });

    setIsModalOpen(false);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toastOptions = {
    autoClose: 2000,
    hideProgressBar: true,
    pauseOnHover: false,
    theme: 'colored',
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
      <header className="w-full gap-2 md:gap-0 md:px-4 md:pt-2 flex items-center md:justify-between">
        <div className="flex flex-row items-center gap-1 md:gap-4">
          {/* on off toko */}
          <div className="flex flex-row p-1 bg-white rounded-full">
            <div
              className={`p-1 px-2 md:p-4 md:px-6 ${storeStatus ? 'bg-green-400' : ''} ${isStoreLoading || isStoreStatusLoading ? 'cursor-not-allowed bg-white' : ''} rounded-full cursor-pointer`}
              onClick={isStoreLoading || storeStatus ? undefined : openModal}
            >
              <BsUnlockFill size={24} />
            </div>
            <div
              className={`p-1 px-2 md:p-4 md:px-6 ${!storeStatus ? 'bg-red-400' : ''} ${isStoreLoading || isStoreStatusLoading ? 'cursor-not-allowed bg-white' : ''} rounded-full cursor-pointer`}
              onClick={isStoreLoading || !storeStatus ? undefined : openModal}
            >
              <BsFillLockFill size={24} />
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm md:text-2xl font-medium">Hello Operator!</h1>
            <span className="text-xs md:text-base">
              Hari ini, {formattedDate}
            </span>
          </div>
        </div>
        <img
          src="/assets/logobulog.png"
          alt="logobulog"
          className="w-16 md:w-32"
        />
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
          {!storeStatus ? (
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
            onClick={toggleStoreStatus}
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
    </>
  );
}
