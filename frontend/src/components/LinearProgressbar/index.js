import React from 'react';
import { Box, LinearProgress, Typography } from '@material-ui/core';

function LinearProgressbar(props) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: 'calc(100% - 44px)',
        margin: '0px 20px 0px 24px',
      }}
    >
      <Box sx={{ width: '100%', mr: 2 }}>
        <LinearProgress
          variant='determinate'
          color='primary'
          value={Math.round((100 * props.value) / props.maxValue)}
          classes={{
            colorPrimary: props.colorPrimary,
            barColorPrimary: props.barColorPrimary,
          }}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography
          variant='body2'
          color='text.secondary'
          style={{ ...props.primaryFont, fontSize: 8, fongWeight: 700 }}
        >{`${props.value} OF ${props.maxValue}`}</Typography>
      </Box>
    </Box>
  );
}

export default LinearProgressbar;
