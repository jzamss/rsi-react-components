import React from "react";
import { Select } from "mui-rff";
import { MenuItem } from "@material-ui/core";
import { useForm } from "react-final-form";

const Combobox = ({
  name,
  caption,
  visible = true,
  disabled = false,
  required = false,
  items,
  renderValue,
  itemExpr,
  fullWidth = true,
  helperText,
  listener
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
    <React.Fragment>
      <Select
        name={name}
        label={caption}
        helperText={helperText}
        fullWidth={fullWidth}
        disabled={disabled}
        required={required}
        renderValue={renderValue}
        onChange={handleChange}
      >
        {items.map((item) => {
          const itemText =
            typeof itemExpr === "function" ? itemExpr(item) : item.toString();
          return (
            <MenuItem key={itemText} value={item}>
              {itemText}
            </MenuItem>
          );
        })}
      </Select>
    </React.Fragment>
  );
};

export default Combobox;
