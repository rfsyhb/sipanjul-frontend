import ItemCard from '../components/common/ItemCard';
import { itemList } from '../utils/dummyData';

export default function CashierPage() {
  return (
    <div className='flex flex-row justify-between'>
      {/* item list */}
      <div className='flex flex-row gap-2'>
        {itemList.map((item, index) => (
          <ItemCard
            key={index}
            imageUrl={item.imageUrl}
            stock={item.stock}
            price={item.price}
            type={item.type}
          />
        ))}
      </div>
      {/* cashier */}
      <div>
        <h1>Cashier</h1>
      </div>
    </div>
  );
}
