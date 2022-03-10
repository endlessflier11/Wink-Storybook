import { memo } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core';
import { CameraAlt as CameraAltIcon } from '@material-ui/icons';

import UserIcon from './UserIcon';

const useStyles = makeStyles({
  cameraUsersContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  cameraContainer: {
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

function UserCameraIcon({
  user,
  bgColor,
  avatarWH,
  textFont,
  marginVal,
  noCursorPointer,
  cameraWH,
  cameraBgColor,
  cameraCursor,
  onCamera,
}) {
  const styles = useStyles();
  const avatarSize = avatarWH ? avatarWH : 20;
  const avatarBackground = cameraBgColor ? cameraBgColor : '#65C9FF';
  const cameraSize = cameraWH ? cameraWH : Math.floor(avatarSize / 2);
  const cameraIconSize = Math.floor(cameraSize / 2);
  const cameraMarginTop = Math.floor(cameraIconSize / 4);
  const cameraMarginDif = Math.floor(avatarWH / 15);
  const marginRightVal = marginVal ? marginVal : -cameraSize;
  const cameraBackground = '#FFFFFF';
  const cameraIconColor = avatarBackground;
  if (!user) return null;

  return (
    <div className={styles.cameraUsersContainer}>
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
        className={styles.cameraContainer}
        style={{
          width: cameraSize,
          height: cameraSize,
          background: cameraBackground,
          cursor: cameraCursor ? 'pointer' : 'default',
          marginBottom: cameraMarginDif,
          zIndex: 999,
        }}
        onClick={() => {
          cameraCursor && onCamera();
        }}
      >
        <CameraAltIcon
          style={{
            width: cameraIconSize,
            height: cameraIconSize,
            color: cameraIconColor,
            marginTop: cameraMarginTop,
          }}
        />
      </div>
    </div>
  );
}

UserCameraIcon.propTypes = {
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
  cameraWH: PropTypes.number,
  cameraCursor: PropTypes.bool,
  cameraBgColor: PropTypes.string,
  onCamera: PropTypes.func,
};

export default memo(UserCameraIcon);
