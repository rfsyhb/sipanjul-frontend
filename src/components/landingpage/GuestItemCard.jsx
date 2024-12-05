export default function GuestItemCard({ imageUrl, name, stock }) {
  return (
    <div className="flex flex-col gap-1 p-2 min-w-40 lg:min-w-60">
      {/* Image container with relative positioning */}
      <div className="relative w-full h-24 lg:h-32">
        <img
          src={imageUrl}
          alt={name}
          className="object-cover w-full h-full rounded-md outline outline-2"
        />
        {/* Overlay for out-of-stock */}
        {!stock && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-300 bg-opacity-50 rounded-md">
            <div className="border border-actionBtn bg-actionBtn text-white w-full py-1 text-center">
              <span className="font-medium text-xs lg:text-sm">BARANG SEDANG HABIS</span>
            </div>
          </div>
        )}
      </div>

      {/* Truncated text */}
      <p className="text-sm truncate lg:w-full">{name}</p>
    </div>
  );
}
