import React from "react";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";

const EditButton = ({
  action,
  visibleWhen = true,
  disableWhen = false,
  iconSize = "small",
  ...rest
}) => {
  if (!visibleWhen) return null;

  return (
    <IconButton
      onClick={action}
      color="primary"
      aria-label="edit"
      disabled={disableWhen}
      {...rest}
    >
      <EditIcon fontSize={iconSize} />
    </IconButton>
  );
};

export default EditButton;
