import React, { memo } from 'react';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  collectionHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: '0 auto',
    width: '1000px',
    border: '0.2px solid #D8D8D8',
    boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.1)',
    borderRadius: '4px',
  },
  collectionImage: {
    width: '500px',
    height: '400px',
    objectFit: 'cover',
    borderRadius: '4px 0px 0px 4px',
  },
  descriptionWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '500px',
    height: '400px',
    background: '#FFF',
    borderRadius: '0px 4px 4px 0px',
  },
  title: {
    marginTop: '85px',
    fontFamily: 'Bodoni Moda, serif',
    fontWeight: 700,
    fontSize: '28px',
    lineHeight: '33px',
    letterSpacing: '1px',
    color: '#000000',
  },
  bottomLine: {
    marginTop: '20px',
    borderBottom: '0.5px solid #D8D8D8',
    width: '300px',
  },
  description: {
    fontFamily: 'Bodoni Moda, serif',
    fontWeight: 400,
    fontSize: '20px',
    lineHeight: '30px',
    letterSpacing: '0.5px',
    color: '#000000',
    width: '312px',
    textAlign: 'center',
    marginTop: '24px',
    maxHeight: '92px',
    overflow: 'hidden',
  },
  linkButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '217px',
    height: '48px',
    marginTop: '35px',
    background: '#F2644E',
    borderRadius: '10px',
  },
  linkUrl: {
    fontFamily: 'Campton, sans serif',
    fontWeight: 700,
    fontSize: '14px',
    color: '#FFFFFF',
    textDecoration: 'none',
  },
});

function CollectionHeaderWrapper({
  imageUrl,
  title,
  description,
  linkUrl,
  buttonText,
}) {
  const classes = useStyles();

  return (
    <div className={classes.collectionHeader}>
      <img src={imageUrl} className={classes.collectionImage} alt='no logo' />
      <div className={classes.descriptionWrapper}>
        <Typography className={classes.title}>{title}</Typography>
        <div className={classes.bottomLine} />
        <Typography className={classes.description}>{description}</Typography>
        {buttonText && (
          <a href={linkUrl} className={classes.linkUrl}>
            <div className={classes.linkButton}>{buttonText}</div>
          </a>
        )}
      </div>
    </div>
  );
}

export default memo(CollectionHeaderWrapper);
