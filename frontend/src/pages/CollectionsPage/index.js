import { memo, useEffect, useMemo } from 'react';
import { chunk } from 'lodash';
import { makeStyles } from '@material-ui/core/styles';

import CollectionHeadWrapper from '../../components/CollectionHeadWrapper';
import PageWrapper from '../../components/PageWrapper';

import { history } from '../../services/history';
import '../../fonts/PalmerLakeRegular/index.css';
import { playoffGames } from '../../data/playoffGames';
import { collections } from '../../data/collections';
import MatchCollectionCard from '../../components/MatchCollectionCard';
import CollectionCard from '../../components/CollectionCard';
import { isStorybook } from '../../utils';

export const useStyles = makeStyles((theme) => ({
  root: {},
  headerWrapper: {
    background: '#fafafa',
    margin: '0 auto',
    paddingTop: '100px',
    paddingBottom: '100px',
  },
  sectionWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '1200px',
    margin: '0 auto',
  },
  sectionRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '32px',
  },
  cardStyle: {
    marginBottom: '32px',
  },
}));

const CARD_WIDTH = 376;
const CARD_HEIGHT = 229;
const TEAM_CARD_WIDTH = 380;
const TEAM_CARD_HEIGHT = 276;

function CollectionsPage(props) {
  const classes = useStyles();

  const chunkedMatchData = useMemo(() => {
    const compensateNum = (3 - (playoffGames.data.length % 3)) % 3;
    const data = playoffGames.data.concat(Array(compensateNum).fill({}));
    return chunk(data, 3);
  }, []);

  const chunkedTeamData = useMemo(() => {
    const compensateNum = (3 - (collections.length % 3)) % 3;
    const data = collections.concat(Array(compensateNum).fill({}));
    return chunk(data, 3);
  }, []);

  const handleGotoCollection = (collectionId) => {
    if (isStorybook()) return;

    props.onChangeParams({ collection_id: collectionId });
    history.push('/products');
    window.location.reload();
  };

  useEffect(() => {
    document.body.style.padding = 0;
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.headerWrapper}>
        <CollectionHeadWrapper
          imageUrl={playoffGames.image}
          title={playoffGames.title}
          description={playoffGames.description}
          linkUrl={playoffGames.linkUrl}
          buttonText={playoffGames.buttonText}
        />
      </div>

      <PageWrapper
        title='BOWL SEASON'
        alignment='center'
        topOffset={40}
        gapSize={40}
      >
        <div className={classes.sectionWrapper}>
          {chunkedMatchData.map((row, idx) => (
            <div
              key={`collection-card-row-${idx}`}
              className={classes.sectionRow}
            >
              {row.map((collection, idx) => (
                <MatchCollectionCard
                  key={`collection-card-${collection.id || idx}`}
                  collection={collection}
                  width={CARD_WIDTH}
                  height={CARD_HEIGHT}
                />
              ))}
            </div>
          ))}
        </div>
      </PageWrapper>

      <PageWrapper
        title='TRENDING TEAM COLLECTIONS'
        alignment='center'
        topOffset={125}
        gapSize={40}
      >
        <div className={classes.sectionWrapper}>
          {chunkedTeamData.map((row, idx) => (
            <div key={`team-card-row-${idx}`} className={classes.sectionRow}>
              {row.map((colleciton, idx) => (
                <CollectionCard
                  key={`team-card-${colleciton.id || idx}`}
                  data={colleciton || {}}
                  width={TEAM_CARD_WIDTH}
                  height={TEAM_CARD_HEIGHT}
                  cardStyle={classes.cardStyle}
                  onClickCollection={() => handleGotoCollection(colleciton.id)}
                />
              ))}
            </div>
          ))}
        </div>
      </PageWrapper>
    </div>
  );
}

export default memo(CollectionsPage);
