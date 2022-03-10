import React, { memo, forwardRef, useState } from 'react';
import { Dialog, Fade, useMediaQuery } from '@material-ui/core';

import { StyledButton } from '../styled';
import InputUserName from './InputUserName';
import {
  primaryFont as primaryFontData,
  primaryColor as primaryColorData,
} from '../../data/common';
import { useStyles } from './styles';

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />;
});

function Internship({ ...props }) {
  const primaryFont = props.theme?.primaryFont || primaryFontData;
  const primaryColor = props.theme?.primaryColor || primaryColorData;

  const isMobile = useMediaQuery('(max-width:600px)');
  const classes = useStyles({ isMobile, primaryFont, primaryColor });
  const [openInputUsername, setOpenInputUsername] = useState(false);

  const handleGoUserInput = () => {
    setOpenInputUsername(true);
  };

  if (openInputUsername) {
    return <InputUserName {...props} />;
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
        <div className={classes.logoContainer} style={{ margin: '32px 10px' }}>
          <img
            src={'/assets/images/internship_bg.png'}
            width={'100%'}
            alt='No Logo'
          />
        </div>
        <div
          className={classes.inputContainer}
          style={{ width: 'calc(100% - 64px)', marginTop: 0, padding: 0 }}
        >
          <StyledButton
            fullWidth
            variant='contained'
            color='primary'
            style={{ ...props.internButtonStyle }}
            onClick={handleGoUserInput}
          >
            GET STARTED!
          </StyledButton>
        </div>
      </div>
    </Dialog>
  );
}

export default memo(Internship);
