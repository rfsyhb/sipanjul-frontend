import PropTypes from 'prop-types';
import EditableItemCard from '../common/EditableItemCard';

export default function InventoryItemCard({ item, onDelete }) {
  return (
    <div className='w-40'>
      <EditableItemCard
        imageUrl={item.image_url}
        name={item.name}
        stock={item.stock}
        price={item.price}
        type={item.type}
        packageSize={item.packagesize}
        onDelete={() => onDelete(item.id)}
      />
      <h3>{item.name}</h3>
    </div>
  );
}

InventoryItemCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    stock: PropTypes.number.isRequired,
    packagesize: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image_url: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};
