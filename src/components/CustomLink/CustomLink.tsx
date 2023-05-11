import "./CustomLink.css";

interface IProps {
  text: string;
  onPress: () => void;
}

const CustomLink: React.FC<IProps> = (props) => {
  const { text, onPress } = props;

  const handleClick = () => {
    onPress();
  };

  return (
    <div className="link" onClick={handleClick}>
      {text}
    </div>
  );
};

export default CustomLink;
