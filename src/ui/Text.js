import React from "react";
import { Field } from "react-final-form";
import TextField from "@material-ui/core/TextField";

const Text = ({
  name,
  caption,
  placeholder,
  visible = true,
  required = false,
  disabled = false,
  readOnly = false,
  fullWidth = true,
  textCase = "UPPER",
  type = "text",
  autoFocus = false,
}) => {
  if (!visible) return null;

  const handleChange = (input, e) => {
    if (/upper/i.test(textCase)) {
      e.target.value = e.target.value.toUpperCase();
    } else if (/lower/i.test(textCase)) {
      e.target.value = e.target.value.toLowerCase();
    } else if (!/mixed/i.test(textCase)) {
      e.target.value = e.target.value.toUpperCase();
    }
    input.onChange(e);
  };

  return (
    <Field name={name} subscribe={{ touched: true, error: true }}>
      {({ input, meta }) => (
        <TextField
          {...input}
          label={caption}
          disabled={disabled}
          required={required}
          placeholder={placeholder || caption}
          error={meta.touched && meta.error != null}
          helperText={meta.touched && meta.error != null ? meta.error : null}
          fullWidth={fullWidth}
          onChange={(e) => handleChange(input, e)}
          type={type}
          autoFocus={autoFocus}
          InputProps={{
            readOnly
          }}
        />
      )}
    </Field>
  );
};

export default Text;
