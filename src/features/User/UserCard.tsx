import { Avatar, AvatarFallback } from "@/components/ui/Avatar"
import { useContext } from "react"
import { AuthContext } from "../auth/AuthProvider"

function UserCard () {
  const auth = useContext(AuthContext)

  return (
    <>
      {auth?.userProfile?.username}
      <Avatar>
        <AvatarFallback>
          <strong>
            {auth?.userProfile?.username?.at(0)?.toUpperCase()}
          </strong>
        </AvatarFallback>
      </Avatar>
    </>
  )
}

export default UserCard
