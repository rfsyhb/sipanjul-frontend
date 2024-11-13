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
      className={`relative border ${stock < 20 ? 'border-red-400 border-2' : 'border-gray-300'} rounded-lg flex flex-col w-40`}
    >
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-40 object-cover rounded-lg"
      />
      <div
        className={`absolute top-1 right-1 text-xs px-2 py-1 rounded ${stock < 20 ? 'bg-red-400 font-medium' : 'bg-gray-200'}`}
      >
        {' '}
        stok: {stock}
      </div>
      <div className="absolute bottom-1 left-1 bg-gray-200 text-xs px-2 py-1 rounded">
        Rp. {price.toLocaleString()}
      </div>
      <div className="absolute bottom-1 right-1 bg-gray-200 text-xs px-2 py-1 rounded">
        {packageSize}
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
