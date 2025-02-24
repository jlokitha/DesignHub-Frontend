import React, {useEffect, useState} from 'react';
import {Tags} from 'lucide-react';
import {useSelector} from "react-redux";
import {RootState} from "../store/store.ts";
import Tag from "../model/Tag.ts";
import TagSuggestions from "./ui/TagSuggestion.tsx";
import TagItem from "./ui/TagItem.tsx";

interface TagSelectProps {
    placeholder: string;
    limit: number;
    selectedTags: Tag[];
    setSelectedTags: (tags: Tag[]) => void;
}

export const TagSelect: React.FC<TagSelectProps> = (props) => {
    const [tagInput, setTagInput] = useState('');
    const [suggestions, setSuggestions] = useState<Tag[]>([]);
    const [focusedSuggestionIndex, setFocusedSuggestionIndex] = useState(-1);

    const availableTags = useSelector((state: RootState) => state.tagReducer)

    useEffect(() => {
        if (tagInput.trim()) {
            const filtered = availableTags.filter(tag =>
                tag.name.toLowerCase().includes(tagInput.toLowerCase()) &&
                !props.selectedTags.includes(tag)
            );
            setSuggestions(filtered);
        } else {
            setSuggestions([]);
        }
    }, [tagInput, availableTags, props.selectedTags]);

    const handleTagSelect = (tag: Tag) => {
        if (props.selectedTags.length < 3 && !props.selectedTags.includes(tag)) {
            props.setSelectedTags([...props.selectedTags, tag]);
            setTagInput('');
            setSuggestions([]);
        }
    };

    const handleTagRemove = (tagToRemove: Tag) => {
        props.setSelectedTags(props.selectedTags.filter(tag => tag !== tagToRemove));
    };

    const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        console.log('key', e.key);
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            console.log(tagInput)
            handleTagSelect({name: tagInput});
        } else if (e.key === 'Backspace' && !tagInput && props.selectedTags.length > 0) {
            handleTagRemove(props.selectedTags[props.selectedTags.length - 1]);
        }
    };

    return (
        <div>
            <div className="relative">
                <div
                    className="min-h-[42px] p-2 flex flex-wrap gap-2 rounded-md border border-gray-300 bg-white focus-within:border-gray-700 focus-within:ring-1 focus-within:ring-gray-700">
                    <div className="flex items-center">
                        <Tags className="h-5 w-5 text-gray-400 mr-2"/>
                    </div>
                    {props.selectedTags.map((tag) => (
                        <TagItem key={tag.id} tag={tag} onRemove={handleTagRemove}/>
                    ))}
                    <input
                        type="text"
                        className="flex-1 min-w-[60px] bg-transparent outline-none text-sm"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleTagKeyDown}
                        placeholder={props.selectedTags.length < props.limit ? props.placeholder : ""}
                        disabled={props.selectedTags.length >= props.limit}
                    />
                </div>
                {suggestions.length > 0 && tagInput && (
                    <TagSuggestions
                        suggestions={suggestions}
                        focusedSuggestionIndex={focusedSuggestionIndex}
                        handleTagSelect={handleTagSelect}
                        setFocusedSuggestionIndex={setFocusedSuggestionIndex}
                    />
                )}
            </div>
        </div>
    );
};