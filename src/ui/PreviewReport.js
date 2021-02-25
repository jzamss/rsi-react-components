import React from "react";
import ButtonLink from "./ButtonLink";
import IconButton from "@material-ui/core/IconButton";
import PageviewIcon from "@material-ui/icons/Pageview";

const PreviewReport = ({
  caption = "Preview",
  href,
  visible = true,
  Icon = PageviewIcon,
  target = "_blank",
}) => {
  if (!visible) return null;

  if (caption) {
    return <ButtonLink caption={caption} href={href} Icon={Icon} />;
  } else {
    return (
      <IconButton
        size="small"
        href={href}
        color="primary"
        aria-label="Preview Report"
        target={target}
      >
        <PageviewIcon />
      </IconButton>
    );
  }
};

export default PreviewReport;
