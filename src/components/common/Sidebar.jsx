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
    <aside className="bg-card1 text-text flex flex-col p-4 gap-4 items-center min-h-screen">
      <div className="flex flex-col bg-white rounded-3xl">
        <SidebarItem
          icon={<FaHome size={24} className="text-inactiveBtn" />}
          label="Home"
          isActive={true}
        />
        <SidebarItem
          icon={<FaCalculator size={24} className="text-inactiveBtn" />}
          label="Calculator"
          isActive={false}
        />
        <SidebarItem
          icon={<FaDatabase size={24} className="text-inactiveBtn" />}
          label="Database"
          isActive={false}
        />
      </div>
      <div className="flex flex-col bg-white rounded-3xl">
        <SidebarItem
          icon={<FaClipboardList size={24} className="text-inactiveBtn" />}
          label="Report"
          isActive={false}
        />
        <SidebarItem
          icon={<FaChartPie size={24} className="text-inactiveBtn" />}
          label="Chart"
          isActive={false}
        />
      </div>
      <div className="flex flex-col bg-white rounded-full">
        <span className="font-bold text-inactiveBtn p-3 text-sm">GPM</span>
      </div>
      <div className="mt-auto">
        <SidebarItem
          icon={<FaSignOutAlt size={24} className="text-inactiveBtn" />}
          label="Logout"
          isActive={false}
        />
        <SidebarItem
          icon={<FaUserCircle size={24} className="text-inactiveBtn" />}
          label="User"
          isActive={false}
        />
      </div>
    </aside>
  );
}
