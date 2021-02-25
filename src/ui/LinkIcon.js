import React from "react";
import PageViewIcon from "@material-ui/icons/Pageview";

const LinkIcon = ({
  title,
  href,
  target="_blank",
  style={},
  astyle={},
  color="green",
  width=0,
  Icon=PageViewIcon
}) => {

  if (width > 0) {
    style.width = width;
  }

  return (
    <div style={{...styles.row, ...style}}>
      {title && <label style={styles.title}>{title}</label>}
      <a
        href={href}
        target={target}
        astyle={{...astyle}}
      >
        <Icon style={{color: color}} />
      </a>
    </div>
  );
};

const styles = {
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
    margin: 1
  },
  title: {
    marginRight: 10,
    width: "100%",
  }
}


export default LinkIcon;
