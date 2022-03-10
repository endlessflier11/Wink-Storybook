/* eslint-disable jsx-a11y/img-redundant-alt */
import { memo } from 'react';
import { Typography } from '@material-ui/core';

import { useStyles } from './styles';
import {
  primaryFont as primaryFontData,
  primaryColor as primaryColorData,
} from '../../../data/common';
import SurveyPopup from './SurveyPopup';

function InternProductMobileView({
  product,
  currentUser,
  openSurveyDialog,
  setOpenSurveyDialog,
  options,
  setOptions,
  onClickSurvey,
  progress,
  maxProgress,
  processState,
  onSelectOption,
  onClickFinish,
  ...props
}) {
  const primaryColor = props.theme?.primaryColor || primaryColorData;
  const classes = useStyles({
    isMobile: true,
    primaryFont: props.theme?.primaryFont || primaryFontData,
    primaryColor,
  });

  return (
    <>
      <div className={classes.internCardContainer}>
        <div className={classes.imageContainer}>
          <img src={product.image} alt='No Image' className={classes.image} />
          {product.rating_count > 0 && (
            <div className={classes.favoriteWrapper}>
              <div className={classes.favoriteContainer}>
                <Typography className={classes.favoriteLabel}>
                  {product.rating_count}
                </Typography>
              </div>
            </div>
          )}
          <div className={classes.yourtakeContainer}>
            <div className={classes.yourtakeWrapper}>
              <img
                src='/assets/images/product_color_favorite.png'
                alt='favorite'
                style={{ marginTop: 25 }}
              ></img>
              <Typography className={classes.whatyourtake}>
                What's your take?!
              </Typography>
              <div
                className={classes.startButton}
                onClick={() => onClickSurvey()}
              >
                START
              </div>
            </div>
          </div>
        </div>
      </div>

      {openSurveyDialog && (
        <SurveyPopup
          product={product}
          progress={progress}
          maxProgress={maxProgress}
          options={options}
          setOptions={setOptions}
          onClose={() => setOpenSurveyDialog(false)}
          processState={processState}
          onSelectOption={onSelectOption}
          onClickFinish={onClickFinish}
          {...props}
        />
      )}
    </>
  );
}

export default memo(InternProductMobileView);
