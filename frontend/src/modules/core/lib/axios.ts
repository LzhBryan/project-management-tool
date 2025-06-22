import axios from "axios"

axios.defaults.baseURL = "http://localhost:5000/"
axios.defaults.withCredentials = true
axios.defaults.headers.common["Accept"] = "application/json"

const authAxios = axios.create({})

authAxios.interceptors.response.use(
  response => response,

  async error => {
    const originalRequest = error.config
    let triedRefreshingToken = false

    if (error.response.status === 401 && !triedRefreshingToken) {
      triedRefreshingToken = true
      try {
        await axios.get("/auth/refresh")
        return authAxios(originalRequest)
      } catch (error) {
        console.log(error)
        window.location.replace("/")
      }
    }
    return Promise.reject(error)
  },
)

export { authAxios, axios }

