import FoodItemList from "./FoodItemList"

function FoodItems () {
  return (
    <div className="flex flex-col items-center mx-auto">
      <span className="text-xl text-semibold">
        Food Items
      </span>
      <FoodItemList />
    </div>
  )
}

export default FoodItems