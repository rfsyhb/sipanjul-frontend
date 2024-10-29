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
import PropTypes from 'prop-types';

export default function Sidebar({ currentPath }) {
  return (
    <aside className="bg-card1 text-text flex flex-col p-4 gap-4 items-center min-h-screen">
      <div className="flex flex-col bg-white rounded-3xl">
        <SidebarItem
          icon={
            <FaHome
              size={24}
              className={
                currentPath == '/' ? 'text-activeBtn' : 'text-inactiveBtn'
              }
            />
          }
          label="Home"
          isActive={currentPath == '/' && true}
        />
        <SidebarItem
          icon={
            <FaCalculator
              size={24}
              className={
                currentPath == '/kasir' ? 'text-activeBtn' : 'text-inactiveBtn'
              }
            />
          }
          label="Calculator"
          isActive={currentPath == '/kasir' && true}
        />
        <SidebarItem
          icon={
            <FaDatabase
              size={24}
              className={
                currentPath == '/stok' ? 'text-activeBtn' : 'text-inactiveBtn'
              }
            />
          }
          label="Database"
          isActive={currentPath == '/stok' && true}
        />
      </div>
      <div className="flex flex-col bg-white rounded-3xl">
        <SidebarItem
          icon={
            <FaClipboardList
              size={24}
              className={
                currentPath == '/laporan' ? 'text-activeBtn' : 'text-inactiveBtn'
              }
            />
          }
          label="Report"
          isActive={currentPath == '/laporan' && true}
        />
        <SidebarItem
          icon={
            <FaChartPie
              size={24}
              className={
                currentPath == '/grafik' ? 'text-activeBtn' : 'text-inactiveBtn'
              }
            />
          }
          label="Grafik"
          isActive={currentPath == '/grafik' && true}
        />
      </div>
      <div className="flex flex-col bg-white rounded-full">
        <span className="font-bold text-inactiveBtn p-3 text-sm">GPM</span>
      </div>
      <div className="mt-auto">
        <SidebarItem
          icon={<FaSignOutAlt size={24} />}
          label="Logout"
          isActive={false}
        />
        <SidebarItem
          icon={<FaUserCircle size={24} />}
          label="User"
          isActive={false}
        />
      </div>
    </aside>
  );
}

Sidebar.propTypes = {
  currentPath: PropTypes.string.isRequired,
};
