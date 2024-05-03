//create axios with interceptor and base url
import axios from 'axios'
import { BASE_URL } from '@config/http.ts'

const http = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
})
//interceptor request
http.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)
//interceptor response
http.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  },
)
export default http
