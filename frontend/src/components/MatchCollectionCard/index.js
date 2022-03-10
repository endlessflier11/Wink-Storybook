import React, { memo } from 'react';
import classNames from 'classnames';
import { makeStyles, Typography } from '@material-ui/core';
import { isEmpty } from 'lodash';

const useStyles = makeStyles({
  collectionCard: {
    display: 'flex',
    flexDirection: 'column',
  },
  halfImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    filter: 'brightness(0.8)',
  },
  collectionRow: ({ height }) => ({
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    height: height,
    marginBottom: '1px',
  }),
  sectionWrapper: ({ width, height }) => ({
    position: 'relative',
    display: 'flex',
    width: width / 2,
    height: height,
  }),
  leftEdge: {
    borderTopLeftRadius: '4px',
    borderBottomLeftRadius: '4px',
    marginRight: '1px',
  },
  rightEdge: {
    borderTopRightRadius: '4px',
    borderBottomRightRadius: '4px',
  },
  title: {
    fontFamily: 'Bodoni Moda, serif',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '16px',
    letterSpacing: '1px',
    color: '#464545',
    marginTop: '13px',
  },
  description: {
    fontFamily: 'Campton, sans serif',
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '16px',
    letterSpacing: '1px',
    color: '#979797',
    marginTop: '6px',
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
    textDecoration: 'underline',
    zIndex: 999,
    '&:hover': {
      filter: 'brightness(0.9)',
      cursor: 'pointer',
    },
  },
  vsLabel: {
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
  },
  emptyView: ({ width, height }) => ({
    width,
    height,
  }),
});

function MatchCollectionCard({ collection, width, height, onClickCollection }) {
  const classes = useStyles({ width, height });

  if (!collection || isEmpty(collection)) {
    return <div className={classes.emptyView}></div>;
  }

  const drawHalfCollection = (collection, childStyle) => {
    return (
      <div
        className={classNames(classes.sectionWrapper, childStyle)}
        onClick={() => onClickCollection && onClickCollection(collection.id)}
      >
        <img
          src={collection.image}
          className={classNames(classes.halfImage, childStyle)}
          alt='No collection'
        />
        <Typography className={classes.sectionTitle}>
          {collection.name}
        </Typography>
      </div>
    );
  };

  return (
    <div>
      <div className={classes.collectionRow}>
        {drawHalfCollection(collection.match1 || {}, classes.leftEdge)}
        {drawHalfCollection(collection.match2 || {}, classes.rightEdge)}
        <Typography className={classes.vsLabel}>VS</Typography>
      </div>
      <Typography className={classes.title}>{collection.title}</Typography>
      <Typography className={classes.description}>
        {collection.description}
      </Typography>
    </div>
  );
}

export default memo(MatchCollectionCard);
