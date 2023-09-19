import { useContext, useEffect, useState } from "react";
import { type FoodItems } from "../types/foodItem.types";
import { AuthContext } from "@/features/Auth/AuthProvider";
import foodItemService from "../api/foodItem.service";
import { useToast } from "@/components/ui/toastHook";
import logger from "@/utils/Logger";

export function useFoodItems () {
  const auth = useContext(AuthContext)
  const { toast } = useToast()
  const [foodItems, setFoodItems] = useState<FoodItems>([])

  useEffect(() => {
    async function fetchUserFoodItems() {
      try {
        const fetchedFoodItems = await foodItemService.findFoodItemsByUserId({ 
          userId: auth?.userInfo?.id,
          token: auth?.keycloak?.token
        })

        if (fetchedFoodItems) {
          setFoodItems(fetchedFoodItems)
        }
      } catch (err: unknown) {
        logger.logError(err)

        toast({
          title: 'Error',
          description: 'Unable to fetch food items',
          variant: 'destructive',
        })
      }
    }

    if (auth?.userInfo) {
      fetchUserFoodItems()
    }
  }, [auth, toast])


  return [foodItems, setFoodItems] as const
}
