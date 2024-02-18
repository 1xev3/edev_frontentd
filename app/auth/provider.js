import Cookies from 'js-cookie';
import axios from 'axios';

export default new class Auth {
  constructor() {
    this.API_URL = process.env.API_URL;
  }

  login(email, pass) {
    const url = `${this.API_URL}/auth/jwt/login`;

    return axios.post(url, new URLSearchParams({
      username: email,
      password: pass,
    }), {
      timeout: 4000,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "accept": "application/json"
      }
    }).then((response) => {
      console.log("Logged in!");
      const data = response.data;
      const token = data.access_token;
      Cookies.set('token', token);
    })
  }

  logout() {
    return this.makeAuthorizedRequest(`${this.API_URL}/auth/jwt/logout`, 'POST').then((response) => {
      Cookies.remove('token')
    });
  }

  getAuthToken() {
    return Cookies.get('token');
  }

  makeAuthorizedRequest(url, method, body) {
    const token = this.getAuthToken();

    return axios({
      method: method,
      url: url,
      data: body,
      timeout: 4000,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  getUserData() {
    return this.makeAuthorizedRequest(`${this.API_URL}/users/me`, 'GET');
  }

  updateUserProfile(data) {
    return this.makeAuthorizedRequest(`${this.API_URL}/users/me`, 'PUT', data);
  }
}