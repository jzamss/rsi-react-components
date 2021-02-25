import React from "react";

const Error = ({ msg }) => {
  if (!msg) return null;
  return (
    <div style={styles.container}>
      <label style={styles.error}>{msg}</label>
    </div>
  );
};

const styles = {
  container: {
    padding: 5,
    border: "1px solid #ccc",
    backgroundColor: "#f6ed95",
    marginBottom: 20,
    borderRadius: 3
  },
  error: {
    color: "#FF0033",
    fontWeight: "bold"
  }
};

export default Error;
