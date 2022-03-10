import React, { memo } from 'react';
import classNames from 'classnames';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  collectionCard: {
    display: 'flex',
    flexDirection: 'column',
  },
  oneImage: ({ width, height }) => ({
    width,
    height,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'cener',
    borderRadius: '4px',
  }),
  quaterImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    filter: 'brightness(0.8)',
  },
  collectionRow: ({ height }) => ({
    display: 'flex',
    flexDirection: 'row',
    height: height / 2,
    marginBottom: '1px',
  }),
  sectionWrapper: ({ width, height }) => ({
    position: 'relative',
    display: 'flex',
    width: width / 2,
    height: height / 2,
  }),
  topLeftEdge: {
    borderTopLeftRadius: '4px',
    marginRight: '1px',
  },
  topRightEdge: {
    borderTopRightRadius: '4px',
  },
  bottomLeftEdge: {
    borderBottomLeftRadius: '4px',
    marginRight: '1px',
  },
  bottomRightEdge: {
    borderBottomRightRadius: '4px',
  },
  logo: {
    width: '100px',
    height: '30px',
    objectFit: 'contain',
    marginTop: '8px',
    marginBottom: '8px',
  },
  title: {
    fontFamily: 'Bodoni Moda, serif',
    fontWeight: 400,
    fontSize: '20px',
    lineHeight: '18px',
    letterSpacing: '1px',
    textDecoration: 'underline',
    color: '#464545',
    cursor: 'pointer',
  },
  sectionTitle: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    inset: 0,
    fontFamily: 'PalmerLakeRegular',
    fontWeight: 400,
    fontSize: '40px',
    letterSpacing: '1px',
    color: '#FFFFFF',
    textDecoration: ({ subtitleUnderline }) => subtitleUnderline && 'underline',
    '&:hover': {
      filter: 'brightness(0.9)',
      cursor: 'pointer',
    },
  },
});

function ShopCollectionCard({
  data,
  width,
  height,
  cols = 1,
  hideSubtitle = false,
  subtitleUnderline = false,
}) {
  const classes = useStyles({ width, height, subtitleUnderline });

  if (cols === 1) {
    return (
      <div className={classes.collectionCard}>
        <div
          className={classes.oneImage}
          style={{
            backgroundImage: `url(${(data.collections[0] || {}).image})`,
          }}
        />
        <img className={classes.logo} src={data.logo} alt='No Logo' />
        <Typography className={classes.title}>{data.title}</Typography>
      </div>
    );
  }

  const drawQuarterItem = (data, childStyle) => {
    return (
      <div className={classes.sectionWrapper}>
        <img
          src={data.image}
          className={classNames(classes.quaterImage, childStyle)}
          alt='No collection'
        />
        {!hideSubtitle && (
          <Typography className={classes.sectionTitle}>{data.title}</Typography>
        )}
      </div>
    );
  };

  if (cols === 4) {
    return (
      <div>
        <div className={classes.collectionRow}>
          {drawQuarterItem(data.collections[0] || {}, classes.topLeftEdge)}
          {drawQuarterItem(data.collections[1] || {}, classes.topRightEdge)}
        </div>
        <div className={classes.collectionRow}>
          {drawQuarterItem(data.collections[2] || {}, classes.bottomLeftEdge)}
          {drawQuarterItem(data.collections[3] || {}, classes.bottomRightEdge)}
        </div>
        <img className={classes.logo} src={data.logo} alt='No Logo' />
        <Typography className={classes.title}>{data.title}</Typography>
      </div>
    );
  }
}

export default memo(ShopCollectionCard);
