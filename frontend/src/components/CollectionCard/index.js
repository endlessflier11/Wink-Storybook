import React, { memo, useState, useEffect } from 'react';
import { isEmpty, includes } from 'lodash';
import classNames from 'classnames';
import { makeStyles, Typography } from '@material-ui/core';
import { winkProducts } from '../../data/winkProducts';

const useStyles = makeStyles({
  collectionCard: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '56px',
  },
  emptyView: ({ width, height }) => ({
    width,
    height,
  }),
  image: ({ width, height }) => ({
    width,
    height,
    objectFit: 'cover',
    borderRadius: '4px',
  }),
  title: {
    fontFamily: 'Bodoni Moda, serif',
    fontWeight: 400,
    fontSize: '20px',
    lineHeight: '16px',
    letterSpacing: '1px',
    textDecoration: 'underline',
    color: '#464545',
    cursor: 'pointer',
    marginTop: '16px',
  },
  description: {
    fontFamily: 'Campton, sans serif',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '16px',
    color: '#979797',
    marginTop: '2px',
    maxWidth: '300px',
    maxHeight: '16px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  socialWrapper: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '11px',
  },
  splitLine: {
    width: '1px',
    height: '16px',
    background: '#000',
    margin: '0px 8px',
  },
  curators: {
    fontFamily: 'Campton, sans serif',
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '16px',
    color: '#231F20',
  },
});

function CollectionCard({ data, width, height, cardStyle, onClickCollection }) {
  const classes = useStyles({ width, height });
  const [products, setProducts] = useState(null);
  const [productsNum, setProductsNum] = useState(0);

  useEffect(() => {
    const advancedProducts = winkProducts.filter((product) =>
      includes(data.products, product.id)
    );
    if (!advancedProducts || isEmpty(advancedProducts))
      return setProducts(null);
    const stockNum = advancedProducts.length;
    setProductsNum(stockNum);

    let filteredProducts;
    if (stockNum === 1) filteredProducts = advancedProducts.slice(0, 1);
    else if (stockNum <= 3) filteredProducts = advancedProducts.slice(0, 2);
    else filteredProducts = advancedProducts.slice(0, 4);
    setProducts(filteredProducts);
  }, [data]);

  if (!products) {
    return (
      <div className={classes.collectionCard}>
        <div className={classes.emptyView} />
      </div>
    );
  }

  return (
    <div className={classNames(classes.collectionCard, cardStyle)}>
      <img className={classes.image} src={data.image} alt='no data' />
      <Typography className={classes.title} onClick={onClickCollection}>
        {data.title}
      </Typography>
      <div className={classes.socialWrapper}>
        {data.curators > 0 && (
          <>
            <Typography
              className={classes.curators}
              style={{ fontWeight: 700 }}
            >
              {data.curators}
            </Typography>
            <Typography
              className={classes.curators}
              style={{ marginLeft: '4px' }}
            >
              {data.curators === 1 ? 'CURATOR' : 'CURATORS'}
            </Typography>
          </>
        )}
        {data.curators > 0 && productsNum > 0 && (
          <div className={classes.splitLine} />
        )}
        {productsNum > 0 && (
          <>
            <Typography
              className={classes.curators}
              style={{ fontWeight: 700 }}
            >
              {productsNum}
            </Typography>
            <Typography
              className={classes.curators}
              style={{ marginLeft: '4px' }}
            >
              {productsNum === 1 ? 'PRODUCT' : 'PRODUCTS'}
            </Typography>
          </>
        )}
      </div>
      <Typography className={classes.description}>
        {data.description || ''}
      </Typography>
    </div>
  );
}

export default memo(CollectionCard);
