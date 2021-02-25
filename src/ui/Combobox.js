import React from "react";
import { Select } from "mui-rff";
import { MenuItem } from "@material-ui/core";

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
}) => {
  if (!visible) return null;

  return (
    <Select
      name={name}
      label={caption}
      helperText={helperText}
      fullWidth={fullWidth}
      disabled={disabled}
      required={required}
      renderValue={renderValue}
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
  );
};

export default Combobox;
