import axios from 'axios';
import { resolve } from 'croppie';
import { split } from 'lodash';
import { history } from './history';

const API_URL = 'https://fame-cfy.herokuapp.com';

class AuthService {
  login(username, password) {
    return new Promise((resolve) => {
      axios
        .post(API_URL + '/login', {
          username,
          password,
        })
        .then((response) => {
          const user = response.data;
          if (user.token) {
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', user.token);
            history.push('/');
            window.location.reload();
          }
          resolve(user);
        })
        .catch((err) => resolve(null));
    });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(
    username,
    password,
    birth_day,
    gender,
    zip_code,
    avatar,
    first_name,
    last_name
  ) {
    return new Promise((resolve) => {
      axios
        .post(API_URL + '/users', {
          username,
          password,
          birth_day,
          gender,
          zip_code,
          avatar,
          first_name,
          last_name,
        })
        .then(() => {
          history.push('/login');
          window.location.reload();
        })
        .catch(() => {
          resolve(null);
        });
    });
  }

  getCurrentUser() {
    const data = JSON.parse(localStorage.getItem('user'));
    const user = {
      id: data.id,
      firstName: data.first_name,
      lastName: data.last_name,
      avatar: data.avatar,
      birthday: data.birth_day,
      gender: data.gender,
      zipcode: data.zip_code,
    };
    return user;
  }

  checkUsername(username) {
    return new Promise((resolve) => {
      axios
        .post(API_URL + '/check_if_username_exists', { username })
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          resolve(null);
        });
    });
  }
}

export default new AuthService();
