import { memo, useMemo } from 'react';
import { chunk } from 'lodash';
import { makeStyles } from '@material-ui/core';

import PageWrapper from '../../components/PageWrapper';
import CollectionCard from '../../components/CollectionCard';
import { collections } from '../../data/collections';
import { topCollections } from '../../data/topCollections';

const useStyles = makeStyles({
  collectionsRoot: {
    display: 'flex',
    flexDirection: 'column',
    width: '1200px',
    margin: '0 auto',
    marginTop: '100px',
  },
  collectionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '1200px',
  },
  collectionCardRow: {
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
  cardStyle: {
    marginBottom: '56px',
  },
});

const COLLECTION_CARD_WIDTH = 379;
const COLLECTION_CARD_HEIGHT = 274;

function TopCollections({ data, onClickCollection }) {
  const classes = useStyles();

  const chunkedData = useMemo(() => {
    const compensateNum = (3 - (topCollections.length % 3)) % 3;
    const data = topCollections.concat(Array(compensateNum).fill({}));
    return chunk(data, 3);
  }, []);

  return (
    <div className={classes.collectionsRoot}>
      <PageWrapper
        title='TODAY’S TOP COLLECTIONS'
        alignment='center'
        gapSize={30}
      >
        <div className={classes.collectionsContainer}>
          {chunkedData.map((row, idx) => (
            <div
              key={`collection-card-row-${idx}`}
              className={classes.collectionCardRow}
            >
              {row.map((item, idx) => (
                <CollectionCard
                  key={`collection-card-${item.id || idx}`}
                  data={item || {}}
                  width={COLLECTION_CARD_WIDTH}
                  height={COLLECTION_CARD_HEIGHT}
                  cardStyle={classes.cardStyle}
                  onClickCollection={() => onClickCollection(item.id)}
                />
              ))}
            </div>
          ))}
        </div>
      </PageWrapper>
    </div>
  );
}

export default memo(TopCollections);
