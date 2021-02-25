import React from "react";
import { Radios } from "mui-rff";

const Radio = ({ name, caption, visible = true, disabled = false, data }) => {
  if (!visible) return null;

  return <Radios label={caption} name={name} disabled={disabled} data={data} />;
};
export default Radio;
