import { SetStateAction, createContext, useContext, useEffect, useState } from "react"
import { Profile } from "../Profile/types/profile.types"
import { AuthContext } from "../Auth/AuthProvider"
import profileService from "../Profile/api/profile.service"
import { useToast } from "@/components/ui/toastHook"
import logger from "@/utils/Logger"
import { useNavigate } from "react-router-dom"
import { z } from "zod"

export const UserContext = createContext<UserContextType | null>(null)

interface UserContextActions {
  setUserProfile: React.Dispatch<SetStateAction<Profile | null>>
}

interface UserContextType {
  userProfile: Profile | null,
  actions: UserContextActions
}

interface UserProviderProps {
  children: React.ReactNode
}

function UserProvider({ children }: UserProviderProps) {
  const auth = useContext(AuthContext)
  const [userProfile, setUserProfile] = useState<Profile | null>(null)

  const navigate = useNavigate()
  const { toast } = useToast()


  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const fetchedUserProfile = await profileService.fetchProfileByUserId({
          userId: auth?.userInfo?.id,
          token: auth?.keycloak?.token
        })

        if (fetchedUserProfile) {
          setUserProfile(fetchedUserProfile)
        }
      } catch (err: unknown) {
        logger.logError(err)

        const parsedErrorResult = z.instanceof(Error).safeParse(err)
        if (parsedErrorResult.success) {
          
          const parsedError = parsedErrorResult.data
          
          if (parsedError.message === 'profile does not exist') {
            logger.log('redirecting to profile form')
            navigate('/profile/form')
          }
        } else {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Profile was not found',
          })

          logger.log('unknown error')
        }
      }
    }

    fetchUserProfile()
  }, [auth, toast, navigate])

  return (
    <UserContext.Provider value={{ userProfile, actions: { setUserProfile } }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
