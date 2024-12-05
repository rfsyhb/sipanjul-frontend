import { useEffect, useState } from 'react';
import { gpmItems as initialGpmItemList } from '../utils/dummyData';
import { produce } from 'immer';
import useIsMobile from '../hooks/useIsMobile';

export default function CalculatorPage() {
  const isMobile = useIsMobile(768);
  const [items, setItems] = useState(initialGpmItemList);
  const [quantities, setQuantities] = useState(
    initialGpmItemList.reduce((acc, item) => {
      acc[item.id] = null;
      return acc;
    }, {})
  );
  const [cashGiven, setCashGiven] = useState('');

  const onChangePrice = (id, price) => {
    setItems((prevItems) =>
      produce(prevItems, (draftItems) => {
        const item = draftItems.find((item) => item.id === id);
        if (item) item.price = price;
      })
    );
  };

  const onChangeQuantity = (id, quantity) => {
    setQuantities((prevQuantities) =>
      produce(prevQuantities, (draftQuantities) => {
        draftQuantities[id] = quantity;
      })
    );
  };

  const calculateTotalPrice = () => {
    return items.reduce((total, item) => {
      return total + item.price * (quantities[item.id] || 0);
    }, 0);
  };

  const handleReset = () => {
    setQuantities(
      produce((draft) => {
        initialGpmItemList.forEach((item) => {
          draft[item.id] = null;
        });
      })
    );
    setCashGiven(null);
  };

  const handleSave = () => {
    // save items with prices to local storage
    localStorage.setItem('gpmItems', JSON.stringify(items));
    alert('Data berhasil disimpan');
  }

  const calculateChange = () => {
    return Math.max(cashGiven - calculateTotalPrice(), 0);
  };

  useEffect(() => {
    const savedItems = localStorage.getItem('gpmItems');
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
  }, [])
  
  return (
    <div
      className={`flex flex-col items-center px-2 py-4 md:px-20 lg:px-32 ${isMobile ? 'h-screen' : ''}`}
    >
      {/* Kalkulator dan Daftar Produk */}
      <div
        className={`flex flex-col items-center gap-1 md:gap-4 w-full max-w-4xl px-2 lg:px-0 ${isMobile ? 'h-[86vh]' : ''}`}
      >
        <h2 className="font-semibold text-md md:text-2xl">
          Daftar Harga dan Kalkulator GPM
        </h2>
        <div className="flex flex-col md:flex-row lg:flex-row gap-1 md:gap-6 w-full overflow-y-auto h-full lg:h-full">
          {/* Daftar Produk dengan qty input */}
          <div className="flex flex-col gap-1 md:gap-4 w-full lg:w-3/5 overflow-y-auto md:h-[80vh] flex-grow">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-row items-center gap-4 p-2 md:p-4 rounded-lg border border-gray-300 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-10 lg:w-12 object-cover rounded-lg overflow-hidden shadow-md border border-gray-200"
                />
                <div className="flex w-full flex-col md:flex-row lg:justify-between lg:items-center">
                  <p className="font-medium text-md lg:text-lg w-full lg:w-1/2 truncate">
                    {item.name}
                  </p>
                  <div className="flex flex-row gap-2 w-full lg:w-1/2 justify-between ">
                    <input
                      type="number"
                      value={item.price}
                      onChange={(e) =>
                        onChangePrice(item.id, Number(e.target.value))
                      }
                      className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <div className="flex flex-row gap-1 items-center w-auto ">
                      <span className="text-xs">qty:</span>
                      <input
                        type="number"
                        id="quantity"
                        value={quantities[item.id] || ''}
                        onChange={(e) =>
                          onChangeQuantity(item.id, Number(e.target.value))
                        }
                        className="w-14 border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        min={0}
                        placeholder="qty"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Total price, cash input, change, and reset button */}
          <div
            className={`flex flex-col ${isMobile ? 'border-t border-gray-300' : ''}  items-center justify-center lg:w-2/5 gap-1 md:gap-4 p-1 md:p-4`}
          >
            <div className="flex flex-row justify-between w-full">
              <p className="text-sm md:text-lg font-bold">Total Harga</p>
              <p className="text-md md:text-2xl font-bold">
                Rp. {calculateTotalPrice().toLocaleString()}
              </p>
            </div>
            <div className="flex flex-row justify-between w-full items-center">
              <label
                htmlFor="cashGiven"
                className="text-sm md:text-lg font-bold"
              >
                Uang Diterima:
              </label>
              <input
                type="number"
                id="cashGiven"
                value={cashGiven || ''}
                onChange={(e) => setCashGiven(Number(e.target.value))}
                className="w-1/2 border border-gray-300 p-1 lg:p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                min={0}
                placeholder="uang"
              />
            </div>
            <div className="flex flex-row justify-between w-full">
              <p className="text-sm md:text-lg font-bold">Kembalian</p>
              <p
                className={`md:text-xl font-bold ${cashGiven < calculateTotalPrice() ? 'text-red-500' : ''}`}
              >
                {cashGiven < calculateTotalPrice()
                  ? 'Uang kurang!!!'
                  : `Rp. ${calculateChange().toLocaleString()}`}
              </p>
            </div>
            <div className='flex flex-row w-full gap-2'>
              <button
                onClick={handleSave}
                className='bg-text text-bg font-medium px-6 w-full rounded-md hover:bg-green-300 transition-colors duration-300 border border-bg'
              >
                Save
              </button>
              <button
                onClick={handleReset}
                className="bg-red-500 text-white font-medium py-1 lg:py-3 px-6 rounded-md hover:bg-red-600 transition-colors duration-300 w-full"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
