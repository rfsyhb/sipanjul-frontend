import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import useIsMobile from '../../hooks/useIsMobile';

export default function SidebarItem({ icon, to }) {
  const isMobile = useIsMobile(768);

  return (
    <>
      {!isMobile && (
        <div
          className={`flex flex-col items-center label-text p-2 rounded-lg cursor-pointer w-full`}
        >
          <NavLink
            to={to}
            className={({ isActive }) =>
              `${isMobile ? 'p-2' : 'p-3'} rounded-full ${isActive ? 'bg-inactiveBtn' : 'hover:bg-text'}`
            }
          >
            {icon}
          </NavLink>
        </div>
      )}

      {isMobile && (
        <div
          className={`flex flex-col items-center label-text rounded-full bg-white cursor-pointer p-1`}
        >
          <NavLink
            to={to}
            className={({ isActive }) =>
              `${isMobile ? 'p-2' : 'p-3'} rounded-full ${isActive ? 'bg-inactiveBtn' : 'hover:bg-text'}`
            }
          >
            {icon}
          </NavLink>
        </div>
      )}
    </>
  );
}

SidebarItem.propTypes = {
  icon: PropTypes.element.isRequired,
  to: PropTypes.string.isRequired,
};
