import React, { useState } from "react";
import Modal from "react-modal";
import Button from "./Button";
import IconButton from "@material-ui/core/IconButton";

//item: title, icon, href

Modal.setAppElement('#root')

const ReportViewer = ({
  title,
  items,
  open,
  style,
  onClose,
  afterOpen=() => {}
}) => {
  const [href, setHref] = useState();

  const onSelectItem = (href) => {
    setHref(href);
  }

  return (
    <Modal isOpen={open} onAfterOpen={afterOpen} style={style}>
      <div style={styles.container}>
        <h2>{title}</h2>
        <Button caption="Close" action={onClose} />
        <div style={styles.viewerContainer}>
          <div style={styles.itemContainer}>
            {items.map((item,idx) => {
              const Icon = item.Icon;
              return (
                <div style={styles.item} key={idx} onClick={() => onSelectItem(item.href)}>
                  <Icon style={{ color: "green", fontSize: 32 }} />
                  <label style={styles.itemTitle}>{item.title}</label>
                </div>
              )
            })}
          </div>
          <div style={styles.viewer}>
              {href &&
                <iframe type="text/html" src={href} style={styles.frame} />
              }
          </div>
        </div>
      </div>
    </Modal>
  );
};

const styles ={
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    backgroundColor: "yellow",
  },
  viewerContainer: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    height: "100%",
    border: "1px solid #aaa",
  },
  itemContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 5,
    border: "1px solid #aaa",
    width: 100,
  },
  item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 5,
    margin: 5,
    width: "90%",
    cursor: "pointer",
  },
  itemTitle: {
    fontSize: 10,
  },
  viewer: {
    display: "flex",
    flex: 1,
  },
  frame: {
    width: "100%",
    height: "100%"
  },


}

export default ReportViewer;
