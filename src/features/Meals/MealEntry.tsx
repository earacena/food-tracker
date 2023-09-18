import { MealEntry } from "./types/mealEntries.types"

interface MealEntryProps {
  mealEntry: MealEntry
}

function MealEntry({ mealEntry }: MealEntryProps) {

  return (
    <li>
      meal entry id: {mealEntry.id}
    </li>
  )
}

export default MealEntry