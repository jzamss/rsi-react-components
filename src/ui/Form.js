import React, { useRef } from "react";
import { Form as RFForm } from "react-final-form";
import createDecorator from "final-form-focus";

const focusOnError = createDecorator();

const Form = ({
  initialValues,
  onSubmit,
  validate,
  component,
  render,
  children,
  decorators = [focusOnError],
}) => {
  const formRef = useRef();

  const handleFormSubmit = (entity) => {
    if (formRef.current && formRef.current.reportValidity()) {
      onSubmit(entity);
    }
  };

  return (
    <RFForm
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      validate={validate}
      component={component}
      render={render}
      decorators={decorators}
    >
      {(props) => (
        <form ref={formRef} onSubmit={props.handleSubmit}>
          {typeof children === "function" ? children(props) : children}
        </form>
      )}
    </RFForm>
  );
};

export default Form;
