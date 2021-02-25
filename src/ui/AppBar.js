import React from "react";
import MuiAppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#2c3e50",
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
}));

const AppBar = ({ style, children }) => {
  const classes = useStyles();
  return (
    <MuiAppBar
      variant="outlined"
      position="static"
      className={classes.root}
      style={{ ...style }}
    >
      {children}
    </MuiAppBar>
  );
};

export default AppBar;
