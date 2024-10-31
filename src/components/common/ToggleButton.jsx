export default function ToggleButton({ label, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`font-medium text-sm p-1 px-2 rounded-md outline ${
        isActive ? 'bg-actionBtn text-white' : 'bg-white outline-1'
      }`}
    >
      {label}
    </button>
  );
};
