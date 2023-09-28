import { useToast } from '@/components/ui/toast-hook'
import { AuthContext } from '@/features/auth/auth-provider'
import logger from '@/utils/logger'
import { useContext, useEffect } from "react"
import mealService from "../api/meal.service"
import { useQuery } from "@tanstack/react-query"
import { refreshToken } from '@/features/auth/refresh-token'
import { AuthError } from "@/utils/errors"

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

      if (mealsQuery.error instanceof AuthError && mealsQuery.error.message === 'jwt expired') {
        refreshToken(auth?.keycloak, logger)
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Unable to fetch meals'
        })
      }
    }
  }, [auth?.keycloak, mealsQuery.error, toast])

  return mealsQuery
}


export default useMeals