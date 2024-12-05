import GuestItemCard from '../../components/landingpage/GuestItemCard';
import { guestItemList } from '../../utils/dummyData';

export default function LandingPage() {
  const riceList = guestItemList.filter((item) => item.type === 'beras');
  const otherList = guestItemList.filter((item) => item.type === 'lainnya');
  const storeStatus = true;

  return (
    <div className="h-screen flex flex-col gap-4 w-full">
      {/* header section */}
      <header className="flex justify-center border-2 border-gray-300 w-full">
        <div className="flex flex-row items-center justify-between max-w-[85vw] w-full py-2">
          <h2 className="text-2xl">
            <span className="font-bold">Bulog</span> <span>Kalteng</span>
          </h2>
          <div className="flex flex-row gap-2 items-center">
            <p>status toko:</p>
            {storeStatus ? (
              <span className="px-4 py-2 rounded-full font-bold bg-green-600 text-white">
                TOKO SEDANG BUKA
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full font-bold bg-red-600 text-white">
                TOKO TUTUP
              </span>
            )}
          </div>
        </div>
      </header>

      {/* hero section */}
      <div className="w-full flex justify-center flex-grow">
        <div className="flex flex-row justify-between max-w-[85vw] w-full">
          <div className="flex flex-col justify-between">
            <h1 className="text-3xl font-bold">
              Tim Pengendali Inflasi Daerah <br />
              <span className="font-normal">(TPID) Palangka Raya</span>
            </h1>
            <p>
              *Jadwal buka: Senin - Kamis 7-12 dan 13-18, Jumat 7-11 dan 13-16,
              dan Sabtu 7-12
            </p>
          </div>
          <div className="">
            <img
              src="/src/assets/BULOG.jpeg"
              alt="foto_bulog"
              className="w-full h-full max-w-[600px] max-h-[350px] rounded-lg object-cover"
            />
          </div>
        </div>
      </div>

      {/* itemlist section */}
      <div className="">
        <h2 className="text-xl font-bold ml-2">Beras</h2>
        <div className="flex flex-row w-full max-w-full bg-gray-200 overflow-x-auto">
          {riceList.map((item) => {
            return (
              <GuestItemCard
                key={item.id}
                imageUrl={item.imageUrl}
                name={item.name}
                stock={item.stock}
              />
            );
          })}
        </div>
      </div>

      <div className=" mb-4">
        <h2 className="font-bold text-xl ml-2">Lainnya</h2>
        <div className="flex flex-row w-full max-w-full bg-gray-200 overflow-x-auto">
          {otherList.map((item) => {
            return (
              <GuestItemCard
                key={item.id}
                imageUrl={item.imageUrl}
                name={item.name}
                stock={item.stock}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
