import React, { memo, forwardRef, useState, useRef } from 'react';
import { Dialog, Fade, Typography, useMediaQuery } from '@material-ui/core';
import { CloudUpload as CloudUploadIcon } from '@material-ui/icons';

import InputZipcode from './InputZipcode';
import LinearProgressbar from '../LinearProgressbar';
import { StyledButton } from '../styled';
import {
  primaryFont as primaryFontData,
  primaryColor as primaryColorData,
} from '../../data/common';
import { useStyles } from './styles';
import 'croppie/croppie.css';
import Croppie from 'croppie/croppie.js';
import UserService from '../../services/user.service';

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />;
});

function UploadPicture({ ...props }) {
  const primaryFont = props.theme?.primaryFont || primaryFontData;
  const primaryColor = props.theme?.primaryColor || primaryColorData;
  const isMobile = useMediaQuery('(max-width:600px)');

  const fileElem = useRef();
  const cropper = useRef();
  const cropTool = useRef();
  const [avatar, setAvatar] = useState(props.avatarFromProps);
  const [avatarFile, setAvatarFile] = useState(null);
  const [enableNextButton, setEnableNextButton] = useState(false);
  const [enableSaveButton, setEnableSaveButton] = useState(false);
  const [openZipcodePopup, setOpenZipcodePopup] = useState(false);

  const classes = useStyles({
    isMobile,
    primaryFont,
    primaryColor,
    cropTool: !!avatar,
  });

  const onDialogOpened = () => {
    cropTool.current = new Croppie(cropper.current, {
      viewport: {
        width: 200,
        height: 200,
        type: 'circle',
        border: '0px solid',
      },
      boundary: { width: 282, height: 276 },
      showZoomer: false,

      enableOrientation: false,
    });
    cropTool.current.bind({
      url: avatar
        ? avatar
        : 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMjEiIHZpZXdCb3g9IjAgMCAyMSAyMSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMC41IDIxQzE2LjI5OSAyMSAyMSAxNi4yOTkgMjEgMTAuNUMyMSA0LjcwMTAxIDE2LjI5OSAwIDEwLjUgMEM0LjcwMTAxIDAgMCA0LjcwMTAxIDAgMTAuNUMwIDE2LjI5OSA0LjcwMTAxIDIxIDEwLjUgMjFaIiBmaWxsPSIjREFEOURDIi8+CjxnIGNsaXAtcGF0aD0idXJsKCNjbGlwMCkiPgo8cGF0aCBkPSJNMTAuNDk5NyA1Ljc5MzFDOS4xMzEwNyA1Ljc5MzEgOC4wMTc1OCA2LjkwNjYgOC4wMTc1OCA4LjI3NTI1QzguMDE3NTggOS42NDM5MSA5LjEzMTA3IDEwLjc1NzQgMTAuNDk5NyAxMC43NTc0QzExLjg2ODQgMTAuNzU3NCAxMi45ODE5IDkuNjQzOTEgMTIuOTgxOSA4LjI3NTI1QzEyLjk4MTkgNi45MDY2IDExLjg2ODQgNS43OTMxIDEwLjQ5OTcgNS43OTMxWiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTEzLjU4ODUgMTIuMzc5QzEyLjkwODkgMTEuNjg5IDEyLjAwOCAxMS4zMDkgMTEuMDUxOCAxMS4zMDlIOS45NDg2MUM4Ljk5MjM4IDExLjMwOSA4LjA5MTQ4IDExLjY4OSA3LjQxMTkzIDEyLjM3OUM2LjczNTcgMTMuMDY1NiA2LjM2MzI4IDEzLjk3MiA2LjM2MzI4IDE0LjkzMTFDNi4zNjMyOCAxNS4wODM0IDYuNDg2NzYgMTUuMjA2OSA2LjYzOTA4IDE1LjIwNjlIMTQuMzYxM0MxNC41MTM2IDE1LjIwNjkgMTQuNjM3MSAxNS4wODM0IDE0LjYzNzEgMTQuOTMxMUMxNC42MzcxIDEzLjk3MiAxNC4yNjQ3IDEzLjA2NTYgMTMuNTg4NSAxMi4zNzlaIiBmaWxsPSJ3aGl0ZSIvPgo8L2c+CjxkZWZzPgo8Y2xpcFBhdGggaWQ9ImNsaXAwIj4KPHJlY3Qgd2lkdGg9IjkuNDEzNzkiIGhlaWdodD0iOS40MTM3OSIgZmlsbD0id2hpdGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDUuNzkyOTcgNS43OTMxKSIvPgo8L2NsaXBQYXRoPgo8L2RlZnM+Cjwvc3ZnPg==',
      //orientation: 4,
      zoom: avatar ? 0 : null,
    });
  };

  const handleGotoZipcode = () => {
    setOpenZipcodePopup(true);
  };

  const handleSavePicture = async () => {
    cropTool.current.result('base64').then(function (blob) {
      // UserService.saveAvatar(avatarFile.name, blob);
      setEnableNextButton(true);
      setEnableSaveButton(false);
      setAvatar('https://avataaars.io/');
    });
  };

  const loadPreview = (file) => {
    if (file && file.type.startsWith('image/')) {
      const img = document.createElement('img');
      img.classList.add('obj');
      img.file = file;
      cropTool.current.destroy();
      cropTool.current = new Croppie(cropper.current, {
        viewport: {
          width: 200,
          height: 200,
          type: 'circle',
          border: '0px solid',
        },
        boundary: { width: 282, height: 276 },
        showZoomer: true,

        enableOrientation: false,
      });
      if (cropTool.current) {
        cropTool.current.bind({
          url: window.URL.createObjectURL(file),
          orientation: 4,
        });
        setAvatar(window.URL.createObjectURL(file));
      }
      setAvatarFile(file);
    }
  };

  const handleAttachOnChange = () => {
    loadPreview(fileElem.current.files[0]);
    setEnableSaveButton(true);
  };

  const handleAttachClick = () => {
    fileElem.current.click();
  };

  if (openZipcodePopup) {
    return <InputZipcode {...props} avatar={avatar} />;
  }

  return (
    <Dialog
      open={true}
      classes={{ paper: classes.advancedPaper }}
      BackdropProps={{ style: { background: '#F1F4F9' } }}
      TransitionComponent={Transition}
      maxWidth='md'
      onEnter={onDialogOpened}
    >
      <div className={classes.container}>
        <div
          className={classes.logoContainer}
          style={{ marginTop: 31, flexDirection: 'column' }}
        >
          <img src={'/assets/images/black_heart.png'} alt='No Logo' />
          <Typography className={classes.titleLabel}>
            Upload your pic!
          </Typography>
        </div>
        <div className={classes.divideLine} />
        <div className={classes.inputContainer} style={{ marginTop: 19 }}>
          <input
            ref={fileElem}
            type='file'
            accept='image/*'
            className={classes.fileInput}
            onChange={handleAttachOnChange}
          />
          <div className={classes.avatar}>
            <div ref={cropper} className={classes.cropper}>
              <div className={classes.cloudUpload} onClick={handleAttachClick}>
                <div className={`material-icons ${classes.cloudIcon}`}>
                  <CloudUploadIcon
                    fontSize='medium'
                    style={{ color: '#BDBDBD' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.bottomContainer}>
          <div className={classes.footer}>
            <LinearProgressbar
              value={3}
              maxValue={5}
              primaryFont={primaryFont}
              colorPrimary={classes.colorPrimary}
              barColorPrimary={classes.barColorPrimary}
            />
          </div>
          {enableNextButton && (
            <StyledButton
              fullWidth
              variant='contained'
              color='primary'
              style={{ ...props.internButtonStyle, borderRadius: 0 }}
              onClick={handleGotoZipcode}
            >
              NEXT
            </StyledButton>
          )}
          {enableSaveButton && (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <StyledButton
                fullWidth
                variant='contained'
                color='primary'
                style={{
                  ...props.internButtonStyle,
                  marginBottom: 50,
                  width: 282,
                }}
                onClick={handleSavePicture}
              >
                SAVE
              </StyledButton>
            </div>
          )}
        </div>
      </div>
    </Dialog>
  );
}

export default memo(UploadPicture);
