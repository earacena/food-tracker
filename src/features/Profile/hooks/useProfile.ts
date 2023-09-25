import { useToast } from "@/components/ui/toastHook"
import { AuthContext } from "@/features/Auth/AuthProvider"
import { refreshToken } from "@/features/Auth/refreshToken"
import profileService, { AuthError, NotFoundError } from "@/features/Profile/api/profile.service"
import logger from "@/utils/Logger"
import { useQuery } from "@tanstack/react-query"
import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function useProfile() {
  const auth = useContext(AuthContext)
  const { toast } = useToast()
  const navigate = useNavigate()
  const validAuth: boolean = (auth?.userInfo?.id != null && auth?.keycloak?.token != null)

  const profileQuery = useQuery({
    queryKey: ['profile', auth?.userInfo?.id, auth?.keycloak?.token],
    queryFn: async () => await profileService.fetchProfileByUserId({
      userId: auth?.userInfo?.id,
      token: auth?.keycloak?.token
    }),
    retry: false,
    enabled: validAuth
  })

  useEffect(() => {
    if (profileQuery.error) {
      logger.logError(profileQuery.error)

      if (profileQuery.error instanceof NotFoundError) {
        navigate('/profile/form')
      } else if (profileQuery.error instanceof AuthError && profileQuery.error.message === 'jwt expired') {
        refreshToken(auth?.keycloak, logger)
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Unable to fetch profile'
        })
      }
    }
  }, [auth?.keycloak, navigate, profileQuery.error, toast])

  return profileQuery
}

export default useProfile