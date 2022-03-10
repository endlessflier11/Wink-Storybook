import {
  Tooltip,
  Button,
  withStyles,
  makeStyles,
  TextField,
} from '@material-ui/core';

const brandColor = '#9DB5C9';

export const StyledTooltip = withStyles({
  tooltip: {
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0.85)',
    fontWeight: 'bold',
  },
})(Tooltip);

export const StyledButton = withStyles(props => {
  const propsColor = props?.background;
  const backgroundColor = propsColor ? propsColor : brandColor;
  return {
  root: {
      background: backgroundColor,
    '&:hover': {
        background: backgroundColor,
    },
  },
  };
})(Button);

const useTextFieldStyles = makeStyles({
  root: {
    '& input::placeholder': {
      fontSize: '12px',
      fontFamily: 'Brandon Grotesque, sans serif',
    },
    '&$cssFocused $notchedOutline': {
      borderColor: brandColor,
    },
  },
  cssFocused: {},
  notchedOutline: {},
});

export const StyledTextField = (props) => {
  const classes = useTextFieldStyles();
  return (
    <TextField
      {...props}
      InputProps={{
        classes: {
          root: classes.root,
          focused: classes.cssFocused,
          notchedOutline: classes.notchedOutline,
        },
      }}
    />
  );
};
