import { itemList } from "../utils/dummyData";
import InventoryItemCard from "../components/inventorypage/InventoryItemCard";

export default function InventoryPage() {
  return (
    <div class="flex flex-row flex-wrap gap-4 justify-center">
      {itemList.map((item) => (
        <InventoryItemCard
          key={item.id}
          item={item}
        />
      ))}
    </div>
  );
}