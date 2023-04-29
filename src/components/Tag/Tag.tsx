import React from "react";
import "./Tag.css";

interface ITagProps {
  width: string;
  color?: string;
  onClick?: () => {};
}

const Tag: React.FC<ITagProps> = (props) => {
  return (
    <div
      className="tag"
      style={{ backgroundColor: props.color, width: props.width }}
    />
  );
};

export default Tag;
