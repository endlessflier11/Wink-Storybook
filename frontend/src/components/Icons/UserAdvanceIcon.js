import { memo } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core';
import { CameraAlt as CameraAltIcon } from '@material-ui/icons';
import { Favorite as FavoriteIcon } from '@material-ui/icons';

import { secondaryColor as secondaryColorData } from '../../data/common';

const useStyles = makeStyles({
  advanceUsersContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    borderRadius: '50%',
  },
  heartContainer: ({ isMobile, secondaryColor }) => ({
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: isMobile ? 23 : 26,
    height: isMobile ? 23 : 26,
    cursor: 'pointer',
    zIndex: 999,
    border: `1px solid ${secondaryColor}`,
    background: '#FFF',
  }),
  img: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
  },
});

function UserAdvanceIcon({
  isMobile,
  user,
  avatarWH,
  advanceType,
  advanceWH,
  advanceCursor,
  onAdvance,
  ...props
}) {
  const isAdvance =
    advanceType && (advanceType === 'camera' || advanceType === 'heart');
  const avatarSize = avatarWH ? avatarWH : 20;
  const advanceSize = advanceWH ? advanceWH : Math.floor(avatarSize / 2);
  const advanceIconSize =
    advanceType === 'camera' ? Math.floor(advanceSize / 1.3) : 10;
  const advanceMarginTop = Math.floor(advanceIconSize / 4);

  const secondaryColor = props.theme?.secondaryColor || secondaryColorData;
  const styles = useStyles({ isMobile, secondaryColor });

  if (!user) return null;

  return (
    <div
      className={styles.advanceUsersContainer}
      style={{
        background: !user.avatar && '#FFF',
        backgroundImage: `url(${user.avatar})`,
        width: avatarWH,
        height: avatarWH,
      }}
    >
      {isAdvance && (
        <div
          className={styles.heartContainer}
          onClick={() => {
            advanceCursor && onAdvance();
          }}
        >
          {advanceType === 'camera' && (
            <CameraAltIcon
              style={{
                width: '12px',
                height: '12px',
                color: secondaryColor,
              }}
            />
          )}
          {advanceType === 'heart' && (
            <FavoriteIcon
              style={{
                width: advanceIconSize,
                height: advanceIconSize,
                color: secondaryColor,
                marginTop: advanceMarginTop,
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}

UserAdvanceIcon.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    avatar: PropTypes.string,
  }),
  avatarWH: PropTypes.number,
  advanceWH: PropTypes.number,
  advanceCursor: PropTypes.bool,
  onAdvance: PropTypes.func,
};

export default memo(UserAdvanceIcon);
