import { createContext, useEffect, useState } from "react"
import Keycloak, { KeycloakProfile } from "keycloak-js"

interface AuthProviderProps {
  children: React.ReactNode
}

interface AuthContextType {
  keycloak: Keycloak | null,
  userProfile: KeycloakProfile | undefined
}

export const AuthContext = createContext<AuthContextType | null>(null)

function AuthProvider ({ children }: AuthProviderProps) {
  const [keycloak, setKeycloak] = useState<Keycloak | null>(null)
  const [userProfile, setUserProfile] = useState<KeycloakProfile>()

  useEffect(() => {
    // Retrieve information of authenticated user
    const fetchUserProfile = async (client: Keycloak) => {
      const fetchedUserProfile = await client.loadUserProfile()
      setUserProfile(fetchedUserProfile)
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
        fetchUserProfile(client)
      }
    }

    initializeKeycloak()
  }, [])

  return (
    <AuthContext.Provider value={{ keycloak, userProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider