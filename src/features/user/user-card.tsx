import { useContext } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { AuthContext } from '@/features/auth';

export function UserCard(): JSX.Element {
  const auth = useContext(AuthContext);

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
