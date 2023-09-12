import AuthGuard from '@/router/guards/GuardAuth'
import VisitorGuard from '@/router/guards/GuardVisitor'

const paths = [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "FirstPack" */ '@/views/Login.vue'),
    beforeEnter: VisitorGuard,
    meta: {
      layout: 'auth',
    },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "SecondPack" */ '@/views/Dashboard.vue'),
    beforeEnter: AuthGuard,
    meta: {
      layout: 'dashboard',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "FirstPack" */ '@/views/404.vue'),
    meta: {
      layout: 'empty',
    },
  },
]
export default paths
