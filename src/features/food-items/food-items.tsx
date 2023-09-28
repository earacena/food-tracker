import FoodItemList from './food-item-list'

function FoodItems () {
  return (
    <div className="flex flex-col items-center mx-auto">
      <span className="text-3xl text-semibold">
        Food Items
      </span>
      <FoodItemList />
    </div>
  )
}

export default FoodItems