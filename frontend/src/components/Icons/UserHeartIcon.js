import { memo } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core';
import { Favorite as FavoriteIcon } from '@material-ui/icons';

import UserIcon from './UserIcon';
import { accentColor, secondaryColor } from '../../data/common';

const useStyles = makeStyles({
  heartUsersContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  favoriteContainer: {
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
  },
});

function UserHeartIcon({
  isMobile,
  user,
  bgColor,
  avatarWH,
  textFont,
  marginVal,
  noCursorPointer,
  heartWH,
  heartCursor,
  onHeart,
}) {
  const styles = useStyles();
  const avatarSize = avatarWH ? avatarWH : 20;
  const heartSize = heartWH ? heartWH : Math.floor(avatarSize / 2);
  const heartIconSize = Math.floor(heartSize / 3);
  const heartMarginTop = Math.floor(heartIconSize / 4);
  const marginRightVal = marginVal ? marginVal : -heartSize;
  const heartBackground = heartCursor ? secondaryColor : '#FFF';
  const heartColor = heartCursor ? '#FFF' : secondaryColor;
  const borderSize = isMobile ? 1 : 2;

  if (!user) return null;

  return (
    <div className={styles.heartUsersContainer}>
      <UserIcon
        key={user.id}
        user={user}
        bgColor={bgColor}
        avatarWH={avatarWH}
        textFont={textFont}
        noCursorPointer={noCursorPointer}
        marginVal={`0 ${marginRightVal}px 0 0`}
      />
      <div
        className={styles.favoriteContainer}
        style={{
          width: !heartCursor ? heartSize - borderSize * 2 : heartSize,
          height: !heartCursor ? heartSize - borderSize * 2 : heartSize,
          background: heartBackground,
          border: `solid ${!heartCursor ? borderSize : 0}px ${secondaryColor}`,
          cursor: 'pointer',
          zIndex: 999,
        }}
        onClick={onHeart}
      >
        <FavoriteIcon
          style={{
            width: isMobile ? 8 : heartIconSize,
            height: isMobile ? 8 : heartIconSize,
            color: heartColor,
            marginTop: heartMarginTop,
          }}
        />
      </div>
    </div>
  );
}

UserHeartIcon.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    avatar: PropTypes.string,
  }),
  avatarWH: PropTypes.number,
  textFont: PropTypes.shape({
    fontSize: PropTypes.number,
    fontFamily: PropTypes.string,
  }),
  bgColor: PropTypes.string,
  marginVal: PropTypes.number,
  heartWH: PropTypes.number,
  heartCursor: PropTypes.bool,
  heartBgColor: PropTypes.string,
  onHeart: PropTypes.func,
};

export default memo(UserHeartIcon);
