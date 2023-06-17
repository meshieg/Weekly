import { DEFAULT_TAG } from "../../utils/constants";
import TagRow from "../TagRow/TagRow";

interface ITagsProps {
    tags: ITag[];
    tagWidth: string;
    displayEmptyTag?: boolean;
    onTagClick: (tag: ITag) => void;
    onTagDelete?: (tagId: number) => void;
}

const TagsList: React.FC<ITagsProps> = ({tags, tagWidth, displayEmptyTag = true, onTagClick, onTagDelete}) => {
    return (
        <>
            {tags.map(tag => { 
                return (
                    <TagRow 
                        key={tag.id}
                        tag={tag} 
                        tagWidth={tagWidth}
                        onTagClick={onTagClick} 
                        onTagDelete={onTagDelete} />
            )})}
            { displayEmptyTag ? 
            <TagRow 
                tag={DEFAULT_TAG} 
                tagWidth={tagWidth} 
                onTagClick={onTagClick} 
                onTagDelete={onTagDelete} /> :
            <></> }
        </>
    );
}

export default TagsList;