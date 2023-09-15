import { Avatar, AvatarFallback } from "@/components/ui/Avatar"
import { useContext } from "react"
import { AuthContext } from "../Auth/AuthProvider"

function UserCard() {
  const auth = useContext(AuthContext)

  return (
    <>
      {auth?.userInfo?.username}
      <Avatar>
        <AvatarFallback>
          <strong>
            {auth?.userInfo?.username?.at(0)?.toUpperCase()}
          </strong>
        </AvatarFallback>
      </Avatar>
    </>
  )
}

export default UserCard
