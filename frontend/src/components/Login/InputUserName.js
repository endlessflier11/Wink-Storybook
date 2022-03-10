import React, { memo, forwardRef, useState, useEffect } from 'react';
import classNames from 'classnames';
import { Dialog, Fade, Typography, useMediaQuery } from '@material-ui/core';

import { StyledButton } from '../styled';
import LinearProgressbar from '../LinearProgressbar';
import InputBirthday from './InputBirthday';
import {
  primaryFont as primaryFontData,
  primaryColor as primaryColorData,
} from '../../data/common';
import { useStyles } from './styles';

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />;
});

function InputUserName({ ...props }) {
  const primaryFont = props.theme?.primaryFont || primaryFontData;
  const primaryColor = props.theme?.primaryColor || primaryColorData;

  const isMobile = useMediaQuery('(max-width:600px)');
  const classes = useStyles({ isMobile, primaryFont, primaryColor });

  const [usernameAvaliable, setUsernameAvaliable] = useState(false);
  const [invalidUsername, setInvalidUsername] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [enableNextButton, setEnableNextButton] = useState(false);

  useEffect(() => {
    if (firstName.length > 0 && lastName.length > 0) {
      setEnableNextButton(true);
    }
  }, [firstName, lastName]);

  const handleGotoBirthday = () => {
    setUsernameAvaliable(true);
  };

  const handleChangeFirstName = (e) => {
    setFirstName(e.target.value);
    setInvalidUsername(false);
    if (e.target.value === '') setEnableNextButton(false);
  };

  const handleChangeLastName = (e) => {
    setLastName(e.target.value);
    if (e.target.value === '') setEnableNextButton(false);
  };

  if (usernameAvaliable) {
    return (
      <InputBirthday {...props} firstName={firstName} lastName={lastName} />
    );
  }

  return (
    <Dialog
      open={true}
      classes={{ paper: classes.advancedPaper }}
      BackdropProps={{ style: { background: '#F1F4F9' } }}
      TransitionComponent={Transition}
      maxWidth='md'
    >
      <div className={classes.container}>
        <div
          className={classes.logoContainer}
          style={{ marginTop: 31, flexDirection: 'column' }}
        >
          <img src={'/assets/images/black_heart.png'} alt='No Logo' />
          <Typography className={classes.titleLabel}>
            What's your name?
          </Typography>
        </div>
        <div className={classes.divideLine} />
        <div className={classes.inputContainer} style={{ marginTop: 40 }}>
          <input
            name='first_name'
            type='text'
            placeholder={invalidUsername ? 'Invalid username' : 'First name'}
            className={classNames(
              classes.inputField,
              invalidUsername && classes.invalidInput
            )}
            required
            maxLength={128}
            onChange={handleChangeFirstName}
            value={invalidUsername ? '' : firstName}
          />
          <input
            name='last_name'
            type='text'
            placeholder={'Last name'}
            className={classes.inputField}
            style={{ marginTop: 12 }}
            required
            maxLength={128}
            onChange={handleChangeLastName}
            value={invalidUsername ? '' : lastName}
          />
        </div>
        <div className={classes.bottomContainer}>
          <div className={classes.footer}>
            <LinearProgressbar
              value={1}
              maxValue={5}
              primaryFont={primaryFont}
              colorPrimary={classes.colorPrimary}
              barColorPrimary={classes.barColorPrimary}
            />
          </div>
          {enableNextButton && (
            <StyledButton
              fullWidth
              variant='contained'
              color='primary'
              style={{ ...props.internButtonStyle, borderRadius: 0 }}
              onClick={handleGotoBirthday}
            >
              NEXT
            </StyledButton>
          )}
        </div>
      </div>
    </Dialog>
  );
}

export default memo(InputUserName);
