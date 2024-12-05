import PropTypes from 'prop-types';
import ItemCard from '../common/ItemCard';

export default function CashierItemCard({
  item,
  quantity,
  addToCart,
  removeFromCart,
  setQuantity,
}) {
  const isDisabled = quantity >= item.stock; // Disable button if quantity meets or exceeds stock

  return (
    <div className={`flex flex-row gap-2 max-h-40 w-full lg:w-80 border ${quantity > 0 ? 'border-black bg-gray-100' : ''} rounded-lg`}>
      <ItemCard
        imageUrl={item.imageUrl}
        name={item.name}
        stock={item.stock}
        price={item.price}
        packageSize={item.packageSize}
      />
      <div className="flex flex-col justify-center gap-2 w-40">
        <h3 className="text-sm font-semibold">{item.name}</h3>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={quantity}
            min="0"
            max={item.stock}
            className="w-12 text-center border rounded"
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
          <button
            className={`bg-blue-500 text-white text-xs py-1 px-2 rounded ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={addToCart}
            disabled={isDisabled} // Disable add button when stock limit is reached
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

CashierItemCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    stock: PropTypes.number.isRequired,
    packageSize: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
  quantity: PropTypes.number.isRequired,
  addToCart: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  setQuantity: PropTypes.func.isRequired,
};
