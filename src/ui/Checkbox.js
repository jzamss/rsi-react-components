import React from "react";
import { Checkboxes } from "mui-rff";

const Checkbox = ({
  name,
  caption,
  data,
  visible = true,
  disabled = false,
}) => {
  if (!visible) return null;
  let checkboxesData;
  if (Array.isArray(data)) {
    checkboxesData = data;
  } else {
    checkboxesData = [{ label: caption }];
  }

  return (
    <Checkboxes
      label={checkboxesData.length === 1 ? null : caption}
      name={name}
      disabled={disabled}
      data={checkboxesData}
    />
  );
};

export default Checkbox;
