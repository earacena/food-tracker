import { createContext } from "react"
import { Profile } from "../Profile/types/profile.types"
import useProfile from "../Profile/hooks/useProfile"

export const UserContext = createContext<UserContextType | null>(null)

// interface UserContextActions {
//   setUserProfile: React.Dispatch<SetStateAction<Profile | null>>
// }

interface UserContextType {
  userProfile: Profile | null | undefined,
}

interface UserProviderProps {
  children: React.ReactNode
}

function UserProvider({ children }: UserProviderProps) {
  const { data: userProfile } = useProfile()

  return (
    <UserContext.Provider value={{ userProfile }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
