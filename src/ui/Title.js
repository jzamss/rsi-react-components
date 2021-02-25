import React from "react";
import { Box } from "@material-ui/core";

const Title = ({ caption, exprValue, children, ...rest }) => {
  return (
    <Box fontSize="1.7em" fontWeight="bold" {...rest}>
      {caption || exprValue || children}
    </Box>
  );
};

export default Title;
