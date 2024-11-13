import PropTypes from 'prop-types';
import ItemCard from '../common/ItemCard';

export default function InventoryItemCard({ item }) {
  return (
    <div className='w-40'>
      <ItemCard
        imageUrl={item.imageUrl}
        name={item.name}
        stock={item.stock}
        price={item.price}
        packageSize={item.packageSize}
      />
      <h3>{item.name}</h3>
    </div>
  );
}

InventoryItemCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    stock: PropTypes.number.isRequired,
    packageSize: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
};
