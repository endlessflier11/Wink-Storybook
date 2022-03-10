import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://fame-cfy.herokuapp.com';

class UserService {
  getProducts(page) {
    return new Promise((resolve) => {
      axios
        .post(API_URL + '/get_products_that_need_ratings', {
          headers: authHeader(),
          page,
        })
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          resolve([]);
        });
    });
  }

  uploadImage(awsRes, blob) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      console.log(awsRes.data.signedRequest);
      console.log(awsRes.data.url);
      xhr.open('PUT', awsRes.data.signedRequest);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          console.log('xhr=', xhr);
          if (xhr.status === 200) {
            console.log('Image uploaded');
          } else {
            alert('Could not upload file.');
            reject('Could not upload file.');
            return;
          }
        }
      };
      xhr.send(blob);
      // console.log(url)
      resolve(awsRes.data.url);
    });
  }

  saveAvatar(filename, blob) {
    return new Promise((resolve) => {
      axios
        .get(API_URL + `/sign-s3?file-name=${filename}&file-type=image/png`)
        .then((response) => {
          const result = this.uploadImage(response, blob);
          resolve(result);
        })
        .catch((err) => {
          console.log('err=', err);
          resolve(null);
        });
    });
  }
}

export default new UserService();
