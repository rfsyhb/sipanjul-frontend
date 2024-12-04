export default function GuestItemCard({ imageUrl, name, stock }) {
  return (
    <div className="flex flex-col gap-1 p-2 min-w-64">
      {/* Image container with relative positioning */}
      <div className="relative">
        <img
          src={imageUrl}
          alt={name}
          className="object-cover overflow-hidden outline outline-2 outline-textP h-40 w-full rounded-md"
        />
        {/* Overlay for out-of-stock */}
        {!stock && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-300 bg-opacity-50 rounded-md">
            <div className="border border-actionBtn bg-actionBtn text-white w-full py-1 text-center">
              <span className="font-medium text-sm">BARANG SEDANG HABIS</span>
            </div>
          </div>
        )}
      </div>
      <p>{name}</p>
    </div>
  );
}
