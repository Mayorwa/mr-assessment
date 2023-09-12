import Authorization from '@/utils/authorization'

const authorization = new Authorization()

// Add bearer token to request header
const addTokenInterceptor = (config) => {
  const token = authorization.token()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}
// reject interceptor
const rejectErrorInterceptor = (error) => Promise.reject(error)

export { addTokenInterceptor, rejectErrorInterceptor }
