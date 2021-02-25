import React from "react";
import IconButton from "@material-ui/core/IconButton";
import ViewIcon from "@material-ui/icons/ViewModule";

const PreviewButton = ({
  action,
  visible = true,
  disabled = false,
  ...rest
}) => {
  if (!visible) return null;

  return (
    <IconButton
      onClick={action}
      color="primary"
      aria-label="edit"
      disabled={disabled}
      {...rest}
    >
      <ViewIcon />
    </IconButton>
  );
};

export default PreviewButton;
