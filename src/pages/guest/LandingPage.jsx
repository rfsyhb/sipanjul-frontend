import GuestItemCard from '../../components/landingpage/GuestItemCard';
import { guestItemList } from '../../utils/dummyData';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../../utils/api/api';

export default function LandingPage() {
  const {
    data: itemsFromApi = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['guestInventory'],
    queryFn: api.getGuestItems,
  });

  const items = itemsFromApi.length >= 3 ? itemsFromApi : guestItemList;

  const riceList = items.filter((item) => item.type === 'beras');
  const otherList = items.filter((item) => item.type === 'lainnya');
  const storeStatus = true;
  const navigate = useNavigate();

  const onClick = () => {
    navigate('/login');
  };

  return (
    <div className="h-screen flex flex-col gap-3 lg:gap-4 w-full">
      {/* header section */}
      <header className="flex justify-center border-2 border-gray-300 w-full">
        <div className="flex flex-row items-center justify-between max-w-[85vw] w-full py-2">
          <h2 className="text-lg lg:text-2xl">
            <span className="font-bold">Bulog</span> <span>Kalteng</span>
          </h2>
          <div className="flex flex-col lg:flex-row lg:gap-2 items-center">
            <p className="text-xs lg:text-md">status toko:</p>
            {storeStatus ? (
              <span className="text-sm rounded-lg px-2 lg:px-4 lg:py-2 lg:rounded-full font-bold bg-green-600 text-white">
                TOKO SEDANG BUKA
              </span>
            ) : (
              <span className="lg:px-4 lg:py-2 rounded-full font-bold bg-red-600 text-white">
                TOKO TUTUP
              </span>
            )}
          </div>
        </div>
      </header>

      {/* hero section */}
      <div className="w-full flex justify-center h-[30vh] lg:h-auto lg:flex-grow">
        <div className="flex flex-row justify-center max-w-[85vw] w-full gap-2 lg:gap-0">
          <div className="flex flex-col justify-between flex-1">
            <h1 className="text-base lg:text-3xl font-bold lg:mt-8">
              Tim Pengendali Inflasi Daerah <br />
              <span className="font-normal">(TPID) Palangka Raya</span>
            </h1>
            <p className="text-[0.6rem] lg:text-base">
              *Jadwal buka: Senin - Kamis 7-12 dan 13-18, Jumat 7-11 dan 13-16,
              dan Sabtu 7-12
            </p>
          </div>
          <div className="flex-1 flex h-full">
            <img
              src="https://i.imgur.com/FmSVn5Z.jpeg"
              alt="foto_bulog"
              className="w-full h-full lg:max-w-[600px] lg:max-h-[350px] rounded-lg object-cover"
            />
          </div>
        </div>
      </div>

      {/* itemlist section */}
      <div className="">
        <h2 className="lg:text-xl font-bold ml-2">Beras</h2>
        {isLoading && <div>Loading inventory data...</div>}
        {isError && <div>Error fetching inventory: {error.message}</div>}
        {!isError && !isLoading && (
          <div className="flex flex-row w-full max-w-full bg-gray-200 overflow-x-auto">
            {riceList.map((item) => {
              return (
                <GuestItemCard
                  key={item.id}
                  imageUrl={item.image_url}
                  name={item.name}
                  stock={item.stock}
                />
              );
            })}
          </div>
        )}
      </div>

      <div className=" mb-4">
        <h2 className="font-bold lg:text-xl ml-2">Lainnya</h2>
        {isLoading && <div>Loading inventory data...</div>}
        {isError && <div>Error fetching inventory: {error.message}</div>}
        {!isError && !isLoading && (
          <div className="flex flex-row w-full max-w-full bg-gray-200 overflow-x-auto">
            {otherList.map((item) => {
              return (
                <GuestItemCard
                  key={item.id}
                  imageUrl={item.image_url}
                  name={item.name}
                  stock={item.stock}
                />
              );
            })}
          </div>
        )}
      </div>

      <div className="absolute mt-2 bg-blue-300 p-2 group">
        <button className="hidden group-hover:block" onClick={onClick}>
          <p className="text-bg hover:font-semibold">an admin?</p>
        </button>
      </div>
    </div>
  );
}
