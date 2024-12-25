import PropTypes from 'prop-types';
import EditableItemCard from '../common/EditableItemCard';

export default function InventoryItemCard({ item, onDelete }) {
  return (
    <div className='w-40'>
      <EditableItemCard
        id={item.id}
        imageUrl={item.image_url}
        name={item.name}
        stock={item.stock}
        price={item.price}
        type={item.type}
        packageSize={item.packagesize}
        division={item.division}
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
    type: PropTypes.string.isRequired,
    division: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};
