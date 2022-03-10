import { useMemo } from 'react';
import { withSize } from 'react-sizeme';
import classNames from 'classnames';
import {
  Dialog,
  DialogContent,
  IconButton,
  Box,
  useMediaQuery,
  makeStyles,
  Typography,
  Button,
  LinearProgress,
} from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';

import {
  primaryFont as primaryFontData,
  primaryColor as primaryColorData,
} from '../../../data/common';
import { OPTION_STATE } from './index';

export const useStyles = makeStyles({
  paper: ({ isMobile }) => ({
    margin: isMobile ? '0px' : '0px',
    width: isMobile ? '100%' : '374px',
    height: isMobile ? '100%' : '650px',
    maxHeight: '100%',
    background: '#FAFAFA',
    boxShadow: 'none',
  }),
  surveyRoot: ({ isMobile }) => ({
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    background: '#FAFAFA',
    zIndex: 9999,
    overflow: 'auto',
  }),
  header: {
    position: 'absolute',
    top: 22,
    right: 22,
  },
  buttonIcon: {
    padding: 0,
  },
  closeIcon: {
    color: '#000',
    stroke: '#000',
    fontSize: 20,
  },
  surveyContent: {
    display: 'flex',
    width: 'calc(100% - 48px)',
    padding: '85px 24px 0px 24px',
  },
  viewContainer: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 'calc(100% - 48px)',
    height: 'calc(100% - 120px)',
    maxHeight: '560px',
    overflow: 'hidden',
    background: '#FFF',
    borderRadius: 8,
    boxShadow: '1px 1px 2px 2px rgba(0, 0, 0, 0.04)',
  },
  title: ({ primaryFont }) => ({
    ...primaryFont,
    fontWeight: 300,
    fontSize: 16,
    marginTop: 24,
  }),
  divideLiine: {
    marginTop: 16,
    borderBottom: '0.5px solid #E6E6E6',
    width: 'calc(100% - 64px)',
  },
  picture: {
    marginTop: 9,
    width: 'calc(100% - 32px)',
    height: 'calc(100% - 150px)',
    objectFit: 'cover',
    borderRadius: 4,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 43,
    zIndex: 10,
    height: 100,
    alignItems: 'flex-end',
    overflow: 'hidden',
    cursor: 'pointer',
  },
  optionButton: ({ primaryFont }) => ({
    ...primaryFont,
    fontWeight: 300,
    fontSize: 11,
    width: 60,
    height: 60,
    borderRadius: '50%',
    background: '#EBEBEB',
    border: '2px solid #FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 11,
    textAlign: 'center',
  }),
  selectedButton: ({ primaryColor }) => ({
    border: `2px solid ${primaryColor}`,
    background: '#D7DAE2',
  }),
  progressContainer: {
    position: 'absolute',
    bottom: '0px',
    width: '100%',
    background: '#fafafa',
    height: '43px',
  },
  progressContent: {
    display: 'flex',
    alignItems: 'center',
    width: 'calc(100% - 44px)',
    height: '100%',
    margin: '0px 20px 0px 24px',
  },
  colorPrimary: {
    background: '#E6E6E6 !important',
  },
  barColorPrimary: {
    background: '#EFD34F !important',
  },
  progressLabel: ({ primaryFont }) => ({
    ...primaryFont,
    fontSize: 8,
    fongWeight: 700,
  }),
  finishButtonWrapper: {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  finishButton: ({ primaryColor, primaryFont }) => ({
    ...primaryFont,
    fontWeight: 700,
    fontSize: 16,
    background: primaryColor,
    borderRadius: 10,
    color: '#FFFFFF',
    width: 215,
    height: 48,
    '&:hover': {
      background: primaryColor,
    },
  }),
});

