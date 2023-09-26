import { Button } from "@/components/ui/Button"
import { DropdownMenu, DropdownMenuGroup, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/DropdownMenu"
import { MoreVertical, Trash } from "lucide-react"
import { MealEntry } from "./types/mealEntries.types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import mealEntryService from "./api/mealEntry.service"
import { AuthContext } from "../Auth/AuthProvider"
import { useContext } from "react"
import logger from "@/utils/Logger"
import { FoodItem } from "../FoodItems/types/foodItem.types"

interface MealEntryDropdownMenuProps {
  mealEntry: MealEntry
  foodItem: FoodItem
}

interface DeleteMutationProps {
  mealEntryId: number
}

function MealEntryDropdownMenu({ mealEntry, foodItem }: MealEntryDropdownMenuProps) {

  const auth = useContext(AuthContext)
  const queryClient = useQueryClient()

  const removeMealEntry = useMutation({
    mutationFn: async ({ mealEntryId }: DeleteMutationProps) => await mealEntryService.deleteMealEntry({
      mealEntryId,
      userId: auth?.userInfo?.id,
      token: auth?.keycloak?.token
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['mealEntries', auth?.userInfo?.id, auth?.keycloak?.token]
      })
    },
    onError: (error) => logger.logError(error)
  })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="p-1" variant="ghost" >
          <MoreVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>'{foodItem.foodName}' Entry Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => {
            removeMealEntry.mutate({
              mealEntryId: mealEntry.id
            })
          }}>
            <Trash className="mr-2 h-4 w-4 text-red-400" />
            <span className="text-lg text-red-400">Delete</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default MealEntryDropdownMenu