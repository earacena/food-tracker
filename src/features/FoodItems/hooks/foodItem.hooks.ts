import { useContext, useEffect } from "react";
import { AuthContext } from "@/features/Auth/AuthProvider";
import foodItemService from "../api/foodItem.service";
import { useToast } from "@/components/ui/toastHook";
import logger from "@/utils/Logger";
import { useQuery } from '@tanstack/react-query'

export function useFoodItems() {
  const auth = useContext(AuthContext)
  const { toast } = useToast()

  const validAuth: boolean = (auth?.userInfo?.id != null && auth?.keycloak?.token != null)

  const foodItemsQuery = useQuery({
    queryKey: ['foodItems', auth?.userInfo?.id, auth?.keycloak?.token],
    queryFn: async () => await foodItemService.findFoodItemsByUserId({
      userId: auth?.userInfo?.id,
      token: auth?.keycloak?.token
    }),
    enabled: validAuth,
  })

  useEffect(() => {
    if (foodItemsQuery.error) {
      logger.logError(foodItemsQuery.error)

      toast({
        title: 'Error',
        description: 'Unable to fetch food items',
        variant: 'destructive',
      })
    }
  }, [foodItemsQuery.error, toast])

  return foodItemsQuery
}