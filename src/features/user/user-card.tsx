import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useProfile } from '../profile';

export function UserCard(): JSX.Element {
  const { data: userProfile } = useProfile();

  return (
    <>
      {auth?.userInfo?.username}
      <Avatar>
        <AvatarFallback>
          <strong>{auth?.userInfo?.username?.at(0)?.toUpperCase()}</strong>
        </AvatarFallback>
      </Avatar>
    </>
  );
}
