import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card as MuiCard, createStyles } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(1),
      paddingBottom: theme.spacing(2),
    },
    title: {
      paddingTop: theme.spacing(1),
      paddingLeft: theme.spacing(2),
    },
  })
);

const Card = ({ caption, children }) => {
  const classes = useStyles();
  return (
    <MuiCard className={classes.root}>
      {caption && (
        <Typography variant="h6" component="h3" className={classes.title}>
          {caption}
        </Typography>
      )}
      <CardContent>{children}</CardContent>
    </MuiCard>
  );
};

export default Card;
