import axios from 'axios'
import { addTokenInterceptor, rejectErrorInterceptor } from './interceptors.js'

/**
 * @description - creates an axios instance, that receives an object that contains
 * configurations to be used to make api calls
 * the configs set are the baseURL which is the base URL for the network requests
 * stored away in the *.env* file and a timeout for network request set by default to 2500ms
 * here's why {@link https://medium.com/@masnun/handling-timeout-in-axios-479269d83c68}
 *
 * Interceptors can be added to responses and request, this can be used to handle
 * general errors, and handling session timeouts etc
 */
const http = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  timeout: 90000,
})

http.interceptors.request.use(addTokenInterceptor, rejectErrorInterceptor)
export default http
