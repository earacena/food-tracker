import { type Logger } from "@/utils/Logger";
import Keycloak from "keycloak-js";
import { debounce } from 'lodash'

async function refresh (keycloak: Keycloak | null | undefined, logger: Logger) {
  if (keycloak) {
    if (await keycloak.updateToken(5)) {
      logger.log('successfully refreshed token')
    } else {
      logger.log('unable to refresh token')
    }
  }
}

export const refreshToken = debounce(refresh, 500)

