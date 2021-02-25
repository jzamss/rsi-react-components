import React from "react";
import ButtonLink from "./ButtonLink";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";

const DownloadReport = ({
  caption = "Download",
  href,
  visibleWhen = true,
  Icon = CloudDownloadIcon,
}) => {
  if (!visibleWhen) return null;

  return <ButtonLink caption={caption} href={href} Icon={Icon} />;
};

export default DownloadReport;
