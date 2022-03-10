import { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Tooltip } from '@material-ui/core';

const useStyles = makeStyles({
  tooltipContainer: {
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    borderRadius: '50%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
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

function UserTooltipIcon({
  user,
  bgColor,
  avatarWH,
  textFont,
  marginVal,
  noCursorPointer,
}) {
  const styles = useStyles();
  const { firstName, lastName, avatar } = user;

  const nameInitials = `${firstName ? firstName[0] : ''}${
    lastName ? lastName[0] : ''
  }`.toUpperCase();
  const marginStr = marginVal ? marginVal : '0 0 0 0';
  const avatarSize = avatarWH ? avatarWH : 20;
  const avatarBackground = bgColor ? bgColor : avatar ? '#FFFFFF' : '#65C9FF';
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
      className={styles.tooltipContainer}
      style={{
        width: avatarSize,
        height: avatarSize,
        background: avatarBackground,
        margin: marginStr,
        cursor: noCursorPointer ? 'default' : 'pointer',
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
        />
      ) : (
        <Tooltip
          open={true}
          title='Upload a profile picture so your firends know who you are!'
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
              color: fontColor,
            }}
          >
            {nameInitials}
          </span>
        </Tooltip>
      )}
    </div>
  );
}

UserTooltipIcon.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    avatar: PropTypes.string,
  }),
  avatarWH: PropTypes.number,
  textFont: PropTypes.shape({
    fontSize: PropTypes.number,
    fontFamily: PropTypes.string,
  }),
  bgColor: PropTypes.string,
  marginVal: PropTypes.string,
};

export default memo(UserTooltipIcon);
