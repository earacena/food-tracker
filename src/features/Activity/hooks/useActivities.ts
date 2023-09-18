import { useToast } from "@/components/ui/toastHook"
import { AuthContext } from "@/features/Auth/AuthProvider"
import logger from "@/utils/Logger"
import { useContext, useEffect, useState } from "react"
import { Activities } from "../types/activity.types"
import activityService from "../api/activity.service"

function useActivities() {

  const { toast } = useToast()
  const auth = useContext(AuthContext)

  const [activities, setActivities] = useState<Activities>([])

  useEffect(() => {
    async function fetchUserActivities() {
      try {
        const fetchedActivities = await activityService.findActivitiesByUserId({
          userId: auth?.userInfo?.id,
          token: auth?.keycloak?.token
        })

        if (fetchedActivities) {
          setActivities(fetchedActivities)
        }
      } catch (err: unknown) {
        logger.logError(err)

        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Unable to fetch activities'
        })
      }
    }

    fetchUserActivities()
  }, [auth, toast])

  return [activities, setActivities] as const
}

export default useActivities
