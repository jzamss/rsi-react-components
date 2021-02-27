import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const makeClasses = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5)
  },
  caption: {
    fontWeight: "700",
    fontSize: 14,
    width: 200
  },
  label: {
    fontSize: "14px"
  }
}));

const Label = ({
  name,
  expr,
  caption,
  context,
  children,
  visible = true,
  containerStyle = {},
  captionStyle = {},
  labelStyle = {}
}) => {
  if (!visible) return null;

  const classes = makeClasses();

  let value = children;
  if (context && name) {
    value = typeof expr === "function" ? expr(context) : context[name];
  }

  return (
    <div className={classes.wrapper} style={{ ...containerStyle }}>
      {caption && (
        <label className={classes.caption} style={{ ...captionStyle }}>
          {caption}
        </label>
      )}
      <label className={classes.label} style={{ ...labelStyle }}>
        {value}
      </label>
    </div>
  );
};

export default Label;
