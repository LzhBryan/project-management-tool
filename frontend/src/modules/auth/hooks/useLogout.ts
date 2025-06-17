import { authAxios } from "@core/lib/axios"
import { useNavigate } from "@tanstack/react-router"
import { HttpStatusCode } from "axios"

export function useLogout() {
  const navigate = useNavigate()

  // TODO: catch and handle error properly
  async function logout() {
    try {
      const response = await authAxios.post("api/auth/logout")
      if (response.status === HttpStatusCode.NoContent) {
        navigate({ to: "/login" })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return logout
}
