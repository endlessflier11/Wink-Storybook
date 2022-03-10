import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import AuthVerify from './services/auth-verify';
import AuthService from './services/auth.service';
import { PrivateRoute } from './services/PrivateRoute';
import { history } from './services/history';

import LoginPage from './pages/LoginPage';
import CuratorsPage from './pages/CuratorsPage';
import InternRankingPage from './pages/InternRankingPage';
import CollectionsPage from './pages/CollectionsPage';
import ProductsPage from './pages/ProductsPage';

export default function AppRouter(props) {
  const logOut = () => {
    AuthService.logout();
  };

  return (
    <>
      <Router history={history}>
        <Switch>
          <PrivateRoute path='/' exact component={InternRankingPage} />
          <PrivateRoute path='/curators' exact component={CuratorsPage} />
          <PrivateRoute path='/collections' exact component={CollectionsPage} />
          <PrivateRoute path='/products' exact component={ProductsPage} />
          <Route path='/login' component={LoginPage} />
          <Redirect from='*' to='/' />
        </Switch>
      </Router>
      <AuthVerify history={history} logOut={logOut} />
    </>
  );
}
