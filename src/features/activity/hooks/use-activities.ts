import { useToast } from '@/components/ui/toast-hook'
import { AuthContext } from '@/features/auth/auth-provider'
import logger from '@/utils/logger'
import { useContext, useEffect } from "react"
import activityService from "../api/activity.service"
import { useQuery } from "@tanstack/react-query"
import { refreshToken } from '@/features/auth/refresh-token'
import { AuthError } from "@/utils/errors"

function useActivities () {
  const auth = useContext(AuthContext)
  const { toast } = useToast()

  const validAuth: boolean = (auth?.userInfo?.id != null && auth.keycloak?.token != null)

  const activitiesQuery = useQuery({
    queryKey: ['activities', auth?.userInfo?.id, auth?.keycloak?.token],
    queryFn: async () => await activityService.findActivitiesByUserId({
      userId: auth?.userInfo?.id,
      token: auth?.keycloak?.token
    }),
    enabled: validAuth
  })

  useEffect(() => {
    if (activitiesQuery.error) {
      logger.logError(activitiesQuery.error)
      
      if (activitiesQuery.error instanceof AuthError && activitiesQuery.error.message === 'jwt expired') {
        refreshToken(auth?.keycloak, logger)
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Unable to fetch activities'
        })
      }
    }
  }, [activitiesQuery.error, auth?.keycloak, toast])

  return activitiesQuery
}

// function useActivitiesOld() {

//   const { toast } = useToast()
//   const auth = useContext(AuthContext)

//   const [activities, setActivities] = useState<Activities>([])

//   useEffect(() => {
//     async function fetchUserActivities() {
//       try {
//         const fetchedActivities = await activityService.findActivitiesByUserId({
//           userId: auth?.userInfo?.id,
//           token: auth?.keycloak?.token
//         })

//         if (fetchedActivities) {
//           setActivities(fetchedActivities)
//         }
//       } catch (err: unknown) {
//         logger.logError(err)

//         toast({
//           variant: 'destructive',
//           title: 'Error',
//           description: 'Unable to fetch activities'
//         })
//       }
//     }

//     fetchUserActivities()
//   }, [auth, toast])

//   return [activities, setActivities] as const
// }

export default useActivities
