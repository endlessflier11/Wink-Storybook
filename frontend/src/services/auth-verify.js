import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

const parseTokenTimeout = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

class AuthVerify extends Component {
  constructor(props) {
    super(props);

    props.history.listen(() => {
      const user = JSON.parse(localStorage.getItem('user'));

      if (user) {
        const validateDate = parseTokenTimeout(user.accessToken);

        if (validateDate && validateDate.exp * 1000 < Date.now()) {
          props.logOut();
        }
      }
    });
  }

  render() {
    return <div></div>;
  }
}

export default withRouter(AuthVerify);
