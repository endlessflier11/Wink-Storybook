import { memo } from "react";
import PropTypes from "prop-types";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  daysIcon: {
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
});

function DaysIcon({ days, bgColor, textFontColor, avatarWH, firstTextFont, secondTextFont }) {
  const styles = useStyles();

  const avatarSize = avatarWH ? avatarWH : 75;
  const fontColor = textFontColor ? textFontColor : "#000000";
  const avatarBackground = bgColor ? bgColor : "#EFD24F";
  const firstFontSize =
    firstTextFont && firstTextFont.fontSize
      ? firstTextFont.fontSize
      : Math.floor(avatarSize / 3);
  const firstFontFamily =
    firstTextFont && firstTextFont.fontFamily
      ? firstTextFont.fontFamily
      : "Campton, sans serif";
  const secondFontSize =
    secondTextFont && secondTextFont.fontSize
      ? secondTextFont.fontSize
      : Math.floor(avatarSize / 5);
  const secondFontFamily =
    secondTextFont && secondTextFont.fontFamily
      ? secondTextFont.fontFamily
      : "Campton, sans serif";

  return (
    <div
      className={styles.daysIcon}
      style={{
        width: avatarSize,
        height: avatarSize,
        background: avatarBackground,
      }}
    >
      <Typography
        key="number"
        style={{
          fontSize: `${firstFontSize}px`,
          fontFamily: firstFontFamily,
          fontWeight: "bold",
          color: fontColor,
          lineHeight: `${firstFontSize}px`,
          marginBottom: '2px'
        }}
      >
        {`${days}`}
      </Typography>
      <Typography
        key="days"
        style={{
          fontSize: `${secondFontSize}px`,
          fontFamily: secondFontFamily,
          fontWeight: "bold",
          color: fontColor,
          lineHeight: `${secondFontSize}px`,
        }}
      >
        DAYS
      </Typography>
    </div>
  );
}

DaysIcon.propTypes = {
  days: PropTypes.number.isRequired,
  avatarWH: PropTypes.number,
  firstTextFont: PropTypes.shape({
    fontSize: PropTypes.number,
    fontFamily: PropTypes.string,
  }),
  secondTextFont: PropTypes.shape({
    fontSize: PropTypes.number,
    fontFamily: PropTypes.string,
  }),
  bgColor: PropTypes.string,
  textFontColor: PropTypes.string,
};

export default memo(DaysIcon);
