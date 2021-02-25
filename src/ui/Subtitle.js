import React from "react";

const Subtitle = ({ caption, title, children }) => {
  return <div style={styles.title}>{caption || title || children}</div>;
};

const styles = {
  title: {
    paddingTop: "10px",
    paddingBottom: "5px",
    color: "#27ae60",
    fontSize: 20,
    fontWeight: "bold",
  },
};

export default Subtitle;
