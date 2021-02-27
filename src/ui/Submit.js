import React from "react";
import MuiButton from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { useForm, useFormState } from "react-final-form";

const useStyles = makeStyles((theme) => ({
  button: {
    textTransform: "none",
    margin: theme.spacing(0.5)
  }
}));

const Submit = ({
  caption = "Submit",
  variant = "contained",
  color = "primary",
  size = "small",
  children,
  visible = true,
  disabled = false,
  submitting = false
}) => {
  const classes = useStyles();

  if (!visible) return null;

  const form = useForm();

  return (
    <MuiButton
      className={classes.button}
      type="submit"
      variant={variant}
      color={color}
      size={size}
      endIcon={submitting && <CircularProgress size={18} color="secondary" />}
      disabled={disabled || form.submitting}
    >
      {caption || children}
    </MuiButton>
  );
};

export default Submit;
