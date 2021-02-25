import React from "react";
import { makeId } from "../lib/util";

const getNewChildProps = (item, child, rest) => {
  const newProps = { ...rest };
  if (child.props) {
    const { expr } = child.props;
    if (expr) {
      newProps.exprValue = item[expr].toString();
    }
  }
  return newProps;
};

const buildChildren = (item, props) => {
  const newChildren = [];
  if (props.children) {
    const { children, ...rest } = props;
    React.Children.forEach(children, (child, idx) => {
      if (typeof child === "function") {
        newChildren.push(child({ ...rest, item }));
      } else {
        const newProps = getNewChildProps(item, child, rest);
        const childrenList = buildChildren(item, child.props);
        newProps.key = makeId();
        const newChild = React.cloneElement(child, newProps, childrenList);
        newChildren.push(newChild);
      }
    });
  }
  return newChildren;
};

const List = (props) => {
  const { items, children, ...rest } = props;
  const newChildren = [];
  items.forEach((item) => {
    if (typeof children === "function") {
      newChildren.push(children({ ...rest, item }));
    } else {
      newChildren.push(buildChildren(item, props));
    }
  });
  return <div style={{ ...props.style }}>{newChildren}</div>;
};

export default List;
