import http from '@//config/axios'
export const authUrls = {
    LOGIN_URL: 'auth/login',
    LOGGED_IN_USER_URL: 'user/get-logged-in',
    VERIFY_OTP_URL: 'auth/verify-otp',
}

const login = async payload => {
    return await http.post(authUrls.LOGIN_URL, payload)
}

const verifyOtp = async payload => {
    return await http.post(authUrls.VERIFY_OTP_URL, payload)
}

const getLoggedInUser = async () => {
    return await http.get(authUrls.LOGGED_IN_USER_URL)
}

export { login, verifyOtp, getLoggedInUser }
