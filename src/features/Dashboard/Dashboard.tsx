import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../Auth/AuthProvider"
import profileService from "../Profile/api/profile.service"
import { Profile } from "../Profile"

function Dashboard() {
  const auth = useContext(AuthContext)
  const [userProfile, setUserProfile] = useState<Profile>()

  useEffect(() => {
    const fetchUserProfile = async () => {
      const fetchedUserProfile  = await profileService.fetchProfileByUserId({
        userId: auth?.userInfo?.id,
        token: auth?.keycloak?.token
      })
      
      if (fetchedUserProfile) {
        setUserProfile(fetchedUserProfile)
      }
    }

    fetchUserProfile()
  })

  return (
    <>
      <Profile profile={userProfile} />
    </>
  )
}

export default Dashboard
