import BestSellingCard from '../components/homepage/BestSellingCard';
import RecentTransaction from '../components/homepage/RecentTransaction';
import SalesCard from '../components/homepage/SalesCard';
import { FaArrowUp, FaArrowDown, FaMoneyBill } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useIsMobile from '../hooks/useIsMobile';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../utils/api/api';

export default function Homepage() {
  const isMobile = useIsMobile(768);
  const [selectedPeriod, setSelectedPeriod] = useState('daily');

  // Fetch sales data
  const {
    data: salesDataObject = {},
    isLoading: isSalesDataLoading,
    isError: isSalesDataError,
  } = useQuery({
    queryKey: ['salesData'],
    queryFn: api.getSalesReport,
  });

  const toastOptions = {
    autoClose: 2000,
    hideProgressBar: true,
    pauseOnHover: false,
    theme: 'colored',
  };

  const notify = (message) => {
    toast(message, toastOptions);
  };

  // Get selected period data
  const salesData = salesDataObject[selectedPeriod] || {};

  return (
    <div className="flex flex-col flex-grow h-full w-full gap-2 p-4">
      {/* Desktop View */}
      {!isMobile && (
        <section className="flex flex-row gap-2 lg:gap-4">
          {['daily', 'weekly', 'monthly'].map((period, index) => {
            const data = salesDataObject[period] || {};
            return (
              <div
                key={index}
                className="flex flex-col w-72 h-36 p-4 rounded-2xl bg-white gap-3 flex-shrink-0"
              >
                <div className="flex flex-row gap-2 items-center w-full justify-between">
                  <h2 className="text-lg">
                    Penjualan {['Harian', 'Mingguan', 'Bulanan'][index]}
                  </h2>
                  <div className="bg-green-300 p-1 rounded-full">
                    <FaMoneyBill size={24} className="text-green-600" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex gap-2">
                    <p className="font-medium text-xl">
                      Rp. {data.currentValue?.toLocaleString('id-ID') || 0}
                    </p>
                    <div
                      className={`flex flex-row items-center gap-1 px-2 rounded-xl ${
                        data.isNegative ? 'bg-red-300' : 'bg-green-300'
                      }`}
                    >
                      {data.isNegative ? (
                        <FaArrowDown className="text-red-700" size={14} />
                      ) : (
                        <FaArrowUp className="text-green-700" size={14} />
                      )}
                      <p
                        className={`font-medium ${
                          data.isNegative ? 'text-red-700' : 'text-green-700'
                        }`}
                      >
                        {Math.abs(data.percentage || 0).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                  <p className="text-sm">
                    perbandingan {['hari', 'minggu', 'bulan'][index]} kemarin
                  </p>
                </div>
              </div>
            );
          })}
        </section>
      )}

      {/* Mobile View */}
      {isMobile && (
        <div className="flex flex-col w-full h-36 p-4 rounded-2xl bg-white gap-3">
          <div className="flex flex-row gap-2 items-center w-full justify-between">
            <div className="flex flex-row">
              <select
                className="text-lg font-medium bg-transparent border-b border-gray-400 focus:outline-none"
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
              >
                <option value="daily">Penjualan Harian</option>
                <option value="weekly">Penjualan Mingguan</option>
                <option value="monthly">Penjualan Bulanan</option>
              </select>
            </div>
            <div className="bg-green-300 p-1 rounded-full">
              <FaMoneyBill size={24} className="text-green-600" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex gap-2">
              <p className="font-medium text-xl">
                Rp. {salesData.currentValue?.toLocaleString('id-ID') || 0}
              </p>
              <div
                className={`flex flex-row items-center gap-1 px-2 rounded-xl ${
                  salesData.isNegative ? 'bg-red-300' : 'bg-green-300'
                }`}
              >
                {salesData.isNegative ? (
                  <FaArrowDown className="text-red-700" size={14} />
                ) : (
                  <FaArrowUp className="text-green-700" size={14} />
                )}
                <p
                  className={`font-medium ${
                    salesData.isNegative ? 'text-red-700' : 'text-green-700'
                  }`}
                >
                  {Math.abs(salesData.percentage || 0).toFixed(1)}%
                </p>
              </div>
            </div>
            <p className="text-sm">perbandingan {selectedPeriod} kemarin</p>
          </div>
        </div>
      )}

      <BestSellingCard notify={notify} />
      <RecentTransaction />
    </div>
  );
}
