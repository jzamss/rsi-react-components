import React from "react";
import { OnChange as OnChangeListener } from "react-final-form-listeners";

const OnFieldChange = ({ name, onChange }) => {
  return (
    <OnChangeListener name={name}>
      {({ value, previous }) => onChange(value, previous)}
    </OnChangeListener>
  );
};

export default OnFieldChange;
