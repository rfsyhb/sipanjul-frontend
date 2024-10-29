export default function SidebarItem({ icon, label }) {
  return (
    <div className="flex flex-col items-center label-text hover:bg-card3 p-3 rounded-lg cursor-pointer w-full my-2">
      {icon}
      <span className="text-xs mt-2">{label}</span>
    </div>
  );
}
