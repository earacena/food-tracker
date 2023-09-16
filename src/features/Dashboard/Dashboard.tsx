import { useContext } from "react"
import { ProfileCard } from "../Profile"
import { UserContext } from "../User/UserProvider"

function Dashboard() {
  const user = useContext(UserContext)

  return (
    <>
      <ProfileCard profile={user?.userProfile} />
    </>
  )
}

export default Dashboard
