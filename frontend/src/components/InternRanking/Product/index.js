/* eslint-disable jsx-a11y/img-redundant-alt */
import { memo, useEffect, useRef, useState } from 'react';

import InternProductView from './ProductView';
import InternProductMobileView from './ProductMobileView';
import { isStorybook } from '../../../utils';

const OPTIONS = [
  { label: 'NO WAY!', percent: 20, selected: false },
  { label: 'NOT REALLY!', percent: 15, selected: false },
  { label: 'MEH?', percent: 20, selected: false },
  { label: 'YES-ISH', percent: 45, selected: false },
  { label: 'SPOT ON!', percent: 30, selected: false },
];

const MAX_PROGRESS = 2;

export const OPTION_STATE = {
  IDLE: 0,
  NEXT: 1,
  FINISH: 2,
};

function InternProduct({
  isMobile,
  productData,
  onShowProductDetail,
  searchFriends,
  tagFriend,
  unTagFriend,
  onSaveAnswers,
  // onChanageProducts,
  ...props
}) {
  const [product, setProduct] = useState(productData || null);
  const [openSurveyDialog, setOpenSurveyDialog] = useState(false);
  const [options, setOptions] = useState(OPTIONS);
  const [processState, setProcessState] = useState(OPTION_STATE.IDLE);
  const timerRef = useRef(null);
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    if (isStorybook()) {
      setProduct({
        ...productData,
        ranks: productData.id % 2 === 0 ? 0 : productData.id,
      });
    }
  }, [productData]);

  useEffect(() => {
    if (processState === OPTION_STATE.NEXT) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        if (progress < MAX_PROGRESS) setProgress(progress + 0.1);
        if (progress >= MAX_PROGRESS) setProcessState(OPTION_STATE.FINISH);
      }, 200);
    }
  }, [progress, processState]);

  const handleClickSurvey = () => {
    setOpenSurveyDialog(true);
  };

  const handleSelectOption = () => {
    if (processState === OPTION_STATE.NEXT) return;
    if (processState === OPTION_STATE.FINISH) {
      setProcessState(OPTION_STATE.IDLE);
      setProgress(1);
      return;
    }
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      setProcessState(OPTION_STATE.NEXT);
    }, 100);
  };

  const handleClickFinish = () => {
    setProcessState(OPTION_STATE.IDLE);
    setProgress(1);
    setOpenSurveyDialog(false);
    const newOptions = options.map((item) => ({ ...item, selected: false }));
    setOptions(newOptions);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };
console.log('product=', product);
  if (!isMobile) {
    return (
      <InternProductView
        key={`prdouct-card-view-${product?.id}`}
        product={product}
        currentUser={props.currentUser}
        openSurveyDialog={openSurveyDialog}
        setOpenSurveyDialog={setOpenSurveyDialog}
        options={options}
        setOptions={setOptions}
        onClickSurvey={handleClickSurvey}
        progress={progress}
        maxProgress={MAX_PROGRESS}
        processState={processState}
        onSelectOption={handleSelectOption}
        onClickFinish={handleClickFinish}
        {...props}
      />
    );
  }

  return (
    <InternProductMobileView
      key={`prdouct-card-view-${product?.id}`}
      product={product}
      currentUser={props.currentUser}
      openSurveyDialog={openSurveyDialog}
      setOpenSurveyDialog={setOpenSurveyDialog}
      options={options}
      setOptions={setOptions}
      onClickSurvey={handleClickSurvey}
      progress={progress}
      maxProgress={MAX_PROGRESS}
      processState={processState}
      onSelectOption={handleSelectOption}
      onClickFinish={handleClickFinish}
      {...props}
    />
  );
}

export default memo(InternProduct);
