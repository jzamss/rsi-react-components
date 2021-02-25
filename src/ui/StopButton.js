import React from "react";
import IconButton from "@material-ui/core/IconButton";
import StopIcon from "@material-ui/icons/Stop";

const StopButton = ({
  action,
  visibleWhen = true,
  disableWhen = false,
  iconSize = "small",
  color="red",
  ...rest
}) => {
  if (!visibleWhen) return null;

  return (
    <IconButton
      onClick={action}
      aria-label="play button"
      disabled={disableWhen}
      {...rest}
    >
      <StopIcon fontSize={iconSize} htmlColor={color} />
    </IconButton>
  );
};

export default StopButton;
