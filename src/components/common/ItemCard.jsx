import PropTypes from 'prop-types';

export default function ItemCard({
  imageUrl,
  name,
  stock,
  price,
  packageSize,
}) {
  return (
    <div
      className={`relative border ${
        stock < 20 ? 'border-red-400 border-2' : 'border-gray-300'
      } rounded-lg flex flex-col w-40 group`}
    >
      {stock < 20 && (
        <div className="absolute inset-0 bg-red-400 opacity-10 rounded-lg"></div>
      )}
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-40 object-cover rounded-lg overflow-hidden"
      />
      <div
        className={`absolute top-1 right-1 text-xs px-2 py-1 rounded ${
          stock < 20 ? 'bg-red-400 font-medium' : 'bg-gray-200'
        }`}
      >
        stok: {stock}
      </div>
      <div className="absolute bottom-1 left-1 bg-gray-200 text-xs px-2 py-1 rounded">
        Rp. {price.toLocaleString()}
      </div>
      <div className="absolute bottom-1 right-1 bg-gray-200 text-xs px-2 py-1 rounded">
        {packageSize}
      </div>

      {/* Button Edit Barang */}
      <div className="absolute inset-0 flex items-center justify-center bg-gray-300 bg-opacity-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button className="border border-actionBtn bg-actionBtn text-white px-4 py-1 rounded-lg hover:bg-activeBtn hover:text-inactiveBtn">
          <span className="font-medium text-sm">Edit Barang</span>
        </button>
      </div>
    </div>
  );
}

ItemCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  stock: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  packageSize: PropTypes.string.isRequired,
};
