import {
  FaHome,
  FaCalculator,
  FaDatabase,
  FaClipboardList,
  FaChartPie,
  FaUserCircle,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaBalanceScale,
} from 'react-icons/fa';
import SidebarItem from '../Sidebar/SidebarItem';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import useIsMobile from '../../hooks/useIsMobile';

export default function Sidebar({ currentPath }) {
  const isMobile = useIsMobile(768);
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isMobile && (
        <div>
          <button
            onClick={toggleSidebar}
            className="p-2 bg-bg text-text rounded-md"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      )}

      <aside
        className={`text-text flex flex-col ${isMobile ? 'w-12 bg-none h-auto' : ''} mt-14 md:mt-0 md:p-4 md:py-2 md:gap-4 items-center ${
          isMobile
            ? 'fixed top-0 right-0 h-full z-40 transition-transform transform'
            : ''
        } ${isMobile ? (isOpen ? 'translate-x-0' : 'translate-x-full') : ''}`}
      >
        {/* if desktop */}
        {!isMobile && (
          <>
            <div className="flex flex-col bg-white rounded-full">
              <SidebarItem
                icon={
                  <FaHome
                    size={24}
                    className={
                      currentPath == '/home'
                        ? 'text-activeBtn'
                        : 'text-inactiveBtn'
                    }
                  />
                }
                to="/home"
              />
              <SidebarItem
                icon={
                  <FaCalculator
                    size={24}
                    className={
                      currentPath == '/kasir'
                        ? 'text-activeBtn'
                        : 'text-inactiveBtn'
                    }
                  />
                }
                to="/kasir"
              />
              <SidebarItem
                icon={
                  <FaDatabase
                    size={24}
                    className={
                      currentPath == '/stok'
                        ? 'text-activeBtn'
                        : 'text-inactiveBtn'
                    }
                  />
                }
                to="/stok"
              />
            </div>
            <div className="flex flex-col bg-white rounded-full">
              <SidebarItem
                icon={
                  <FaClipboardList
                    size={24}
                    className={
                      currentPath == '/laporan'
                        ? 'text-activeBtn'
                        : 'text-inactiveBtn'
                    }
                  />
                }
                to="/laporan"
              />
              <SidebarItem
                icon={
                  <FaChartPie
                    size={24}
                    className={
                      currentPath == '/grafik'
                        ? 'text-activeBtn'
                        : 'text-inactiveBtn'
                    }
                  />
                }
                to="/grafik"
              />
            </div>
            <div className="flex flex-col bg-white rounded-full">
              <SidebarItem
                icon={
                  <FaBalanceScale
                    size={24}
                    className={
                      currentPath == '/gpm'
                        ? 'text-activeBtn'
                        : 'text-inactiveBtn'
                    }
                  />
                }
                to="/gpm"
              />
            </div>
            <div className="mt-auto">
              <SidebarItem
                icon={
                  <FaSignOutAlt
                    size={24}
                    className={
                      currentPath == '/logout'
                        ? 'text-activeBtn'
                        : 'text-inactiveBtn'
                    }
                  />
                }
                isLogout
                to="/logout"
              />
              <SidebarItem
                icon={
                  <FaUserCircle
                    size={24}
                    className={
                      currentPath == '/user'
                        ? 'text-activeBtn'
                        : 'text-inactiveBtn'
                    }
                  />
                }
                to="/user"
              />
            </div>
          </>
        )}

        {/* mobile version */}
        {isMobile && (
          <div className="flex flex-col gap-1">
            <SidebarItem
              icon={
                <FaHome
                  size={24}
                  className={
                    currentPath == '/home'
                      ? 'text-activeBtn'
                      : 'text-inactiveBtn'
                  }
                />
              }
              to="/home"
            />
            <SidebarItem
              icon={
                <FaCalculator
                  size={24}
                  className={
                    currentPath == '/kasir'
                      ? 'text-activeBtn'
                      : 'text-inactiveBtn'
                  }
                />
              }
              to="/kasir"
            />
            <SidebarItem
              icon={
                <FaDatabase
                  size={24}
                  className={
                    currentPath == '/stok'
                      ? 'text-activeBtn'
                      : 'text-inactiveBtn'
                  }
                />
              }
              to="/stok"
            />
            <SidebarItem
              icon={
                <FaClipboardList
                  size={24}
                  className={
                    currentPath == '/laporan'
                      ? 'text-activeBtn'
                      : 'text-inactiveBtn'
                  }
                />
              }
              to="/laporan"
            />
            <SidebarItem
              icon={
                <FaChartPie
                  size={24}
                  className={
                    currentPath == '/grafik'
                      ? 'text-activeBtn'
                      : 'text-inactiveBtn'
                  }
                />
              }
              to="/grafik"
            />
            <SidebarItem
              icon={
                <FaBalanceScale
                  size={24}
                  className={
                    currentPath == '/gpm'
                      ? 'text-activeBtn'
                      : 'text-inactiveBtn'
                  }
                />
              }
              to="/gpm"
            />
            <SidebarItem
              icon={
                <FaSignOutAlt
                  size={24}
                  className={
                    currentPath == '/logout'
                      ? 'text-activeBtn'
                      : 'text-inactiveBtn'
                  }
                />
              }
              isLogout
              to="/logout"
            />
            <SidebarItem
              icon={
                <FaUserCircle
                  size={24}
                  className={
                    currentPath == '/user'
                      ? 'text-activeBtn'
                      : 'text-inactiveBtn'
                  }
                />
              }
              to="/user"
            />
          </div>
        )}
      </aside>
    </>
  );
}

Sidebar.propTypes = {
  currentPath: PropTypes.string.isRequired,
};
