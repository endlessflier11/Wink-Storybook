import React, { memo, forwardRef, useState, useEffect } from 'react';
import { Dialog, Fade, Typography, useMediaQuery } from '@material-ui/core';

import { StyledButton } from '../styled';
import InputGender from './InputGender';
import LinearProgressbar from '../LinearProgressbar';
import {
  primaryFont as primaryFontData,
  primaryColor as primaryColorData,
} from '../../data/common';
import { useStyles } from './styles';

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />;
});

function InputZipcode({ ...props }) {
  const primaryFont = props.theme?.primaryFont || primaryFontData;
  const primaryColor = props.theme?.primaryColor || primaryColorData;

  const isMobile = useMediaQuery('(max-width:600px)');
  const classes = useStyles({ isMobile, primaryFont, primaryColor });

  const [zipcode, setZipcode] = useState('');
  const [enableNextButton, setEnableNextButton] = useState(false);
  const [openGenderPopup, setOpenGenderPopup] = useState(false);

  useEffect(() => {
    if (zipcode.length > 4) {
      setEnableNextButton(true);
    }
  }, [zipcode]);

  const handleGotoGender = () => {
    setOpenGenderPopup(true);
  };

  const handleChangeZipcode = (e) => {
    setZipcode(e.target.value);
  };

  if (openGenderPopup) {
    return <InputGender {...props} zipcode={zipcode} />;
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
          <Typography className={classes.titleLabel}>Zip code?</Typography>
        </div>
        <div className={classes.divideLine} />
        <div className={classes.inputContainer} style={{ marginTop: 40 }}>
          <input
            name='zip_code'
            type='number'
            placeholder={'#####'}
            className={classes.inputField}
            required
            maxLength={12}
            onChange={handleChangeZipcode}
            value={zipcode}
          />
        </div>
        <div className={classes.bottomContainer}>
          <div className={classes.footer}>
            <LinearProgressbar
              value={4}
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
              onClick={handleGotoGender}
            >
              NEXT
            </StyledButton>
          )}
        </div>
      </div>
    </Dialog>
  );
}

export default memo(InputZipcode);
