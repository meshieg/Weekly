import React from "react";
import "./Tag.css";

interface ITagProps {
  width: string;
  color?: string;
  label?: string;
  onClick?: () => void;
}

const Tag: React.FC<ITagProps> = (props) => {
  return (
    <div className="tag" style={{ width: props.width }} onClick={props.onClick}>
      <div
        className="tag__color"
        style={{ backgroundColor: props.color, width: props.width }}
      />
      {props.label && <span>{props.label}</span>}
    </div>
  );
};

export default Tag;
