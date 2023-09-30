import type Keycloak from 'keycloak-js';
import { debounce } from 'lodash';
import { type Logger } from '@/utils/logger';
import { Dispatch, SetStateAction } from 'react';

interface RefreshProps {
  client: Keycloak | null | undefined;
  setToken: Dispatch<SetStateAction<string | undefined>> | undefined;
  logger: Logger;
}

async function refresh({
  client,
  setToken,
  logger,
}: RefreshProps): Promise<void> {
  if (client) {
    if ((await client.updateToken(5)) && setToken) {
      setToken(client.token);
      logger.log('successfully refreshed token');
    } else {
      logger.log('unable to refresh token');
    }
  }
}

export const refreshToken = debounce(refresh, 500);
