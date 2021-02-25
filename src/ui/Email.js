import React from "react";
import Text from "./Text";

const Email = ({
  name,
  caption = "Email",
  placeholder,
  visible = true,
  required = false,
  disabled = false,
  fullWidth = true,
  helperText,
}) => {
  if (!visible) return null;

  return (
    <Text
      name={name}
      caption={caption}
      label={caption}
      disabled={disabled}
      required={required}
      placeholder={placeholder}
      fullWidth={fullWidth}
      type="email"
      textCase="LOWER"
      helperText={helperText}
    />
  );
};

export default Email;
