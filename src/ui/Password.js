import React from "react";
import Text from "./Text";

const Password = ({
  name,
  caption = "Password",
  visible = true,
  disabled = false,
  fullWidth = true,
}) => {
  if (!visible) return null;

  return (
    <Text
      name={name}
      caption={caption}
      fullWidth={fullWidth}
      type="password"
      disabled={disabled}
      textCase="mixed"
    />
  );
};

export default Password;
