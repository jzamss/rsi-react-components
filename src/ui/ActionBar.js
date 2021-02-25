import React from "react";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: theme.spacing(3),
    borderTop: "solid 1px lightgrey",
  },
  center: {
    flexDirection: "column",
  },
}));

const ActionBar = ({
  children,
  visible = true,
  disabled = false,
  center = false,
}) => {
  const classes = useStyles();

  if (!visible) return null;

  let classNames = `${classes.container}`;
  if (center !== undefined && center === true) {
    classNames = `${classNames} ${classes.center}`;
  }

  return (
    <Box pt={2} className={classNames} disabled>
      {disabled
        ? React.Children.map(children, (child) => {
            return React.cloneElement(child, { disabled });
          })
        : children}
    </Box>
  );
};

export default ActionBar;
