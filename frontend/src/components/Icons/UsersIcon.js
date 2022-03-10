import { memo } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';

import UserIcon from './UserIcon';
import { accentColor as accentColorData } from '../../data/common';

const useStyles = makeStyles({
  usersIconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addIconContainer: {
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
  },
});

function UsersIcon({
  users,
  bgColor,
  avatarWH,
  textFont,
  maxUserCount = 10,
  marginVal,
  isPlusAvatar = false,
  ...props
}) {
  const accentColor = props.theme?.accentColor || accentColorData;
  const styles = useStyles();
  const isUsers = users && users.length > 0;
  const avatarSize = avatarWH ? avatarWH : 20;
  const avatarBackground = bgColor ? bgColor : '#65C9FF';
  const fontSize =
    textFont && textFont.fontSize
      ? textFont.fontSize
      : Math.floor(avatarSize / 2);
  const fontColor =
    textFont && textFont.fontColor ? textFont.fontColor : '#000000';
  const marginRightVal = marginVal ? marginVal : -fontSize;

  return (
    <div className={styles.usersIconContainer}>
      {isUsers &&
        users
          .filter((user, idx) => idx < maxUserCount)
          .map((user, idx) => (
            <UserIcon
              key={user.id}
              user={user}
              bgColor={bgColor}
              fillColor={accentColor}
              avatarWH={avatarWH}
              textFont={textFont}
              marginVal={`0 ${marginRightVal}px 0 0`}
              borderSize={1}
              borderColor={'#FFF'}
            />
          ))}
      {isPlusAvatar && (
        <div
          className={styles.addIconContainer}
          style={{
            width: avatarSize,
            height: avatarSize,
            background: avatarBackground,
            marginLeft: `${-2 * marginRightVal}px`,
            zIndex: 999,
          }}
        >
          <AddIcon
            style={{ width: fontSize, height: fontSize, color: fontColor }}
          />
        </div>
      )}
    </div>
  );
}

UsersIcon.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({})),
  avatarWH: PropTypes.number,
  textFont: PropTypes.shape({
    fontSize: PropTypes.number,
    fontFamily: PropTypes.string,
  }),
  bgColor: PropTypes.string,
  isPlusAvatar: PropTypes.bool,
  maxUserCount: PropTypes.number,
  marginVal: PropTypes.number,
};

export default memo(UsersIcon);
