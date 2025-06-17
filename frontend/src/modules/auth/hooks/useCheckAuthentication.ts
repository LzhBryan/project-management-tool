import axios, { isAxiosError } from "axios"
import { useEffect, useState } from "react"

export function useCheckAuthentication() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function bla() {
      try {
        const response = await axios.get("api/users")
        if (response.status === 200) {
          setIsUserAuthenticated(true)
        }
      } catch (error) {
        if (!isAxiosError(error)) {
          console.log(error)
          setIsUserAuthenticated(false)
          return
        }

        if (error.response?.status === 401) {
          // try to refresh token once if it's the case of access token is expired
          refreshJwtToken()
        }
      } finally {
        setIsLoading(false)
      }
    }

    async function refreshJwtToken() {
      console.log("Refreshing JWT tokens")
      try {
        const response = await axios.get("api/auth/refresh")
        if (response.status === 200) {
          setIsUserAuthenticated(true)
          return
        }
      } catch (error) {
        console.log(error)
        setIsUserAuthenticated(false)
        return
      }
      setIsUserAuthenticated(false)
    }

    bla()
  }, [])

  return { isLoading, isUserAuthenticated }
}
