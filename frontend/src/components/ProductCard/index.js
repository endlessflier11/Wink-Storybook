import { memo } from 'react';
import { isEmpty } from 'lodash';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  productCard: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '28px',
  },
  emptyView: ({ width, height }) => ({
    width,
    height,
  }),
  oneImage: ({ width, height }) => ({
    width,
    height,
    objectFit: 'cover',
    borderRadius: '4px',
  }),
  titleWrapper: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '16px',
    padding: '0px 4px',
    justifyContent: 'space-between',
  },
  nameLabel: {
    fontFamily: 'Campton, sans serif',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '16px',
    color: '#231F20',
    maxWidth: '230px',
    maxHeight: '16px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
});

function ProductCard({ product, width, height }) {
  const classes = useStyles({ width, height });

  if (!product || isEmpty(product)) {
    return (
      <div className={classes.productCard}>
        <div className={classes.emptyView} />
      </div>
    );
  }

  return (
    <div className={classes.productCard}>
      <img className={classes.oneImage} src={product.image} alt='no product' />
      <div className={classes.titleWrapper}>
        <Typography className={classes.nameLabel}>{product.name}</Typography>
        <Typography className={classes.nameLabel}>
          {`$ ${product.price}`}
        </Typography>
      </div>
    </div>
  );
}

export default memo(ProductCard);
