import { useToast } from "@/components/ui/toastHook"
import { AuthContext } from "@/features/Auth/AuthProvider"
import logger from "@/utils/Logger"
import { useContext, useEffect } from "react"
import mealService from "../api/meal.service"
import { useQuery } from "@tanstack/react-query"

function useMeals() {
  const auth = useContext(AuthContext)
  const { toast } = useToast()
  const validAuth: boolean = (auth?.userInfo?.id != null && auth?.keycloak?.token != null)

  const mealsQuery = useQuery({
    queryKey: ['meals', auth?.userInfo?.id, auth?.keycloak?.token],
    queryFn: async () => await mealService.findMealsByUserId({
      userId: auth?.userInfo?.id,
      token: auth?.keycloak?.token
    }),
    enabled: validAuth
  })

  useEffect(() => {
    if (mealsQuery.error) {
      logger.logError(mealsQuery.error)

      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Unable to fetch meals'
      })
    }
  }, [mealsQuery.error, toast])

  return mealsQuery
}


export default useMeals