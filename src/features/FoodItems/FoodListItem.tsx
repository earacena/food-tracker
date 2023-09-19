import { FoodItem } from "./types/foodItem.types"

interface FoodListItem {
  foodItem: FoodItem
}

function FoodListItem ({ foodItem }: FoodListItem) {

  return (
    <li>
      {foodItem.foodName}
    </li>
  )
}

export default FoodListItem