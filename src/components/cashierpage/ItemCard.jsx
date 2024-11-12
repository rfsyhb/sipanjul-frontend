import PropTypes from 'prop-types';

export default function ItemCard({
  imageUrl,
  stock,
  price,
  type,
  name,
  quantity,
  addToCart,
  removeFromCart,
  setQuantity,
}) {
  return (
    <div className="flex flex-row gap-2 max-h-40">
      <div className="relative border border-gray-300 rounded-lg flex flex-col min-w-40 max-w-40">
        <img
          src={imageUrl}
          alt={name}
          className="w-full min-h-40 object-cover rounded-lg"
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
      <div className="flex flex-col justify-center gap-2">
        <h3 className="text-sm font-semibold">{name}</h3>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={quantity}
            min="0"
            max={stock}
            className="w-12 text-center border rounded"
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
          <button
            className="bg-blue-500 text-white text-xs py-1 px-2 rounded"
            onClick={addToCart}
          >
            +
          </button>
          <button
            className="bg-red-500 text-white text-xs py-1 px-2 rounded"
            onClick={removeFromCart}
          >
            -
          </button>
        </div>
      </div>
    </div>
  );
}

ItemCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  stock: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  addToCart: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  setQuantity: PropTypes.func.isRequired,
};
