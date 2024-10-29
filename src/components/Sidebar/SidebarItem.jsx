import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

export default function SidebarItem({ icon, to }) {
  return (
    <div className="flex flex-col items-center label-text p-2 rounded-lg cursor-pointer w-full ">
      <NavLink
        to={to}
        className={({ isActive }) =>
          `p-3 rounded-full ${isActive ? 'bg-inactiveBtn' : ''}`
        }
      >
        {icon}
      </NavLink>
    </div>
  );
}

SidebarItem.propTypes = {
  icon: PropTypes.element.isRequired,
  to: PropTypes.string.isRequired,
};
