import React, { useState, useRef } from "react";
import { Form, useForm, useFormState } from "react-final-form";
import {
  ActionBar,
  Submit,
  BackLink,
  Error,
  MsgBox,
  Title,
  Subtitle,
  Spacer,
  Card
} from ".";

const Wizard = ({
  initialData,
  onSubmit,
  children,
  showActionBar = true,
  showErrorDialog: initialShowErrorDialog = false,
  showFormData = false,
  visible = true,
  title,
  subtitle,
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
    error = false,
    showErrorDialog = false
  ) => {
    setErrorMsg(null);
    if (!error) {
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
      setErrorMsg(error);
    }
  };

  const handleFormSubmit = (values) => {
    if (formRef.current && !formRef.current.reportValidity()) {
      return;
    }

    const activePage = getActivePage();
    if (activePage.props.onSubmit) {
      activePage.props.onSubmit(values, onSubmitCallback, formApi.current);
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
    <Card>
      <Title>{title}</Title>
      <Subtitle>{subtitle || page && page.caption}</Subtitle>
    
    <Form
      initialValues={initialData}
      validate={validate}
      onSubmit={handleFormSubmit}
    >
      {({ handleSubmit, form, values }) => {
        formApi.current = form;

        return (
          <form ref={formRef} onSubmit={handleSubmit}>
            <Subtitle>{activePage.props.caption}</Subtitle>
            <Spacer />
            {!showErrorDialog && <Error msg={errorMsg} />}
            {showErrorDialog && showError && (
              <MsgBox open={showError} msg={errorMsg} onAccept={resetError} />
            )}
            {activePage}
            <Spacer />
            <ActionBar
              visible={
                activePage.props.showActionBar === undefined
                  ? showActionBar
                  : activePage.props.showActionBar
              }
            >
              {page === 0 && (
                <BackLink caption="Cancel" action={activePage.props.onCancel} />
              )}
              {page > 0 && <BackLink action={previous} />}
              {!isLastPage && (
                <Submit caption="Next" submitting={form.submitting} />
              )}
              {isLastPage && (
                <Submit caption="Submit" submitting={form.submitting} />
              )}
            </ActionBar>
            {showFormData && <pre>{JSON.stringify(values, null, 2)}</pre>}
          </form>
        );
      }}
    </Form>
    </Card>
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
