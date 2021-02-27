import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import MuiCheckbox from "@material-ui/core/Checkbox";

const Checkbox = ({
  context,
  name,
  expr,
  checked,
  caption,
  onChange,
  visible = true,
  disabled = false, 
  readOnly = false,
}) => {

  if (!visible) return null;

  const handleChange = (evt) => {
    onChange(!checked);
  }

  return (
    <FormControlLabel
      control={
        <MuiCheckbox
          checked={checked}
          disabled={disabled}
          onChange={handleChange}
          readOnly={readOnly}
        />
      }
      label={caption}
    />
  );
};

export default Checkbox;
