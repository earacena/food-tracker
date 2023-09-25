import { useContext, useEffect } from "react";
import { AuthContext } from "@/features/Auth/AuthProvider";
import foodItemService from "../api/foodItem.service";
import { useToast } from "@/components/ui/toastHook";
import logger from "@/utils/Logger";
import { useQuery } from '@tanstack/react-query'
import { refreshToken } from "@/features/Auth/refreshToken";
import { AuthError } from "@/utils/errors";

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

      if (foodItemsQuery.error instanceof AuthError && foodItemsQuery.error.message === 'jwt expired') {
        refreshToken(auth?.keycloak, logger)
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Unable to fetch food items'
        })
      }
    }
  }, [auth?.keycloak, foodItemsQuery.error, toast])

  return foodItemsQuery
}