const SurveyPopup = ({
  product,
  progress,
  maxProgress,
  options,
  setOptions,
  onClose,
  processState,
  onSelectOption,
  onClickFinish,
  ...props
}) => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const primaryFont = props.theme?.primaryFont || primaryFontData;
  const primaryColor = props.theme?.primaryColor || primaryColorData;

  const classes = useStyles({
    isMobile,
    primaryFont,
    primaryColor,
  });

  const [
    smallSize,
    mediumSize,
    largeSize,
    largeBottomOffset,
    largeLeftOffset,
  ] = useMemo(() => {
    const whichSize =
      props.size.width > 350 ? 2 : props.size.width > 300 ? 1 : 0;
    if (whichSize === 2) return [50, 60, 70, 20, -6];
    else if (whichSize === 1) return [40, 50, 60, 20, -6];
    return [35, 45, 55, 20, -6];
  }, [props.size]);

  const optionParms = useMemo(() => {
    const newStyles = [
      {
        ...options[0],
        size: largeSize,
        bottom: largeBottomOffset,
        left: largeLeftOffset,
        zIndex: 3,
        background: '#E5E5E3',
      },
      { ...options[1], size: mediumSize, zIndex: 6, background: '#E8F0F1' },
      { ...options[2], size: smallSize, zIndex: 5, background: '#EBEBEB' },
      { ...options[3], size: mediumSize, zIndex: 6, background: '#D7DAE2' },
      {
        ...options[4],
        size: largeSize,
        bottom: largeBottomOffset,
        left: largeLeftOffset,
        zIndex: 3,
        background: '#E5E5E5',
      },
    ];
    return newStyles;
  }, [smallSize, options]);

  const handleClickOptionButton = (index) => {
    if (processState === OPTION_STATE.NEXT) return;
    const newOptions = options.map((item, idx) => {
      if (idx === index) return { ...item, selected: !item.selected };
      return item;
    });
    if (newOptions.filter((item) => item.selected).length < 2) {
      setOptions(newOptions);
      onSelectOption();
    }
  };

  return (
    <Dialog
      open
      classes={{ paper: classes.paper }}
      BackdropProps={{
        style: { background: isMobile ? '#F1F4F9' : 'blur(0.2)' },
      }}
      // TransitionComponent={Transition}
      maxWidth='md'
    >
      <DialogContent>
        <Box className={classes.surveyRoot}>
          <Box className={classes.header}>
            <IconButton onClick={onClose} className={classes.buttonIcon}>
              <CloseIcon className={classes.closeIcon} />
            </IconButton>
          </Box>
          <Box className={classes.surveyContent}>
            <Box
              className={classes.viewContainer}
              style={{
                zIndex: 1,
                marginTop: -10,
                marginLeft: 10,
              }}
            />
            <Box
              className={classes.viewContainer}
              style={{
                zIndex: 2,
                marginTop: -5,
                marginLeft: 5,
              }}
            />
            <Box className={classes.viewContainer} style={{ zIndex: 3 }}>
              <Typography className={classes.title}>ASPEN?</Typography>
              <Box className={classes.divideLiine} />
              <img
                src={product.image}
                className={classes.picture}
                alt='plant'
              />

              <Box className={classes.buttonContainer}>
                {optionParms.map((option, idx) => (
                  <Box
                    key={option.label}
                    className={classNames(
                      classes.optionButton,
                      option.selected && classes.selectedButton
                    )}
                    style={{
                      width: option.size,
                      height: option.size,
                      marginBottom: option.bottom || 0,
                      marginRight: idx < 4 && (option.left || 0),
                      marginLeft: idx === 4 && (option.left || 0),
                      zIndex: option.zIndex,
                      background: option.background,
                    }}
                    onClick={() => handleClickOptionButton(idx)}
                  >
                    {option.label}
                  </Box>
                ))}
              </Box>

              {processState === OPTION_STATE.FINISH && (
                <Box className={classes.finishButtonWrapper}>
                  <Button
                    onClick={onClickFinish}
                    className={classes.finishButton}
                    variant='contained'
                  >
                    FINISH
                  </Button>
                </Box>
              )}

              <Box className={classes.progressContainer}>
                <Box className={classes.progressContent}>
                  <Box sx={{ width: '100%', mr: 2 }}>
                    <LinearProgress
                      variant='determinate'
                      color='primary'
                      value={Math.round((100 * progress) / maxProgress)}
                      classes={{
                        colorPrimary: classes.colorPrimary,
                        barColorPrimary: classes.barColorPrimary,
                      }}
                    />
                  </Box>
                  <Box sx={{ minWidth: 35 }}>
                    <Typography
                      variant='body2'
                      color='text.secondary'
                      className={classes.progressLabel}
                    >{`${Math.floor(progress)} OF ${maxProgress}`}</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default withSize()(SurveyPopup);
