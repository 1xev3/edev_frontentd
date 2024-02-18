import Cookies from 'js-cookie';
import axios from 'axios';

export default new class Auth {
  constructor() {
    this.API_URL = process.env.API_URL;
  }

  parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
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

  register(email, password, nickname) {
    const url = `${this.API_URL}/auth/register`;

    return axios.post(url, {
      email:email,
      password:password,
      nickname:nickname
    }).then((response) => {
      this.login(email, password);
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