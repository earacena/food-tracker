import type Keycloak from 'keycloak-js';
import { debounce } from 'lodash';
import { type Logger } from '@/utils/logger';

async function refresh(
  keycloak: Keycloak | null | undefined,
  logger: Logger,
): Promise<void> {
  if (keycloak) {
    if (await keycloak.updateToken(5)) {
      logger.log('successfully refreshed token');
    } else {
      logger.log('unable to refresh token');
    }
  }
}

export const refreshToken = debounce(refresh, 500);
