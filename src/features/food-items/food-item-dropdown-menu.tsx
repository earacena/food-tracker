import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuGroup, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { MoreVertical, Trash } from "lucide-react"
import { FoodItem } from './types/food-item.types'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import foodItemService from './api/food-item.service'
import { AuthContext } from '../auth/auth-provider'
import { useContext } from "react"
import logger from '@/utils/logger'

interface FoodItemDropdownMenuProps {
  foodItem: FoodItem
}

interface DeleteMutationProps {
  foodItemId: number
}

function FoodItemDropdownMenu({ foodItem }: FoodItemDropdownMenuProps) {

  const auth = useContext(AuthContext)
  const queryClient = useQueryClient()

  const removeFoodItem = useMutation({
    mutationFn: async ({ foodItemId }: DeleteMutationProps) => await foodItemService.deleteFoodItem({
      foodItemId,
      userId: auth?.userInfo?.id,
      token: auth?.keycloak?.token
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['foodItems', auth?.userInfo?.id, auth?.keycloak?.token]
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
        <DropdownMenuLabel>'{foodItem.foodName}' Item Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => {
            removeFoodItem.mutate({
              foodItemId: foodItem.id
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

export default FoodItemDropdownMenu