import React from "react";
import MuiButton from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    textTransform: "none",
    margin: theme.spacing(0.5),
  },
}));

const Button = ({
  caption,
  action,
  variant = "contained",
  color = "primary",
  size = "small",
  submitting,
  children,
  visible = true,
  disabled = false,
}) => {
  const classes = useStyles();
  if (!visible) return null;
  return (
    <MuiButton
      className={classes.button}
      onClick={action}
      variant={variant}
      color={color}
      size={size}
      endIcon={submitting && <CircularProgress size={18} color="secondary" />}
      disabled={disabled || submitting}
    >
      {caption || children}
    </MuiButton>
  );
};

export default Button;
