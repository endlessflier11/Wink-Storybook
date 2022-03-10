import { memo, useMemo } from 'react';
import { chunk } from 'lodash';
import { makeStyles } from '@material-ui/core';

import ProductCard from '../../components/ProductCard';

const useStyles = makeStyles({
  productsRoot: {
    display: 'flex',
    flexDirection: 'column',
    width: '1200px',
    margin: '0 auto',
    marginTop: '100px',
  },
  productsContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '1200px',
  },
  productCardRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  adsImage: {
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

const PRODUCT_CARD_WIDTH = 289;
const PRODUCT_CARD_HEIGHT = 404;

function Products({ products }) {
  const classes = useStyles();

  const chunkedData = useMemo(() => {
    const compensateNum = (4 - (products.length % 4)) % 4;
    const data = products.concat(Array(compensateNum).fill({}));
    return chunk(data, 4);
  }, [products]);

  return (
    <div className={classes.productsRoot}>
      <div className={classes.productsContainer}>
        {chunkedData.map((row, idx) => (
          <div
            key={`product-card-row-${idx}`}
            className={classes.productCardRow}
          >
            {row.map((item, idx) => (
              <ProductCard
                key={`product-card-${item.id || idx}`}
                product={item || {}}
                width={PRODUCT_CARD_WIDTH}
                height={PRODUCT_CARD_HEIGHT}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(Products);
