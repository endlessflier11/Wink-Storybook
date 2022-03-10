import { memo } from 'react';
import { makeStyles } from '@material-ui/core';

import PageWrapper from '../../components/PageWrapper';
import ShopCollectionCard from '../../components/ShopCollectionCard';

const shopStoryData = {
  condenast: {
    collections: [
      {
        image: '/assets/tempimages/condenast.png',
        title: '',
        data: {},
      },
    ],
    logo: '/assets/tempimages/conde_nast_logo.png',
    title: 'Top 30 winter destinations',
  },
  spotify: {
    collections: [
      {
        image: '/assets/tempimages/collection1.png',
        title: 'PLAYFUL',
        data: {},
      },
      {
        image: '/assets/tempimages/collection2.png',
        title: 'CREATIVE',
        data: {},
      },
      {
        image: '/assets/tempimages/collection3.png',
        title: 'INVINCIBLE',
        data: {},
      },
      {
        image: '/assets/tempimages/collection4.png',
        title: 'ACTIVE',
        data: {},
      },
    ],
    logo: '/assets/tempimages/spotify_logo.png',
    title: 'Moody matches for every playlist',
  },
  southwest: {
    collections: [
      {
        image: '/assets/tempimages/southwest.png',
        title: '',
        data: {},
      },
    ],
    logo: '/assets/tempimages/southwest_logo.png',
    title: '3 perfect days in Maui',
  },
  logo: {
    width: '100px',
    height: '30px',
    objectFit: 'cover',
  },
};

const useStyles = makeStyles({
  shopStoryRoot: {
    marginTop: '224px',
  },
  shopStoryWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '1200px',
  },
});

const SHOP_STORY_CARD_WIDTH = 378;
const SHOP_STORY_CARD_HEIGHT = 274;

function ShopCollections({ data }) {
  const classes = useStyles();

  return (
    <div className={classes.shopStoryRoot}>
      <PageWrapper title='SHOP THE STORY' alignment='center' gapSize={48}>
        <div className={classes.shopStoryWrapper}>
          <ShopCollectionCard
            key='collection-card-conde-nast'
            data={shopStoryData.condenast}
            width={SHOP_STORY_CARD_WIDTH}
            height={SHOP_STORY_CARD_HEIGHT}
          />

          <ShopCollectionCard
            key='collection-card-spotify'
            data={shopStoryData.spotify}
            width={SHOP_STORY_CARD_WIDTH}
            height={SHOP_STORY_CARD_HEIGHT}
            cols={4}
          />

          <ShopCollectionCard
            key='collection-card-southwest'
            data={shopStoryData.southwest}
            width={SHOP_STORY_CARD_WIDTH}
            height={SHOP_STORY_CARD_HEIGHT}
          />
        </div>
      </PageWrapper>
    </div>
  );
}

export default memo(ShopCollections);
