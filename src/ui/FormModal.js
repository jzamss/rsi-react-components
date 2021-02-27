import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import Form from "./Form";
import ActionBar from "./ActionBar";
import Button from "./Button";
import Submit from "./Submit";
import FormButton from "./FormButton";

const FormModal = ({
  initialData,
  caption,
  children,
  open,
  onAccept,
  onCancel,
  showActions = true
}) => {
  
  const handleAccept = ({data}) => {
    onAccept(data)
  }

  return (
    <Form initialData={initialData}>
      <Dialog open={open}>
        <DialogTitle>{caption}</DialogTitle>
        <DialogContent>
          {children}
          {showActions && (
            <ActionBar>
              <Button variant="text" caption="Cancel" action={onCancel} />
              <FormButton caption="OK" action={handleAccept} />
            </ActionBar>
          )}
        </DialogContent>
      </Dialog>
    </Form>
  );
};

export default FormModal;
