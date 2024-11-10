import { BsFillLockFill, BsUnlockFill } from 'react-icons/bs';

export default function Header() {
  const date = new Date();
  const options = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
  const formattedDate = date.toLocaleDateString('id-ID', options);
  
  return (
    <header className="w-full px-4 pt-2 flex items-center justify-between">
      <div className="flex flex-row items-center gap-4">
        {/* on off toko */}
        <div className="flex flex-row p-1 bg-white rounded-full">
          <div className="p-4 px-6 bg-green-400 rounded-full cursor-pointer">
            <BsUnlockFill size={24} />
          </div>
          <div className="p-4 px-6 cursor-pointer">
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
  );
}
