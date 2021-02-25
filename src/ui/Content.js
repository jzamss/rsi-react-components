import React from "react";
import { Container } from "@material-ui/core";

const styles = {
  root: {
    padding: 0
  },
  center: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
};

const getStyle = (props) => {
  const localStyle = {};
  if (props.width) localStyle.width = props.width;
  const centerStyle = props.center ? styles.center : {};
  return { ...styles.root, ...centerStyle, ...localStyle, ...props.style };
};

const Content = ({ children, center = false, width, ...rest }) => {
  return (
    <Container {...rest} style={getStyle({ center, width })}>
      {children}
    </Container>
  );
};

export default Content;
