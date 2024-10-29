import PropTypes from "prop-types";

export default function SidebarItem({ icon, label, isActive = false }) {
  
  return (
    <div className="flex flex-col items-center label-text p-3 rounded-lg cursor-pointer w-full ">
      {icon}
      <span className={`text-xs mt-2 ${!isActive ? "hidden" : ""}`}>{label}</span>
    </div>
  );
}

SidebarItem.propTypes = {
  icon: PropTypes.element.isRequired,
  label: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
};