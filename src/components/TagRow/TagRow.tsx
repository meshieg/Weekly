import "./TagRow.css";
import Tag from "../Tag/Tag";
import { IconButton } from "@mui/material";
import { DeleteOutlined as Delete } from "@mui/icons-material";

interface ITagProps {
    tag: ITag;
    tagWidth: string;
    onTagClick: (tag: ITag) => void;
    onTagDelete?: (tagId: number) => void;
}

const TagRow: React.FC<ITagProps> = ({tag, tagWidth, onTagClick, onTagDelete}) => {
    return (
        <div className="tag-row">
            <div className="tag-details" onClick={() => onTagClick(tag)}>
                <Tag width={tagWidth} color={tag.color} />
                <span className="tag-title">
                    {tag.name}
                </span>
            </div>
            {onTagDelete ?
            <IconButton onClick={() => onTagDelete(tag.id)} >
                <Delete />
            </IconButton> : 
            <></> }
        </div>
    );
}

export default TagRow;