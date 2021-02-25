import React from "react";
import IconButton from "@material-ui/core/IconButton";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";

const PlayButton = ({
  action,
  visible = true,
  disabled = false,
  iconSize = "small",
  color = "green",
  ...rest
}) => {
  if (!visible) return null;

  return (
    <IconButton
      onClick={action}
      aria-label="play button"
      disabled={disabled}
      {...rest}
    >
      <PlayCircleFilledWhiteIcon fontSize={iconSize} htmlColor={color} />
    </IconButton>
  );
};

export default PlayButton;
