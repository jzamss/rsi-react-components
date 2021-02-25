import React from "react";
import { TextField } from "@material-ui/core";
import { Field } from "react-final-form";
import MaskedInput from "react-text-mask";

function PhoneNoMask(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        "(",
        /\d/,
        /\d/,
        /\d/,
        ")",
        " ",
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ]}
      placeholderChar={"\u2000"}
      {...other}
    />
  );
}

const PhoneNo = ({
  name,
  caption = "Phone No.",
  placeholder,
  visible = true,
  required = false,
  disabled = false,
  fullWidth = true,
}) => {
  if (!visible) return null;

  return (
    <Field name={name}>
      {({ input, meta }) => (
        <TextField
          id={name}
          {...input}
          label={caption}
          disabled={disabled}
          required={required}
          placeholder={placeholder || caption}
          error={meta.touched && meta.error != null}
          helperText={meta.touched && meta.error != null ? meta.error : null}
          fullWidth={fullWidth}
          InputProps={{
            inputComponent: PhoneNoMask,
          }}
        />
      )}
    </Field>
  );
};

export default PhoneNo;
