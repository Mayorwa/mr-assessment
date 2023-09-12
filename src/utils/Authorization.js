export default class Authorization {
  isAuthenticated() {
    return !!this.token()
  }

  token() {
    const userDetails = JSON.parse(sessionStorage.getItem('user'))
    return userDetails ? userDetails.token : '';
  }

  setUserDetail(userDetail) {
    const userDetailsJSON = JSON.stringify(userDetail);
    sessionStorage.setItem('user', userDetailsJSON)
  }

  getUserDetails() {
    const userDetailsJSON = sessionStorage.getItem('user')
    return JSON.parse(userDetailsJSON);
  }
}
