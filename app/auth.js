import Cookies from 'js-cookie';

export default new class Auth {
  constructor() {
    this.API_URL = process.env.API_URL;
  }

  async login(email, pass) {

    const url = `${this.API_URL}/auth/jwt/login`;

    const data = {
      username: email,
      password: pass,   
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "accept": "application/json"
      },
      body: new URLSearchParams(data).toString(),
    };

    const response = await fetch(url, options)

    if (response.ok) {
      console.log("Logged in!");
      const data = await response.json();
      const token = data.access_token;
      Cookies.set('token', token);
      return token;
    } else {
      const data = await response.text();
      console.log(data);
      throw new Error('Unable to authorize');
    }
  }

  async logout() {
    const url = `${this.API_URL}/auth/jwt/logout`;
    const response = await this.makeAuthorizedRequest(url, 'POST');
    if (response.ok) {
      return true
    } 
    return false
  }

  async checkLogin() {
    try {
      await this.getUserData()
    } catch (error) {
      return false
    }
    return true
  }

  async getAuthToken() {
    const token = Cookies.get('token');
    if (!token) {
      throw new Error('No access token');
    }
    return token;
  }

  async makeAuthorizedRequest(url, method, body) {
    const token = await this.getAuthToken();
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${token}`);

    const options = {
      method,
      headers,
      body: JSON.stringify(body),
    };

    return await fetch(url, options);
  }

  async getUserData() {
    const url = `${this.API_URL}/users/me`;
    const response = await this.makeAuthorizedRequest(url, 'GET');
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error('Cannot get user data');
    }
  }

  async updateUserProfile(data) {
    const url = `${this.API_URL}/users/me`;
    const response = await this.makeAuthorizedRequest(url, 'PUT', data);
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error('Не удалось обновить профиль пользователя');
    }
  }
}