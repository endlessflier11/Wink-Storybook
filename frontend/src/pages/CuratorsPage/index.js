import { memo, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import DestinationGroup from './DestinationGroup';
import ShopCollections from './ShopCollections';
import PlayoffGames from './PlayoffGames';
import TopCollections from './TopCollections';

import { history } from '../../services/history';
import { isStorybook } from '../../utils';
import '../../fonts/PalmerLakeRegular/index.css';

export const useStyles = makeStyles((theme) => ({
  root: {
    margin: '100px auto',
  },
}));

const destinations = Array(10).fill({ collections: 10, newArrivals: 3 });

function CuratorsPage(props) {
  const classes = useStyles();
  console.log('props=', props);
  useEffect(() => {
    if (isStorybook()) document.body.style.padding = 0;
  }, []);

  const handleGoPlayoffGames = (id) => {
    if (isStorybook()) return;

    history.push('/collections');
    window.location.reload();
  };

  const handleGotoCollection = (collectionId) => {
    if (isStorybook()) return;
    
    props.onChangeParams({ collection_id: collectionId });
    history.push('/products');
    window.location.reload();
  };

  return (
    <div className={classes.root}>
      <DestinationGroup
        data={destinations}
        onClickCollection={handleGoPlayoffGames}
      />
      <ShopCollections />
      <PlayoffGames onClickCollection={handleGoPlayoffGames} />
      <TopCollections onClickCollection={handleGotoCollection} />
    </div>
  );
}

export default memo(CuratorsPage);
