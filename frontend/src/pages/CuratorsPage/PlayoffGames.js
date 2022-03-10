import { memo } from 'react';
import { makeStyles } from '@material-ui/core';

import MatchCollectionCard from '../../components/MatchCollectionCard';
import CollectionHeadWrapper from '../../components/CollectionHeadWrapper';
import { playoffGames } from '../../data/playoffGames';

const useStyles = makeStyles({
  collectionsRoot: {
    display: 'flex',
    flexDirection: 'column',
    width: '1200px',
    margin: '0 auto',
    marginTop: '100px',
    background: '#fafafa',
    paddingTop: '80px',
    paddingBottom: '70px',
  },
  collectionsContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: '0 auto',
    width: '1000px',
  },
});

const SHOP_STORY_CARD_WIDTH = 315;
const SHOP_STORY_CARD_HEIGHT = 229;

function PlayoffGames({ data, onClickCollection }) {
  const classes = useStyles();

  return (
    <div className={classes.collectionsRoot}>
      <CollectionHeadWrapper
        imageUrl={playoffGames.image}
        title={playoffGames.title}
        description={playoffGames.description}
        linkUrl={playoffGames.linkUrl}
        buttonText={playoffGames.buttonText}
      />

      <div className={classes.collectionsContent} style={{ marginTop: '28px' }}>
        {playoffGames.data
          .concat({}, {}, {})
          .filter((item, idx) => idx < 3)
          .map((collection, idx) => (
            <MatchCollectionCard
              key={`match-collection-card-${collection.id || idx}`}
              collection={collection}
              width={SHOP_STORY_CARD_WIDTH}
              height={SHOP_STORY_CARD_HEIGHT}
              onClickCollection={() => onClickCollection(collection.id)}
            />
          ))}
      </div>
    </div>
  );
}

export default memo(PlayoffGames);
