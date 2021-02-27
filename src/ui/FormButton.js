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

const FormButton = ({
  action,
  caption = "Submit",
  variant = "contained",
  color = "primary",
  size = "small",
  children,
  visible = true,
  disabled = false
}) => {
  const form = useForm();
  const formState = useFormState();
  const classes = useStyles();
  
  if (!visible) return null;

  const handleClick = () => {
    action({data: formState.values, form,  formState});
  }

  return (
    <MuiButton
      className={classes.button}
      onClick={handleClick}
      variant={variant}
      color={color}
      size={size}
      endIcon={
        form.submitting && <CircularProgress size={18} color="secondary" />
      }
      disabled={disabled || form.submitting}
    >
      {caption || children}
    </MuiButton>
  );
};

export default FormButton;
