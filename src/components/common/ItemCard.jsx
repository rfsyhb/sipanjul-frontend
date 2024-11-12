import PropTypes from 'prop-types';

export default function ItemCard({ imageUrl, stock, price, type }) {
  return (
    <div className="relative border border-gray-300 rounded-lg flex flex-col w-40">
      <img
        src={imageUrl}
        alt="Product Image"
        className="w-full h-40 object-cover rounded-lg"
      />
      <div className="absolute top-1 right-1 bg-gray-200 text-xs px-2 py-1 rounded">
        stok: {stock}
      </div>
      <div className="absolute bottom-1 left-1 bg-gray-200 text-xs px-2 py-1 rounded">
        Rp. {price.toLocaleString()}
      </div>
      <div className="absolute bottom-1 right-1 bg-gray-200 text-xs px-2 py-1 rounded">
        {type}
      </div>
    </div>
  );
}

ItemCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  stock: PropTypes.number.isRequired,
  price: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};