import React, { useRef } from "react";
import { Form as RFForm } from "react-final-form";
import createDecorator from "final-form-focus";

const focusOnError = createDecorator();

const Form = ({
  initialData = {},
  onSubmit,
  validate,
  children,
  decorators = [focusOnError]
}) => {
  const formRef = useRef();
  const formApi = useRef();
  
  const handleFormSubmit = (data) => {
    if (formRef.current && formRef.current.reportValidity()) {
      if (typeof(onSubmit) === "function") {
        onSubmit(data, formApi.current);    
      }
    }
  };

  return (
    <RFForm
      onSubmit={handleFormSubmit}
      initialValues={initialData}
      validate={validate}
      decorators={decorators}
    >
      {(props) => {
        formApi.current = props.form;
        return (
          <form ref={formRef} onSubmit={props.handleSubmit}>
            {typeof children === "function" ? children(props) : children}
          </form>
        );
      }}
    </RFForm>
  );
};

export default Form;
