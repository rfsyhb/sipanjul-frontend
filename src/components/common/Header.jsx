import { BsFillLockFill, BsUnlockFill } from 'react-icons/bs';

export default function Header() {
  return (
    <header className="w-full p-4 py-5 flex items-center justify-between">
      <div className="flex flex-row bg-gray-300 rounded-3xl">
        <div className="p-4 px-6 bg-green-400 rounded-full cursor-pointer">
          <BsUnlockFill size={24} />
        </div>
        <div className="p-4 px-6 cursor-pointer">
          <BsFillLockFill size={24} />
        </div>
      </div>
      <h1 className="text-2xl font-bold">This is Header</h1>
      <img src="/assets/logobulog.png" alt="logobulog" className="w-32" />
    </header>
  );
}
