import React, { memo, forwardRef, useState } from 'react';
import classNames from 'classnames';
import { Dialog, Fade, Typography, useMediaQuery } from '@material-ui/core';

import AuthService from '../../services/auth.service';
import { StyledButton } from '../styled';
import LinearProgressbar from '../LinearProgressbar';
import {
  primaryFont as primaryFontData,
  primaryColor as primaryColorData,
} from '../../data/common';
import { useStyles } from './styles';

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />;
});

function InputGender({ ...props }) {
  const primaryFont = props.theme?.primaryFont || primaryFontData;
  const primaryColor = props.theme?.primaryColor || primaryColorData;

  const isMobile = useMediaQuery('(max-width:600px)');
  const classes = useStyles({ isMobile, primaryFont, primaryColor });

  const [gender, setGender] = useState('male');

  const handleClickGender = (value) => {
    setGender(value);
  };

  const handleRegister = async () => {
    if (
      !(await AuthService.register(
        props.username,
        props.password,
        props.birthday,
        gender,
        props.zipcode,
        props.avatar,
        props.firstName,
        props.lastName
      ))
    ) {
      console.log('register error');
    }
  };

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
            Gender you identify with?
          </Typography>
        </div>
        <div className={classes.divideLine} />
        <div className={classes.inputContainer} style={{ marginTop: 40 }}>
          <div
            className={classNames(
              classes.unselectedGender,
              gender === 'male' && classes.selectedGender
            )}
            onClick={() => handleClickGender('male')}
          >
            <Typography className={classes.genderLabel}> Male </Typography>
          </div>
          <div
            className={classNames(
              classes.unselectedGender,
              gender === 'female' && classes.selectedGender
            )}
            onClick={() => handleClickGender('female')}
          >
            <Typography className={classes.genderLabel}> Female </Typography>
          </div>
          <div
            className={classNames(
              classes.unselectedGender,
              gender === 'other' && classes.selectedGender
            )}
            onClick={() => handleClickGender('other')}
          >
            <Typography className={classes.genderLabel}> Other </Typography>
          </div>
        </div>
        <div className={classes.bottomContainer}>
          <div className={classes.footer}>
            <LinearProgressbar
              value={5}
              maxValue={5}
              primaryFont={primaryFont}
              colorPrimary={classes.colorPrimary}
              barColorPrimary={classes.barColorPrimary}
            />
          </div>
          <StyledButton
            fullWidth
            variant='contained'
            color='primary'
            style={{ ...props.internButtonStyle, borderRadius: 0 }}
            onClick={handleRegister}
          >
            FINISH!
          </StyledButton>
        </div>
      </div>
    </Dialog>
  );
}

export default memo(InputGender);
