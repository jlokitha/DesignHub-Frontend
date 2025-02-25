import React from 'react';
import Tag from "../../model/Tag.ts";

interface TagSectionProps {
    tags: Tag[];
    onTagClick: (tag: Tag) => void;
}

const ComponentTags: React.FC<TagSectionProps> = ({ tags, onTagClick }) => (
    <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Tags</h4>
        <div className="flex flex-wrap gap-2">
            {tags.map((tag: Tag) => (
                <button
                    key={tag.id}
                    onClick={() => onTagClick(tag)}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
                >
                    {tag.name}
                </button>
            ))}
        </div>
    </div>
);

export default ComponentTags;