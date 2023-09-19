import FoodListItem from "./FoodListItem"
import { FoodItems } from "./types/foodItem.types"

interface FoodItemListProps {
  foodItems: FoodItems
}

function FoodItemList({ foodItems }: FoodItemListProps) {
  return (
    <ul>
      {foodItems && foodItems.map((f) => (
        <FoodListItem key={f.id} foodItem={f} />
      ))}
    </ul>
  )
}

export default FoodItemList