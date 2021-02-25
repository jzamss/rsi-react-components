import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import ActionBar from "./ActionBar";
import Button from "./Button";

const Modal = ({ caption, children, open, onAccept, onCancel, showActions=true }) => {
  return (
    <Dialog open={open}>
      <DialogTitle>{caption}</DialogTitle>
      <DialogContent>
        {children}
        {showActions &&
          <ActionBar>
            <Button variant="text" caption="Cancel" onClick={onCancel} />
            <Button caption="OK" onClick={onAccept} />
          </ActionBar>
        }
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
