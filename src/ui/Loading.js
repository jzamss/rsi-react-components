import React from "react";
import CircularProgress from "./CircularProgress";

const Loading = ({ visibleWhen = true, showMessage=true, ...rest }) => {
  if (!visibleWhen) return null;

  const msg = rest.msg || "Processing...";
  return (
    <div style={styles.container}>
      <div style={styles.progress}>
        <CircularProgress size={16} color="secondary" {...rest} />
      </div>
      {showMessage &&
        <div style={styles.msg}>{msg}</div>
      }
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 5
  },
  progress: {
    paddingRight: 10
  },
  msg: {
    color: "#f50057"
  }
};

export default Loading;
