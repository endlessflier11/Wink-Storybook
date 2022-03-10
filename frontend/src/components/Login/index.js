import React, { memo, forwardRef, useState, useEffect } from 'react';
import classNames from 'classnames';
import { Dialog, Fade, Typography, useMediaQuery } from '@material-ui/core';

import AuthService from '../../services/auth.service';
import SignUp from './SignUp';
import { StyledButton } from '../styled';
import {
  primaryFont as primaryFontData,
  primaryColor as primaryColorData,
} from '../../data/common';
import { validateEmail } from '../../utils/dataProcessing';
import { useStyles } from './styles';

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />;
});

function Login(props) {
  const primaryFont = props.theme?.primaryFont || primaryFontData;
  const primaryColor = props.theme?.primaryColor || primaryColorData;
  const isMobile = useMediaQuery('(max-width:600px)');
  const classes = useStyles({ isMobile, primaryFont, primaryColor });

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [invalidUser, setInvalidUser] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);

  useEffect(() => {
    // reset login status
    AuthService.logout();
  }, []);

  const internButtonStyle = {
    ...primaryFont,
    fontSize: '15px',
    background: primaryColor,
    borderRadius: '10px',
    height: '48px',
    boxShadow: 'none',
    '&:hover': {
      background: primaryColor,
      filter: 'brightness(0.8)',
    },
  };

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
    setInvalidUser(false);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
    setInvalidUser(false);
  };

  const handleLogin = async () => {
    if (!validateEmail(username)) {
      setUsername('');
      setPassword('');
      setInvalidUser(true);
      return;
    }
    if (username && password) {
      if (!(await AuthService.login(username, password))) {
        setUsername('');
        setPassword('');
        setInvalidUser(true);
      }
    }
  };

  const handleForgotPassword = () => {};

  const handleCreateAccount = () => {
    setOpenSignup(true);
  };

  if (openSignup) {
    return <SignUp internButtonStyle={internButtonStyle} {...props} />;
  }

  return (
    <Dialog
      open={true}
      classes={{ paper: classes.paper }}
      BackdropProps={{ style: { background: '#F1F4F9' } }}
      TransitionComponent={Transition}
      maxWidth='md'
    >
      <div className={classes.container}>
        <div className={classes.logoContainer}>
          <img src={'/assets/images/black_heart.png'} alt='No Logo' />
          <img src={'/assets/images/dearduck_logo.png'} alt='No Logo' />
        </div>
        <div className={classes.inputContainer}>
          <input
            name='username'
            type='email'
            placeholder={invalidUser ? 'Invalid username' : 'username'}
            className={classNames(
              classes.inputField,
              invalidUser && classes.invalidInput
            )}
            required
            maxLength={128}
            onChange={handleChangeUsername}
            value={invalidUser ? '' : username}
          />
          <input
            name='password'
            type='password'
            placeholder={invalidUser ? 'Invalid password' : 'password'}
            className={classNames(
              classes.inputField,
              invalidUser && classes.invalidInput
            )}
            style={{ marginTop: '12px' }}
            required
            maxLength={128}
            onChange={handleChangePassword}
            value={invalidUser ? '' : password}
          />
          <StyledButton
            fullWidth
            variant='contained'
            color='primary'
            style={{
              ...internButtonStyle,
              marginTop: '27px',
              background: '#464545',
            }}
            onClick={handleLogin}
          >
            LOGIN
          </StyledButton>
          <Typography
            className={classes.forgotLabel}
            style={{ marginTop: '8px' }}
            onClick={handleForgotPassword}
          >
            Forgot password?
          </Typography>
          <StyledButton
            fullWidth
            variant='contained'
            color='primary'
            style={{ ...internButtonStyle, marginTop: '37px' }}
            onClick={handleCreateAccount}
          >
            CREATE ACCOUNT
          </StyledButton>
        </div>
      </div>
    </Dialog>
  );
}

export default memo(Login);
