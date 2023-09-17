import { Profile } from "./types/profile.types"

interface ProfileCardProps {
  profile: Profile | null | undefined
}

function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <div className="flex flex-col border border-red-600 mx-auto my-10 items-center">
      <div>
        <span className="text-5xl">
          0000
        </span>
        <span className="text-slate-400">
          /{profile?.dailyCalorieGoal}
        </span>
      </div>
      calories to go!
    </div>
  )
}

export default ProfileCard
