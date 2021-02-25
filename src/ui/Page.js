import React from "react";
import styles from "./Page.module.css";

const getChildren = ({ children }) => {
  const comps = {
    header: null,
    left: null,
    center: null,
    right: null,
    footer: null,
  };
  React.Children.forEach(children, (child) => {
    if (child) {
      let target = child.props.target || "center";
      if (!comps[target]) comps[target] = [];
      comps[target].push(child);
    }
  });
  return comps;
};

const Page = (props) => {
  const { left, center, right } = getChildren(props);
  return (
    <div className={styles.template}>
      <div className={styles.content}>
        <div className={styles.panel}>
          <aside className={`${styles.aside} ${styles.aside_left}`}>
            <div style={{position: "fixed"}}>{left}</div>
          </aside>
          <div className={styles.main}>
          {center}
          </div>
          <aside className={`${styles.aside} ${styles.aside_right}`}>{right}</aside>
        </div>
      </div>
    </div>
  );
};

export default Page;
