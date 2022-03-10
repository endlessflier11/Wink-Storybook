import { memo } from 'react';
import { chunk } from 'lodash';
import { makeStyles } from '@material-ui/core';

import DestinationButton from '../../components/DestinationButton';

const useStyles = makeStyles({
  destinationGroup: {
    display: 'flex',
    flexDirection: 'column',
    width: '1200px',
    margin: '0 auto',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '10px',
  },
});

function DestinationGroup({ data, onClickCollection }) {
  const classes = useStyles();

  const chunkedDests = chunk(data, 5);

  return (
    <div className={classes.destinationGroup}>
      {chunkedDests.map((row, idx) => (
        <div key={`destination-row-${idx}`} className={classes.row}>
          {row.map((column, idx) => (
            <DestinationButton
              key={`destination-button-${column.id || idx}`}
              data={column}
              onClickCollection={onClickCollection}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default memo(DestinationGroup);
