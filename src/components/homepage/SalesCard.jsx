import { FaArrowUp, FaArrowDown, FaMoneyBill } from 'react-icons/fa';
import PropTypes from 'prop-types';

export default function SalesCard({ label = 'test', value = 0, oldValue }) {
  const percentage = ((value - oldValue) / oldValue) * 100;
  const isNegative = percentage < 0;

  return (
    <div className="flex flex-col w-72 h-36 p-4 rounded-2xl bg-white gap-3">
      <div className="flex flex-row gap-2 items-center w-full justify-between">
        <h2 className="text-lg">Penjualan {label}an</h2>
        <div className="bg-green-300 p-1 rounded-full">
          <FaMoneyBill size={24} className="text-green-600" />
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex gap-2">
          <p className="font-medium text-xl">Rp. {value.toLocaleString('id-ID')}</p>
          <div
            className={`flex flex-row items-center gap-1 px-2 rounded-xl ${
              isNegative ? 'bg-red-300' : 'bg-green-300'
            }`}
          >
            {isNegative ? (
              <FaArrowDown className="text-red-700" size={14} />
            ) : (
              <FaArrowUp className="text-green-700" size={14} />
            )}
            <p
              className={`font-medium ${isNegative ? 'text-red-700' : 'text-green-700'}`}
            >
              {Math.abs(percentage).toFixed(1)}%
            </p>
          </div>
        </div>
        <p className="text-sm">perbandingan {label.toLowerCase()} kemarin</p>
      </div>
    </div>
  );
}

SalesCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  oldValue: PropTypes.number.isRequired,
};
