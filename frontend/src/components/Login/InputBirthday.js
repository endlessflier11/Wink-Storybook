import React, { memo, forwardRef, useState } from 'react';
import { Dialog, Fade, Typography, useMediaQuery } from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';

import { StyledButton } from '../styled';
import LinearProgressbar from '../LinearProgressbar';
import UploadPicture from './UploadPicture';
import {
  primaryFont as primaryFontData,
  primaryColor as primaryColorData,
} from '../../data/common';
import { useStyles } from './styles';

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />;
});

function InputBirthday({ ...props }) {
  const primaryFont = props.theme?.primaryFont || primaryFontData;
  const primaryColor = props.theme?.primaryColor || primaryColorData;

  const isMobile = useMediaQuery('(max-width:600px)');
  const classes = useStyles({ isMobile, primaryFont, primaryColor });

  const [enableNextButton, setEnableNextButton] = useState(false);
  const [openUploadPicture, setOpenUploadPicture] = useState(false);
  const [birthday, setBirthday] = useState('');
  const [selectedDate, setDate] = useState(moment());
  const [inputValue, setInputValue] = useState(moment().format('MM/DD/YYYY'));

  const handleGotoUploadPicture = () => {
    setOpenUploadPicture(true);
  };

  const handleDateChange = (date, value) => {
    setDate(date);
    setInputValue(value);

    const re = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
    if (!value || (value !== '' && !value.match(re))) {
      //error
      setEnableNextButton(false);
      return;
    }
    setBirthday(value);
    if (value) setEnableNextButton(true);
  };

  const dateFormatter = (str) => {
    return str;
  };

  if (openUploadPicture) {
    return <UploadPicture {...props} birthday={birthday} />;
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
          <Typography className={classes.titleLabel}>Birthday?</Typography>
        </div>
        <div className={classes.divideLine} />
        <div className={classes.inputContainer} style={{ marginTop: 40 }}>
          <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
            <KeyboardDatePicker
              autoOk={true}
              showTodayButton={true}
              value={selectedDate}
              format='MM/DD/YYYY'
              placeholder='MM/DD/YYYY'
              inputValue={inputValue}
              onChange={handleDateChange}
              rifmFormatter={dateFormatter}
            />
          </MuiPickersUtilsProvider>
        </div>
        <div className={classes.bottomContainer}>
          <div className={classes.footer}>
            <LinearProgressbar
              value={2}
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
              onClick={handleGotoUploadPicture}
            >
              NEXT
            </StyledButton>
          )}
        </div>
      </div>
    </Dialog>
  );
}

export default memo(InputBirthday);
