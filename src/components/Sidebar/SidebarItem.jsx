import PropTypes from 'prop-types';

export default function SidebarItem({ icon, label, isActive = false }) {
  return (
    <div className="flex flex-col items-center label-text p-2 rounded-lg cursor-pointer w-full ">
      <div className={`p-3 rounded-full ${isActive ? "bg-inactiveBtn" : ""}`}>{icon}</div>
      <span className={`text-xs mt-2 hidden`}>{label}</span>
    </div>
  );
}

SidebarItem.propTypes = {
  icon: PropTypes.element.isRequired,
  label: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
};
