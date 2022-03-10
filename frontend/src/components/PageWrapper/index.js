import React, { memo } from 'react';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  pageWrapperRoot: {
    display: 'flex',
    flexDirection: 'column',
    width: '1200px',
    margin: '0 auto',
    marginTop: ({ topOffset }) => topOffset || 0,
  },
  titleWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Bodoni Moda, serif',
    fontWeight: 400,
    fontSize: '28px',
    lineHeight: '34px',
    letterSpacing: '1px',
  },
  bottomLine: {
    marginTop: '22px',
    borderBottom: '0.5px solid #D8D8D8',
    width: '100%',
  },
  child: {
    margin: '0 auto',
    marginTop: ({ gapSize }) => gapSize || 0,
  },
});

function PageWrapper({
  children,
  title,
  alignment,
  topOffset,
  gapSize,
  showAction,
  actionText,
  onClickViewAll,
}) {
  const classes = useStyles({ alignment, gapSize, topOffset });

  const handleClickViewAll = () => {};

  return (
    <div className={classes.pageWrapperRoot}>
      <div className={classes.titleWrapper}>
        <Typography className={classes.title}>{title}</Typography>
      </div>
      <div className={classes.bottomLine} />
      <div className={classes.child}>{children}</div>
    </div>
  );
}

export default memo(PageWrapper);
