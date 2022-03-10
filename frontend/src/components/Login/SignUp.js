import React, { memo, forwardRef, useState } from 'react';
import { isEqual } from 'lodash';
import classNames from 'classnames';
import { Dialog, Fade, useMediaQuery } from '@material-ui/core';

import AuthService from '../../services/auth.service';
import Internship from './Internship';
import { StyledButton } from '../styled';
import { validateEmail } from '../../utils/dataProcessing';
import {
  primaryFont as primaryFontData,
  primaryColor as primaryColorData,
} from '../../data/common';
import { useStyles } from './styles';

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />;
});

function SignUp({ ...props }) {
  const primaryFont = props.theme?.primaryFont || primaryFontData;
  const primaryColor = props.theme?.primaryColor || primaryColorData;

  const isMobile = useMediaQuery('(max-width:600px)');
  const classes = useStyles({ isMobile, primaryFont, primaryColor });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [openInternship, setOpenInternship] = useState(false);
  const [isInvalidEmail, setIsInvalidEmail] = useState(false);
  const [isInvalidPassword, setIsInvalidPassword] = useState(false);

  const checkUsername = async (username) => {
    if (await AuthService.checkUsername(username)) {
      setOpenInternship(true);
    } else {
      setEmail('');
      setIsInvalidEmail(true);
    }
  };

  const handleSignup = () => {
    if (!validateEmail(email)) {
      setEmail('');
      setIsInvalidEmail(true);
      return;
    }
    if (password.length === 0 || !isEqual(password, confirmPassword)) {
      setConfirmPassword('');
      setIsInvalidPassword(true);
      return;
    }

    checkUsername(email);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleFocusEmail = (e) => {
    setIsInvalidEmail(false);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleFocusPassword = (e) => {
    setIsInvalidPassword(false);
  };

  const handleChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  if (openInternship) {
    return <Internship {...props} username={email} password={password} />;
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
            key='sign-up-email'
            name='email'
            type='email'
            placeholder={isInvalidEmail ? 'Invalid email' : 'email address'}
            className={classNames(
              classes.inputField,
              isInvalidEmail && classes.invalidInput
            )}
            required
            maxLength={128}
            onChange={handleChangeEmail}
            onFocus={handleFocusEmail}
            value={email}
          />
          <input
            key='sign-up-password'
            name='password'
            type='password'
            placeholder={
              isInvalidPassword ? 'Wrong password' : 'create a password'
            }
            className={classNames(
              classes.inputField,
              isInvalidPassword && classes.invalidInput
            )}
            style={{ marginTop: '12px' }}
            required
            maxLength={128}
            onChange={handleChangePassword}
            onFocus={handleFocusPassword}
            value={password}
          />
          <input
            name='confirm'
            type='password'
            placeholder={
              isInvalidPassword ? 'Wrong password' : 'confirm your password'
            }
            className={classNames(
              classes.inputField,
              isInvalidPassword && classes.invalidInput
            )}
            style={{ marginTop: '12px' }}
            required
            maxLength={128}
            onChange={handleChangeConfirmPassword}
            onFocus={handleFocusPassword}
            value={confirmPassword}
          />
          <StyledButton
            fullWidth
            variant='contained'
            color='primary'
            style={{ ...props.internButtonStyle, marginTop: '46px' }}
            onClick={handleSignup}
          >
            SIGN UP
          </StyledButton>
        </div>
      </div>
    </Dialog>
  );
}

export default memo(SignUp);
