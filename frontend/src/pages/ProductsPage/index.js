import { memo, useEffect, useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import CollectionHeadWrapper from '../../components/CollectionHeadWrapper';
import Products from './Products';

import { isStorybook } from '../../utils';
import '../../fonts/PalmerLakeRegular/index.css';
import { winkProducts as productsData } from '../../data/winkProducts';
import { topCollections } from '../../data/topCollections';

export const useStyles = makeStyles((theme) => ({
  root: {
    // display: 'flex',
    // flexDirection: 'column',
  },
  headerWrapper: {
    background: '#fafafa',
    margin: '0 auto',
    paddingTop: '100px',
    paddingBottom: '100px',
  },
}));

function ProductsPage(props) {
  const { collection_id: collectionId } = props.params;
  const classes = useStyles();
  console.log('props=', props);
  console.log('ccc=', collectionId);
  const collection = useMemo(() => {
    return topCollections.find((collection) => collection.id === collectionId);
  }, [collectionId]);

  const products = useMemo(() => {
    return productsData.filter((product) =>
      collection?.products.includes(product.id)
    );
  }, [collection]);

  useEffect(() => {
    document.body.style.padding = 0;
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.headerWrapper}>
        <CollectionHeadWrapper
          imageUrl={collection?.image || null}
          title={collection?.title || ''}
          description={collection?.description || ''}
        />
      </div>
      <Products products={products} />
    </div>
  );
}

export default memo(ProductsPage);
