import { useContext, useEffect, useState } from 'react';
import type { KeycloakProfile } from 'keycloak-js';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { KeycloakContext } from '../auth';

export function UserCard(): JSX.Element {
  const keycloak = useContext(KeycloakContext);
  const [userInfo, setUserInfo] = useState<KeycloakProfile>();

  useEffect(() => {
    async function loadKeycloakProfile(): Promise<void> {
      setUserInfo(await keycloak?.client?.loadUserProfile());
    }

    void loadKeycloakProfile();
  }, [keycloak?.client, setUserInfo]);

  return (
    <Avatar>
      <AvatarFallback>
        <strong>{userInfo?.username?.at(0)?.toUpperCase()}</strong>
      </AvatarFallback>
    </Avatar>
  );
}
