import { useContext, useEffect, useState } from "react";
import { type FoodItems } from "../types/foodItem.types";
import { AuthContext } from "@/features/Auth/AuthProvider";
import foodItemService from "../api/foodItem.service";
import { useToast } from "@/components/ui/toastHook";
import logger from "@/utils/Logger";
import { useNavigate } from "react-router-dom";

export function useFoodItems () {
  const auth = useContext(AuthContext)
  const { toast } = useToast()
  const navigate = useNavigate()
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

        toast({
          title: 'Successfully created a food item',
        })
      } catch (err: unknown) {
        logger.logError(err)

        toast({
          title: 'Error',
          description: 'Unable to fetch food items',
          variant: 'destructive',
        })
      }
      
      navigate('/dashboard')
    }

    if (auth?.userInfo) {
      fetchUserFoodItems()
    }
  }, [auth, navigate, toast])


  return [foodItems, setFoodItems]
}
