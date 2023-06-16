import "./TagsList.css";
import Tag from "../Tag/Tag";
import { IconButton } from "@mui/material";
import { DeleteOutlined as Delete } from "@mui/icons-material";

interface ITagsProps {
    tags: ITag[];
    onTagClick: (tag: ITag) => void;
    onTagDelete?: (tagId: number) => void;
}

const TagsList: React.FC<ITagsProps> = ({tags, onTagClick, onTagDelete}) => {
    return (
        <>
            {tags.map(tag => { 
                return (
                    <div key={tag.id} className="tag-row">
                        <div className="tag-details" onClick={() => onTagClick(tag)}>
                            <Tag width="0.5rem" color={tag.color} />
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
            )})}
        </>
    );
}

export default TagsList;