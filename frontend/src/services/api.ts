import axios from "axios";
import { getCookie } from "cookies-next"

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  }
})

const getCookieToken = () => {
  const token = getCookie("vortex-auth-token")
  if (token) return token
  return null
}

api.interceptors.request.use(config => {
  const token = getCookieToken()
  if (token) config.headers.Authorization = `Bearer ${token}`

  return config
})


export default api
