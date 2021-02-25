import React from "react";

const getUserStyle = ({
  width,
  center = false,
  row = false
}) => {
  let style = {};
  if (width) {
    style.width = width;
  }
  if (row) {
    style.display = "flex";
    style.flexDirection = "row";
    style.alignItems = "center";
  }
  if (center) {
    style = {...style, ...styles.center};
  }
  return style;
};

const Panel = ({
  children,
  visibleWhen = true,
  row = false,
  ...rest
}) => {
  if (!visibleWhen) return null;

  const userStyle = getUserStyle({...rest, row});
  return (
    <div style={{ ...styles.panel, ...userStyle, ...rest.style }} {...rest}>
      {children}
    </div>
  );
};

const styles = {
  panel: {
    display: "flex",
    flexDirection: "column",
  },
  center: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
};

export default Panel;
