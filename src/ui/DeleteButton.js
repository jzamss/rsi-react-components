import React from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

const DeleteButton = ({
  caption = "Delete",
  action,
  visible = true,
  disabled = false,
  iconSize = "small",
}) => {
  if (!visible) return null;

  return (
    <IconButton
      onClick={action}
      color="secondary"
      aria-label="delete"
      disabled={disabled}
    >
      <DeleteIcon fontSize={iconSize} />
    </IconButton>
  );
};

export default DeleteButton;
