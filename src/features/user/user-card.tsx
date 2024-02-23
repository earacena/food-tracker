import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { useProfile } from '../profile';

export function UserCard(): JSX.Element {
  const userProfile = useProfile();

  if (userProfile.isLoading) {
    return <Skeleton />;
  }

  return (
    <Avatar>
      {userProfile.data?.name}
      <AvatarFallback>AA</AvatarFallback>
    </Avatar>
  );
}
