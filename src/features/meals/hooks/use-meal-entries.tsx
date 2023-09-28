import { useToast } from '@/components/ui/toast-hook'
import { AuthContext } from '@/features/auth/auth-provider'
import { useQuery } from "@tanstack/react-query"
import { useContext, useEffect } from "react"
import mealEntryService from '../api/meal-entry.service'
import logger from '@/utils/logger'
import { refreshToken } from '@/features/auth/refresh-token'
import { AuthError } from "@/utils/errors"

function useMealEntries () {
  const auth = useContext(AuthContext)

  const { toast } = useToast()

  const validAuth: boolean = (auth?.userInfo?.id != null && auth?.keycloak?.token != null)

  const mealEntriesQuery = useQuery({
    queryKey: ['mealEntries', auth?.userInfo?.id, auth?.keycloak?.token],
    queryFn: async () => await mealEntryService.findMealEntriesByUserId({
      userId: auth?.userInfo?.id,
      token: auth?.keycloak?.token
    }),
    enabled: validAuth
  })

  useEffect(() => {
    if (mealEntriesQuery.error) {
      logger.logError(mealEntriesQuery.error)
      
      if (mealEntriesQuery.error instanceof AuthError && mealEntriesQuery.error.message === 'jwt expired') {
        refreshToken(auth?.keycloak, logger)
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Unable to fetch meal entries'
        })
      }
    }
  }, [auth?.keycloak, mealEntriesQuery.error, toast])

  return mealEntriesQuery

}

export default useMealEntries