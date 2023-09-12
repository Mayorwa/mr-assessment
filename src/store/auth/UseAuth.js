import { defineStore } from 'pinia'
import {
  getLoggedInUser,
  login,
    verifyOtp,
} from '@/services/AuthService'
import Authorization from '@/utils/Authorization'

export const useAuth = defineStore({
  id: 'auth',
  state: () => ({
    isAuthenticated: false,
    userInfo:{
      email: '',
      name: 'Mayorwa',
    },
    isUserError:false,
    isUserLoading:false,
  }),
  actions: {
    handleLogin(payload) {
      return new Promise((resolve, reject) => {
        login(payload)
          .then(_ => {
            this.isUserError = false
            resolve('Login Successful')
          })
          .catch(error => {
            console.log(error)
            this.isUserError = true
            reject(error)
          })
      })
    },
    handleVerifyOtp(payload) {
      return new Promise((resolve, reject) => {
        verifyOtp(payload)
          .then(response => {
            this.isUserError = false
            const authorization = new Authorization()
            const { data } = response.data
            authorization.setUserDetail(data)
            resolve(data)
          })
          .catch(error => {
            this.isUserError = true
            reject(error)
          })
      })
    },
    handleGetLoggedInUser() {
      return new Promise((resolve, reject) => {
        this.isUserLoading = true
        getLoggedInUser()
          .then(response => {
            const { data } = response.data
            this.isUserError = false
            this.userInfo = data.user
            resolve(data)
          })
          .catch(error => {
            this.isUserError = true
            reject(error)
          })
          .finally(() => {
            this.isUserLoading = false
          })
      })
    },
  },
})
