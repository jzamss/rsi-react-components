import React from "react";
import { Radios } from "mui-rff";
import { useForm } from "react-final-form";

const Radio = ({
  name,
  caption,
  visible = true,
  disabled = false,
  data,
  listener,
}) => {
  if (!visible) return null;

  const form = useForm();

  const handleChange = (evt) => {
    const { value } = evt.target;
    form.change(name, value);
    if (typeof(listener) === "function") {
      listener(value, form)
    }
  }

  return (
    <Radios
      label={caption}
      name={name}
      disabled={disabled}
      data={data}
      onChange={handleChange}
    />
  );
};
export default Radio;
