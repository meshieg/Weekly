import TagRow from "../TagRow/TagRow";

interface ITagsProps {
    tags: ITag[];
    tagWidth: string;
    onTagClick: (tag: ITag) => void;
    onTagDelete?: (tagId: number) => void;
}

const TagsList: React.FC<ITagsProps> = ({tags, tagWidth, onTagClick, onTagDelete}) => {
    return (
        <>
            {tags.map(tag => { 
                return (
                    <TagRow 
                        tag={tag} 
                        tagWidth={tagWidth}
                        onTagClick={onTagClick} 
                        onTagDelete={onTagDelete} />
            )})}
        </>
    );
}

export default TagsList;