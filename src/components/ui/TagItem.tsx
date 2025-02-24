import React from 'react';
import {X} from 'lucide-react';
import Tag from '../../model/Tag';

interface TagItemProps {
    tag: Tag;
    onRemove: (tag: Tag) => void;
}

const TagItem: React.FC<TagItemProps> = ({tag, onRemove}) => {
    return (
        <span
            key={tag.id}
            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
        >
            {tag.name}
            <button
                type="button"
                onClick={() => onRemove(tag)}
                className="text-gray-400 hover:text-gray-600"
            >
                <X className="h-3.5 w-3.5"/>
            </button>
        </span>
    );
};

export default TagItem;