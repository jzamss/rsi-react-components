import React, { useRef } from "react";
import { FormSpy as RFFormSpy } from "react-final-form";

const FormSpy = ({ subscription }) => {
  return <RFFormSpy subscription={subscription} />;
};

export default FormSpy;
