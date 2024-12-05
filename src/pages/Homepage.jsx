import BestSellingCard from '../components/homepage/BestSellingCard';
import RecentTransaction from '../components/homepage/RecentTransaction';
import SalesCard from '../components/homepage/SalesCard';
import { FaArrowUp, FaArrowDown, FaMoneyBill } from 'react-icons/fa';

import { dailySales, monthlySales, weeklySales } from '../utils/dummyData';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useIsMobile from '../hooks/useIsMobile';
import { useState } from 'react';

export default function Homepage() {
  const isMobile = useIsMobile(768);
  const [selectedPeriod, setSelectedPeriod] = useState('daily'); // Default to daily sales

  const toastOptions = {
    autoClose: 2000,
    hideProgressBar: true,
    pauseOnHover: false,
    theme: 'colored',
  };

  const notify = (message) => {
    toast(message, toastOptions);
  };

  // Map period to data
  const salesDataMap = {
    daily: dailySales,
    weekly: weeklySales,
    monthly: monthlySales,
  };

  const salesData = salesDataMap[selectedPeriod];

  return (
    <div className="flex flex-col h-[88vh] p-4 max-h-screen gap-2 pr-4">
      {!isMobile && (
        <section
          className={`flex flex-row lg:flex-row gap-2 lg:gap-4 ${isMobile && 'overflow-x-scroll h-auto'}`}
        >
          {[dailySales, weeklySales, monthlySales].map((sales, index) => (
            <div
              key={index}
              className="flex flex-col w-72 h-36 p-4 rounded-2xl bg-white gap-3"
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
                    Rp. {sales.currentValue.toLocaleString('id-ID')}
                  </p>
                  <div
                    className={`flex flex-row items-center gap-1 px-2 rounded-xl ${
                      sales.isNegative ? 'bg-red-300' : 'bg-green-300'
                    }`}
                  >
                    {sales.isNegative ? (
                      <FaArrowDown className="text-red-700" size={14} />
                    ) : (
                      <FaArrowUp className="text-green-700" size={14} />
                    )}
                    <p
                      className={`font-medium ${sales.isNegative ? 'text-red-700' : 'text-green-700'}`}
                    >
                      {Math.abs(sales.percentage).toFixed(1)}%
                    </p>
                  </div>
                </div>
                <p className="text-sm">
                  perbandingan {['hari', 'minggu', 'bulan'][index]} kemarin
                </p>
              </div>
            </div>
          ))}
        </section>
      )}

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
                Rp. {salesData.currentValue.toLocaleString('id-ID')}
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
                  className={`font-medium ${salesData.isNegative ? 'text-red-700' : 'text-green-700'}`}
                >
                  {Math.abs(salesData.percentage).toFixed(1)}%
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
