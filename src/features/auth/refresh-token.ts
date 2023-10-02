import type Keycloak from 'keycloak-js';
import { debounce } from 'lodash';
import type { Dispatch, SetStateAction } from 'react';
import { type Logger } from '@/utils/logger';

interface RefreshProps {
  client: Keycloak | null;
  setToken: Dispatch<SetStateAction<string | null>> | null;
  logger: Logger;
}

async function refresh({
  client,
  setToken,
  logger,
}: RefreshProps): Promise<void> {
  try {
    if (client) {
      if ((await client.updateToken(5)) && setToken !== null) {
        setToken(client.token ?? null);
        logger.log('successfully refreshed token');
      } else {
        logger.logError('unable to refresh token');
      }
    }
  } catch (err: unknown) {
    logger.logError(err);
  }
}

export const refreshToken = debounce(refresh, 500);
