import Authorization from '@/utils/authorization'

const GuardVisitor = (to, from, next) => {
  const authorization = new Authorization()

  if (!authorization.isAuthenticated()) {
    return next()
  }
  return next({ path: '/dashboard' })
}

export default GuardVisitor
