import { memo } from 'react';
import PropTypes from 'prop-types';

import { makeStyles, Tooltip } from '@material-ui/core';

const useStyles = makeStyles({
  userIcon: {
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    borderRadius: '50%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  tooltip: {
    color: '#000',
    background: '#EBF0F8',
    padding: '10px',
    fontSize: '15px',
    fontWeight: 'light',
    margin: '30px 0',
    maxWidth: '200px',
    textAlign: 'center',
    zIndex: 1000,
  },
  tooltipArrow: {
    '&:before': {
      background: '#EBF0F8',
    },
  },
  popper: {
    zIndex: 1000,
  },
});

function UserIcon({
  user,
  bgColor,
  avatarWH,
  textFont,
  marginVal,
  noCursorPointer,
  showToolTip,
  onClickUser,
  fillColor,
  nameColor,
  borderSize,
  borderColor,
  paddingStyle,
}) {
  const styles = useStyles();
  const { firstName, lastName, avatar } = user || {};

  const nameInitials = `${firstName ? firstName[0] : ''}${
    lastName ? lastName[0] : ''
  }`.toUpperCase();
  const marginStr = marginVal ? marginVal : '0px';
  const avatarSize = avatarWH ? avatarWH : 20;
  const borderStyle = `${borderSize ? borderSize : 0}px solid ${
    borderColor ? borderColor : '#EFD34F'
  }`;
  const avatarBackground = bgColor ? bgColor : avatar ? '#F5F4F4' : '#65C9FF';
  const fontSize =
    textFont && textFont.fontSize
      ? textFont.fontSize
      : Math.floor(avatarSize / 2);
  const fontFamily =
    textFont && textFont.fontFamily
      ? textFont.fontFamily
      : 'Campton, sans serif';
  const fontColor =
    textFont && textFont.fontColor ? textFont.fontColor : '#000000';

  return (
    <div
      className={styles.userIcon}
      style={{
        width: avatarSize,
        height: avatarSize,
        background: fillColor ? fillColor : avatarBackground,
        margin: marginStr,
        cursor: noCursorPointer ? 'default' : 'pointer',
        border: borderStyle ? borderStyle : avatar ? null : '2px solid #fff',
        padding: paddingStyle,
      }}
    >
      {avatar ? (
        <div
          className={styles.img}
          style={{
            width: avatarSize,
            height: avatarSize,
            backgroundImage: `url(${avatar})`,
          }}
          onClick={onClickUser && onClickUser}
        />
      ) : (
        <Tooltip
          title={
            showToolTip
              ? 'Upload a profile picture so your firends know who you are!'
              : ''
          }
          arrow
          placement='bottom'
          classes={{
            tooltip: styles.tooltip,
            arrow: styles.tooltipArrow,
            popper: styles.popper,
          }}
        >
          <span
            style={{
              fontSize: fontSize,
              fontFamily: fontFamily,
              color: nameColor ? nameColor : fontColor,
            }}
          >
            {nameInitials}
          </span>
        </Tooltip>
      )}
    </div>
  );
}

UserIcon.propTypes = {
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
  marginVal: PropTypes.string,
  showToolTip: PropTypes.bool,
  onClickUser: PropTypes.func,
  fillColor: PropTypes.string,
  nameColor: PropTypes.string,
};

UserIcon.defaultProps = {
  user: null,
  showToolTip: false,
  onClickUser: undefined,
};

export default memo(UserIcon);
