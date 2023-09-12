import Authorization from '@/utils/authorization'

export default (to, from, next) => {
  const authorization = new Authorization()
  if (authorization.isAuthenticated()) {
    next()
  } else {
    next({ path: '/login' })
  }
}
