import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export function UserCard(): JSX.Element {
  return (
    <Avatar>
      Username
      <AvatarFallback>AA</AvatarFallback>
    </Avatar>
  );
}
