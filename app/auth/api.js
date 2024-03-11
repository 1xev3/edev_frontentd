import Cookies from 'js-cookie';
import axios from 'axios';

export default new class Api {
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
    const url = `${this.API_URL}/auth/login`;

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
      Cookies.set('token', response.data.access_token);
    })
  }

  register(email, password, nickname) {
    const url = `${this.API_URL}/auth/register`;

    return axios.post(url, {
      email:email,
      password:password,
      nickname:nickname,
      group_id:0
    }).then((response) => {
      this.login(email, password);
    })
  }

  logout() {
    Cookies.remove('token')
    return this.makeAuthorizedRequest(`${this.API_URL}/auth/logout`, 'POST');
  }

  getAuthToken() {
    return Cookies.get('token');
  }

  checkToken() {
    const token = this.getAuthToken();
    if (!token) {
      return false;
    }

    if (Date.now() >= this.parseJwt(token).exp*1000) {
      return false;
    }

    return true;
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
    return this.makeAuthorizedRequest(`${this.API_URL}/users/me`, 'PATCH', data);
  }


  // sections related
  getSection(id) {
    return this.makeAuthorizedRequest(`${this.API_URL}/todo/sections/${id}`, 'GET');
  }

  getSections() {
    return this.makeAuthorizedRequest(`${this.API_URL}/todo/sections`, 'GET');
  }

  createNewSection(name) {
    const data = {
      'name': name ? name : "New section",
    }
    return this.makeAuthorizedRequest(`${this.API_URL}/todo/sections`, 'POST', data);
  }

  updateSection(sectionID, newName) {
    const data = {
      'name': newName ? newName : "New section",
    }
    return this.makeAuthorizedRequest(`${this.API_URL}/todo/sections/${sectionID}`, 'PUT', data);
  }

  deleteSection(id) {
    return this.makeAuthorizedRequest(`${this.API_URL}/todo/sections/${id}`, 'DELETE');
  }

  //tasks related
  getTasks(section_id) {
    return this.makeAuthorizedRequest(`${this.API_URL}/todo/sections/${section_id}/tasks`, 'GET');
  }

  createNewTask(section_id, task_name) {
    const data = {
      'name': task_name
    }
    return this.makeAuthorizedRequest(`${this.API_URL}/todo/sections/${section_id}/tasks`, 'POST', data);
  }

  updateTask(section_id, task_id, name, description, completed) {
    let data = {};

    name && (data["name"] = name);
    description && (data["description"] = description);
    completed != null && (data["completed"] = completed);

    return this.makeAuthorizedRequest(`${this.API_URL}/todo/sections/${section_id}/tasks/${task_id}`, 'PUT', data);
  }

  deleteTask(section_id, task_id) {
    return this.makeAuthorizedRequest(`${this.API_URL}/todo/sections/${section_id}/tasks/${task_id}`, 'DELETE');
  }
}