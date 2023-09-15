import { Profile } from "./types/profile.types"

interface ProfileProps {
  profile: Profile | undefined
}

function Profile({ profile }: ProfileProps) {

  return (
    <>
      Goal calories: {profile?.dailyCalorieGoal}
    </>
  )
}

export default Profile
