import React from "react";
import { FormGroup } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: { flexWrap: "flex" }
}));
const Group = ({ children, ...rest }) => {
  const classes = useStyles();

  return (
    <FormGroup className={classes.root} {...rest}>
      {children}
    </FormGroup>
  );
};

export default Group;
