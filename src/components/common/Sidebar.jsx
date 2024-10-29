import {
  FaHome,
  FaCalculator,
  FaDatabase,
  FaClipboardList,
  FaChartPie,
  FaUserCircle,
  FaSignOutAlt,
} from 'react-icons/fa';
import SidebarItem from '../Sidebar/SidebarItem';

export default function Sidebar() {
  return (
    <aside className="bg-card1 text-text p-4 flex flex-col items-center min-h-screen">
      <div>
        <SidebarItem icon={<FaHome size={24} />} label="Home" />
        <SidebarItem icon={<FaCalculator size={24} />} label="Calculator" />
        <SidebarItem icon={<FaDatabase size={24} />} label="Database" />
      </div>
      <div>
        <SidebarItem icon={<FaClipboardList size={24} />} label="Report" />
        <SidebarItem icon={<FaChartPie size={24} />} label="Chart" />
      </div>
      <div className="flex flex-col items-center text-text p-3 w-full my-2">
        <span className="text-xs">GPM</span>
      </div>
      <div className='mt-auto'>
        <SidebarItem icon={<FaSignOutAlt size={24} />} label="Logout" />
        <SidebarItem icon={<FaUserCircle size={24} />} label="User" />
      </div>
    </aside>
  );
}
