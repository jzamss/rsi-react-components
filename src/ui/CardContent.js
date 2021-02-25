import React from "react";
import { CardContent as MuiCardContent } from "@material-ui/core";

const CardContent = ({ children }) => {
  return (
    <MuiCardContent style={{ alignItems: "center" }}>{children}</MuiCardContent>
  );
};

export default CardContent;
