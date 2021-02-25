import React from "react";
import MuiCircularProgress from "@material-ui/core/LinearProgress";

const LinearProgress = ({ visibleWhen = true, ...rest }) => {
  if (!visibleWhen) return null;
  return <MuiCircularProgress {...rest} />;
};

export default LinearProgress;
