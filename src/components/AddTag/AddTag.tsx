import { useState } from "react";
import Colorful from "@uiw/react-color-colorful";

interface ITagProps {
  color: string;
  setColor: any;
}
const AddTag = ({ color, setColor }: ITagProps) => {
  const [colorPicked, setColorPicked] = useState("#8a64d6");
  const onChangeColor = (color: any) => {
    setColorPicked(color.hex);
  };

  return (
    <>
      <Colorful color={color} disableAlpha={true} onChange={setColor} />
    </>
  );
};

export default AddTag;
