import { SetStateAction, createContext, useEffect, useState } from "react"
import Keycloak from "keycloak-js"

interface AuthProviderProps {
  children: React.ReactNode
}

interface AuthContextType {
  keycloak: Keycloak | null,
  isAuth: boolean,
  setAuth: React.Dispatch<SetStateAction<boolean>>
}

export const AuthContext = createContext<AuthContextType | null>(null)

function AuthProvider ({ children }: AuthProviderProps) {
  const [isAuth, setAuth] = useState<boolean>(false)
  const [keycloak, setKeycloak] = useState<Keycloak | null>(null)

  useEffect(() => {
    const initializeKeycloak = async () => {
      const client = new Keycloak({
        url: import.meta.env.VITE_KEYCLOAK_URL,
        realm: import.meta.env.VITE_KEYCLOAK_REALM,
        clientId: import.meta.env.VITE_KEYCLOAK_CLIENT,
      })

      const response = await client.init({
        onLoad: 'login-required',
        checkLoginIframe: false,
      })

      setAuth(response)
      setKeycloak(client)
    }

    initializeKeycloak()
  }, [])

  return (
    <AuthContext.Provider value={{keycloak, isAuth, setAuth}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider