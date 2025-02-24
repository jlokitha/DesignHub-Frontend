import React from 'react';
import Tag from '../../model/Tag';
import { cn } from '../../util/utils';

interface TagSuggestionsProps {
    suggestions: Tag[];
    focusedSuggestionIndex: number;
    handleTagSelect: (tag: Tag) => void;
    setFocusedSuggestionIndex: (index: number) => void;
}

const TagSuggestions: React.FC<TagSuggestionsProps> = ({
                                                           suggestions,
                                                           focusedSuggestionIndex,
                                                           handleTagSelect,
                                                           setFocusedSuggestionIndex
                                                       }) => {
    return (
        <div
            className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200 max-h-48 overflow-auto">
            {suggestions.map((tag, index) => (
                <div
                    key={tag.id}
                    className={cn(
                        "px-4 py-2 text-sm cursor-pointer",
                        index === focusedSuggestionIndex
                            ? "bg-blue-50 text-blue-800"
                            : "hover:bg-gray-50"
                    )}
                    onClick={() => handleTagSelect(tag)}
                    onMouseEnter={() => setFocusedSuggestionIndex(index)}
                >
                    {tag.name}
                </div>
            ))}
        </div>
    );
};

export default TagSuggestions;