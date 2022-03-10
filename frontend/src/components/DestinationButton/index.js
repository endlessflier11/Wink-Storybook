import React, { memo } from 'react';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  destButtonRoot: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '230px',
    height: '68px',
    background: '#F4F4F4',
    borderRadius: '2px',
  },
  destButtonContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: '16px 20px',
  },
  destinationLabel: {
    fontFamily: 'Bodoni Moda, serif',
    fontSize: '18px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '15px',
    color: '#464545',
  },
  collectionWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  collectionValue: {
    fontFamily: 'Campton, sans serif',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '10px',
    lineHeight: '15px',
    color: '#464545',
  },
  newButton: {
    fontFamily: 'Campton, sans serif',
    fontWeight: 700,
    fontSize: '8px',
    width: '43px',
    height: '20px',
    background: '#FF634A',
    color: '#FFF',
    borderRadius: '130px',
    marginTop: '18px',
    marginRight: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    '&:hover': {
      filter: 'brightness(0.8)',
    },
  },
});

function DestinationButton({ data, onClickCollection }) {
  const classes = useStyles();

  const handleClickNew = () => {
    onClickCollection(data);
  };

  return (
    <div className={classes.destButtonRoot}>
      <div className={classes.destButtonContent}>
        <Typography className={classes.destinationLabel}>
          Destinations
        </Typography>
        <div className={classes.collectionWrapper}>
          <Typography className={classes.collectionValue}>
            {data.collections}
          </Typography>
          <Typography
            className={classes.collectionValue}
            style={{ fontWeight: 400, marginLeft: '5px' }}
          >
            COLLECTIONS
          </Typography>
        </div>
      </div>
      {data.newArrivals && (
        <div
          className={classes.newButton}
          onClick={handleClickNew}
        >{`${data.newArrivals} NEW!`}</div>
      )}
    </div>
  );
}

export default memo(DestinationButton);
