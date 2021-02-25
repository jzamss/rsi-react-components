import React from "react";
import Button from "./Button";

const BackLink = ({
  caption,
  action,
  children,
  variant = "text",
  size = "medium",
}) => {
  return (
    <Button size={size} variant={variant} action={action}>
      {caption || children || "Back"}
    </Button>
  );
};

export default BackLink;
