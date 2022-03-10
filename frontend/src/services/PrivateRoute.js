import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthService from './auth.service';
import PropsService from './props.service';

export const PrivateRoute = ({ component: Component, winkProps, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem('user') ? (
        <Component
          {...props}
          {...winkProps}
          currentUser={AuthService.getCurrentUser()}
          params={PropsService.params()}
          onChangeParams={PropsService.onChangeParams}
        />
      ) : (
        <Redirect
          to={{ pathname: '/login', state: { from: props.location } }}
        />
      )
    }
  />
);
