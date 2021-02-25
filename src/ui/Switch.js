import React from "react";
import { Switches } from "mui-rff";

const Switch = ({ name, caption, visible = true, disabled = false, data }) => {
  if (!visible) return null;

  let switchData;
  if (Array.isArray(data)) {
    switchData = data;
  } else {
    switchData = [{ label: caption }];
  }

  return (
    <Switches
      label={switchData.length === 1 ? null : caption}
      name={name}
      data={switchData}
      disabled={disabled}
    />
  );
};

export default Switch;
