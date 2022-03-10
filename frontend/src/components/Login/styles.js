import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  paper: ({ isMobile }) => ({
    margin: isMobile && '0px 20px',
    width: isMobile && '100%',
    height: '473px',
    background: '#FFF',
    border: '0.5px solid #D8D8D8',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.03)',
  }),
  advancedPaper: ({ isMobile }) => ({
    margin: isMobile && '0px 20px',
    width: isMobile && '100%',
    height: '564px',
    background: '#FFF',
    border: '0.5px solid #D8D8D8',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.03)',
  }),
  container: ({ isMobile }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: isMobile ? 'calc(100%)' : '350px',
    height: isMobile ? '100%' : '473px',
  }),
  logoContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '46px',
  },
  titleLabel: ({ primaryFont }) => ({
    ...primaryFont,
    fontWeight: 300,
    fontSize: '20px',
  }),
  divideLine: {
    width: 'calc(100% - 4px)',
    border: '0.5px solid #E6E6E6',
    marginTop: '16px',
  },
  inputContainer: ({ isMobile }) => ({
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    width: 'calc(100% - 40px)',
    marginTop: '44px',
  }),
  inputField: ({ primaryFont, primaryColor }) => ({
    ...primaryFont,
    fontWeight: 300,
    fontSize: 14,
    color: '#464545',
    width: 'calc(100% - 40px)',
    height: '44px',
    border: '1px solid #FAFAFA',
    paddingLeft: '28px',
    background: '#FAFAFA',
    borderRadius: '4px',
    '&:hover': {
      transition: '0.1s ease-in',
      // border: '1px solid darken($light-gray, 15%)',
    },
    '&:focus': {
      border: `solid 1px ${primaryColor}`,
    },
    '&:focus-visible': {
      border: `solid 1px ${primaryColor}`,
      outline: 'none !important',
      // boxShadow: '0 0 10px #719ECE',
    },
  }),
  invalidInput: {
    border: 'solid 1px #d32f2f !important',
    '&::placeholder': {
      color: '#d32f2f !important',
    },
    '&:-ms-input-placeholder': {
      color: '#d32f2f !important',
    },
    '&::-ms-input-placeholder': {
      color: '#d32f2f !important',
    },
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  footer: {
    position: 'absolute',
    width: '100%',
    height: '43px',
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    background: '#FAFAFA',
  },
  colorPrimary: {
    background: '#E6E6E6 !important',
  },
  barColorPrimary: {
    background: '#EFD34F !important',
  },
  forgotLabel: ({ isMobile, primaryFont }) => ({
    ...primaryFont,
    fontSize: isMobile && '12px',
    fontWeight: 400,
    color: '#464545',
    textDecoration: 'underline',
    cursor: 'pointer',
    '&:hover': {
      filter: 'brightness(0.8)',
    },
  }),
  fileInput: {
    display: 'none',
  },
  avatar: {
    marginTop: 0,
  },
  cropper: {
    position: 'relative',
    marginBottom: '15px',
  },
  cloudIcon: {
    fontSize: '22px',
  },
  cloudUpload: ({ cropTool }) => ({
    color: '#e8e8e8',
    position: 'absolute',
    bottom: cropTool ? '50px' : '16px',
    right: '16px',
    zIndex: 10,
    cursor: 'pointer',
  }),
  unselectedGender: ({ isMobile }) => ({
    display: 'flex',
    alignItems: 'center',
    width: 'calc(100% - 25px)',
    height: '48px',
    margin: '6px 0px',
    background: '#FAFAFA',
    borderRadius: '4px',
  }),
  selectedGender: {
    border: '1px solid #9DB5C9',
  },
  genderLabel: ({ primaryFont }) => ({
    ...primaryFont,
    fontWeight: 300,
    fontSize: '14px',
    color: '#464545',
    marginLeft: '28px',
  }),
});
