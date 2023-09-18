import { useToast } from "@/components/ui/toastHook"
import { AuthContext } from "@/features/Auth/AuthProvider"
import logger from "@/utils/Logger"
import { useContext, useEffect, useState } from "react"
import { Meals } from "../types/meals.types"
import { MealEntries } from "../types/mealEntries.types"
import mealService from "../api/meal.service"
import mealEntryService from "../api/mealEntry.service"

function useMeals() {
  const { toast } = useToast()
  const auth = useContext(AuthContext)

  const [meals, setMeals] = useState<Meals>([])
  const [mealEntries, setMealEntries] = useState<MealEntries>([])

  useEffect(() => {

    async function fetchUserMeals() {
      try {
        const fetchedMeals = await mealService.findMealsByUserId({
          userId: auth?.userInfo?.id,
          token: auth?.keycloak?.token
        })

        if (fetchedMeals) {
          setMeals(fetchedMeals)
        }
      } catch (err: unknown) {
        logger.logError(err)

        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Unable to fetch meals'
        })
      }
    }

    async function fetchUserMealEntries() {
      try {
        const fetchedMealEntries = await mealEntryService.findMealEntriesByUserId({
          userId: auth?.userInfo?.id,
          token: auth?.keycloak?.token
        })

        if (fetchedMealEntries) {
          setMealEntries(fetchedMealEntries)
        }
      } catch (err: unknown) {
        logger.logError(err)

        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Unable to fetch meal entries'
        })
      }
    }

    if (auth?.keycloak && auth?.userInfo) {
      fetchUserMeals()
      fetchUserMealEntries()
    }
  }, [auth, toast])


  return [meals, mealEntries, setMeals, setMealEntries] as const
}

export default useMeals