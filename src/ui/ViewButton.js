import React from "react";
import IconButton from '@material-ui/core/IconButton';
import ViewIcon from '@material-ui/icons/Pageview';

const ViewButton = ({
  action,
  visibleWhen = true,
  disableWhen = false,
  ...rest
}) => {
  if (!visibleWhen) return null;

  return (
    <IconButton
      onClick={action}
      aria-label="view"
      disabled={disableWhen}
      {...rest}
    >
      <ViewIcon style={{color: "green", ...rest.iconStyle}} />
    </IconButton>
  );
};

export default ViewButton;
