import React from "react";
import { CardActions as MuiCardActions } from "@material-ui/core";

const CardActions = ({ children }) => {
  return <MuiCardActions>{children}</MuiCardActions>;
};

export default CardActions;
