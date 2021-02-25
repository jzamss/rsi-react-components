import React, { useState, useRef } from "react";
import { Form, useForm, useFormState } from "react-final-form";
import ActionBar from "./ActionBar";
import SubmitButton from "./SubmitButton";
import BackLink from "./BackLink";
import Error from "./Error";
import MsgBox from "./MsgBox";

const Wizard = ({
  initialValues,
  onSubmit,
  children,
  showActionBar = true,
  showErrorDialog: initialShowErrorDialog = false,
  showFormData = false,
  visible = true
}) => {
  const [page, setPage] = useState(0);
  const [errorMsg, setErrorMsg] = useState();
  const [showError, setShowError] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(
    initialShowErrorDialog
  );
  const formRef = useRef();
  const formApi = useRef();

  if (!visible) return null;

  const next = () => {
    setPage(Math.min(page + 1, children.length - 1));
  };

  const previous = () => {
    setPage(Math.max(page - 1, 0));
  };

  const getActivePage = () => {
    return React.Children.toArray(children)[page];
  };

  const validate = (values) => {
    const activePage = getActivePage();
    return activePage.props.validate ? activePage.props.validate(values) : {};
  };

  const onSubmitCallback = (
    success = true,
    errorMsg,
    showErrorDialog = false
  ) => {
    setErrorMsg(null);
    if (success) {
      const values = formApi.current.getState().values;
      const isLastPage = page === React.Children.count(children) - 1;
      if (isLastPage) {
        onSubmit(values);
      } else {
        next(values);
      }
    } else {
      setShowErrorDialog(showErrorDialog);
      setShowError(true);
      setErrorMsg(errorMsg.toString());
    }
  };

  const handleFormSubmit = (values) => {
    if (formRef.current && !formRef.current.reportValidity()) {
      return;
    }

    const activePage = getActivePage();
    if (activePage.props.onSubmit) {
      activePage.props.onSubmit(
        { values, form: formApi.current },
        onSubmitCallback
      );
    } else {
      onSubmitCallback();
    }
  };

  const resetError = () => {
    setErrorMsg(null);
    setShowError(false);
  };

  const activePage = getActivePage();
  const isLastPage = page === React.Children.count(children) - 1;

  return (
    <Form
      initialValues={initialValues}
      validate={validate}
      onSubmit={handleFormSubmit}
    >
      {({ handleSubmit, form, values }) => {
        formApi.current = form;

        return (
          <form ref={formRef} onSubmit={handleSubmit}>
            {!showErrorDialog && <Error msg={errorMsg} />}
            {showErrorDialog && showError && (
              <MsgBox open={showError} msg={errorMsg} onAccept={resetError} />
            )}
            {activePage}
            <ActionBar visible={showActionBar}>
              {page === 0 && (
                <BackLink caption="Cancel" action={activePage.props.onCancel} />
              )}
              {page > 0 && <BackLink action={previous} />}
              {!isLastPage && <SubmitButton caption="Next" />}
              {isLastPage && <SubmitButton caption="Submit" />}
            </ActionBar>
            {showFormData && <pre>{JSON.stringify(values, null, 2)}</pre>}
          </form>
        );
      }}
    </Form>
  );
};

Wizard.Page = ({ children }) => {
  const form = useForm();
  const formState = useFormState();
  if (typeof children === "function") {
    return children({ form, values: formState.values });
  }
  return children;
};

export default Wizard;
