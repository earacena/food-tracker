import { createContext, useEffect, useState } from "react"
import Keycloak, { KeycloakProfile } from "keycloak-js"

interface AuthProviderProps {
  children: React.ReactNode
}

interface AuthContextType {
  keycloak: Keycloak | null,
  userInfo: KeycloakProfile | undefined
}

export const AuthContext = createContext<AuthContextType | null>(null)

function AuthProvider ({ children }: AuthProviderProps) {
  const [keycloak, setKeycloak] = useState<Keycloak | null>(null)
  const [userInfo, setUserInfo] = useState<KeycloakProfile>()

  useEffect(() => {
    // Retrieve information of authenticated user
    const fetchUserKeycloakProfile = async (client: Keycloak) => {
      const fetchedUserProfile = await client.loadUserProfile()
      setUserInfo(fetchedUserProfile)
    }

    // Initialize Keycloak and authenticate user
    const initializeKeycloak = async () => {
      const client = new Keycloak({
        url: import.meta.env.VITE_KEYCLOAK_URL,
        realm: import.meta.env.VITE_KEYCLOAK_REALM,
        clientId: import.meta.env.VITE_KEYCLOAK_CLIENT,
      })

      await client.init({
        onLoad: 'login-required',
        checkLoginIframe: false,
      })

      setKeycloak(client)
      
      if (client.authenticated) {
        fetchUserKeycloakProfile(client)
      }
    }

    initializeKeycloak()
  }, [])

  return (
    <AuthContext.Provider value={{ keycloak, userInfo }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider