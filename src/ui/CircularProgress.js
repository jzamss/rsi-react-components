import React from "react";
import MuiCircularProgress from "@material-ui/core/CircularProgress";

const CircularProgress = ({ visibleWhen = true, ...rest }) => {
  if (!visibleWhen) return null;
  return <MuiCircularProgress {...rest} />;
};

export default CircularProgress;
