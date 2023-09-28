
import { Button } from "@/components/ui/Button"
import { DropdownMenu, DropdownMenuGroup, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/DropdownMenu"
import { MoreVertical, Trash } from "lucide-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AuthContext } from "../Auth/AuthProvider"
import { useContext, useState } from "react"
import logger from "@/utils/Logger"
import mealService from "./api/meal.service"
import { Meal } from "./types/meals.types"
import mealEntryService from "./api/mealEntry.service"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/Dialog"

interface MealDropdownMenuProps {
  meal: Meal
}

interface DeleteMutationProps {
  mealId: number
}

function MealDropdownMenu({ meal }: MealDropdownMenuProps) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const auth = useContext(AuthContext)
  const queryClient = useQueryClient()

  const removeMeal = useMutation({
    mutationFn: async ({ mealId }: DeleteMutationProps) => {
      await mealEntryService.deleteMealEntriesByMealId({
        mealId,
        userId: auth?.userInfo?.id,
        token: auth?.keycloak?.token
      })

      await mealService.deleteMeal({
        mealId,
        userId: auth?.userInfo?.id,
        token: auth?.keycloak?.token
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['mealEntries', auth?.userInfo?.id, auth?.keycloak?.token]
      })

      queryClient.invalidateQueries({
        queryKey: ['meals', auth?.userInfo?.id, auth?.keycloak?.token]
      })

    },
    onError: (error) => logger.logError(error)
  })

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className="p-1" asChild>
          <Button className="p-1" variant="ghost" >
            <MoreVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>'{meal.name}' Meal Options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DialogTrigger asChild>
              <DropdownMenuItem>
                <Trash className="mr-2 h-4 w-4 text-red-400" />
                <span className="text-lg text-red-400">Delete</span>
              </DropdownMenuItem>
            </DialogTrigger>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete '{meal.name}'?</DialogTitle>
          <DialogDescription>
            This action cannot be reversed. Are you sure you want to delete this meal and all its meal entries?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="button" onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button
            className="font-bold text-red-600"
            variant="secondary"
            type="button"
            onClick={() => {
              removeMeal.mutate({
                mealId: meal.id
              })
            }}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default MealDropdownMenu