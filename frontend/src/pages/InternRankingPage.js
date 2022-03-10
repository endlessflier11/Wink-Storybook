import { withSize } from 'react-sizeme';
import { Typography, makeStyles } from '@material-ui/core';

import InternRanking from '../components/InternRanking';
import '../fonts/KalistaScript/index.css';
import {
  UserAdvanceIcon,
  RankIcon,
  BadgeEggIcon,
  BadgeHatchingIcon,
  BadgeEggpoppingIcon,
  BadgeEggoutIcon,
  BadgeStarsIcon,
} from '../components/Icons';
import {
  primaryColor as primaryColorData,
  secondaryColor as secondaryColorData,
  accentColor as accentColorData,
  primaryFont as primaryFontData,
} from '../data/common';

import { isStorybook } from '../utils';

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(#f1f4f9, #f1f4f9 60%, #fff 80%, #fff) fixed',
  },
  headerWrapper: ({ isMobile }) => ({
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
  }),
  headers: ({ isMobile }) => ({
    marginTop: '40px',
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  nameLabel: {
    fontFamily: 'KalistaScriptRegular',
    fontSize: '30px',
    fontStyle: 'normal',
    fontWeight: '700',
    marginTop: '10px',
  },
  headerBadge: {
    display: 'flex',
    flexDirection: 'row',
  },
  rankGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
  },
  rankIcon: ({ secondaryColor }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    background: secondaryColor,
    borderRadius: '50%',
  }),
  rankLabel: ({ primaryFont }) => ({
    ...primaryFont,
    fontSize: 12,
    marginTop: 7,
  }),
  divideLine: {
    borderLeft: '0.5px solid #D8D8D8',
    width: 0,
    height: 50,
    marginTop: 15,
  },
  divideLine2: {
    width: '100%',
    marginTop: 31,
    borderBottom: '0.5px solid #D8D8D8',
  },
  sticky: {
    display: 'flex',
    justifyContent: 'flex-end',
    bottom: '30px',
    margin: '-28px 80px 10px 0',
    position: 'sticky',
    zIndex: 10000,
  },
  productsGroup: {
    display: 'flex',
    margin: '29px 24px 0px 24px',
  },
});

function drawBadgeIcon(badgeNum) {
  if (badgeNum <= 5) return <BadgeEggIcon />;
  else if (badgeNum <= 20) return <BadgeHatchingIcon scale={0.75} />;
  else if (badgeNum <= 100) return <BadgeEggpoppingIcon scale={0.6} />;
  else if (badgeNum <= 250) return <BadgeEggoutIcon scale={0.7} />;
  else return <BadgeStarsIcon />;
}

function InternRankingPage(props) {
  const isMobile = props.size.width < 600;
  const primaryColor = props.theme?.primaryColor || primaryColorData;
  const secondaryColor = props.theme?.secondaryColor || secondaryColorData;
  const primaryFont = props.theme?.primaryFont || primaryFontData;
  const accentColor = props.theme?.accentColor || accentColorData;

  const classes = useStyles({
    primaryFont,
    primaryColor,
    secondaryColor,
    accentColor,
  });

  const [ranks, totalRanks] = isStorybook() ? [168, 290] : [0, 0];
  const badgeNum = isStorybook() ? 26 : 0;

  if (isStorybook()) {
    document.body.style.padding = 0;
  }

  return (
    <div className={classes.root}>
      <div
        key='header-wrapper'
        className={classes.headerWrapper}
        style={{
          paddingTop: isMobile ? 0 : 50,
          alignItems: !isMobile && 'center',
        }}
      >
        <div key='header' className={classes.headers}>
          <UserAdvanceIcon
            isMobile={isMobile}
            user={props.currentUser}
            avatarWH={75}
            advanceType={'camera'}
            advanceWH={75}
            advanceCursor={true}
            // onAdvance={handleAdvance}
            {...props}
          />
          <Typography className={classes.nameLabel}>
            {`${props.currentUser?.firstName || ''} ${
              props.currentUser?.lastName || ''
            }`}
          </Typography>
          <div className={classes.headerBadge}>
            <div className={classes.rankGroup} style={{ marginRight: 37 }}>
              <div className={classes.rankIcon}>
                <RankIcon />
              </div>
              <Typography className={classes.rankLabel}>{ranks}</Typography>
            </div>
            <div className={classes.divideLine} />
            <div className={classes.rankGroup} style={{ marginLeft: 37 }}>
              <div className={classes.rankIcon}>{drawBadgeIcon(badgeNum)}</div>
              <Typography className={classes.rankLabel}>badge</Typography>
            </div>
          </div>
          <div className={classes.divideLine2} />
        </div>
      </div>

      <div key='content' style={{ marginTop: 50 }}>
        <div className={classes.productsGroup}>
          <InternRanking
            {...props}
          />
        </div>
      </div>
    </div>
  );
}

export default withSize()(InternRankingPage);
