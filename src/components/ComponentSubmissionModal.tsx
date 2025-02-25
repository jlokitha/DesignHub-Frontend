import React, {useEffect, useState} from 'react';
import {X} from 'lucide-react';
import {useDispatch} from "react-redux";
import {AppDispatch} from "../store/store.ts";
import {saveComponent} from "../reducers/Component-slice.ts";
import {findAllTags} from "../reducers/Tag-slice.ts";
import Tag from "../model/Tag.ts";
import {Input} from "./ui/Input.tsx";
import {Button} from "./ui/Button.tsx";
import CodeEditor from './ui/CodeEditor';
import ImageUploader from './ui/ImageUploader';
import {TagSelect} from "./TagSelect.tsx";

interface ComponentSubmissionModalProps {
    onClose: () => void;
}

export const ComponentSubmissionModal: React.FC<ComponentSubmissionModalProps> = ({
                                                                                      onClose,
                                                                                  }) => {
    const [title, setTitle] = useState('');
    const [code, setCode] = useState('');
    const [description, setDescription] = useState('');
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [image, setImage] = useState<File | undefined>(undefined);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(findAllTags());
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!title.trim()) {
            setError('Title is required');
            return;
        }

        if (!code.trim()) {
            setError('Code is required');
            return;
        }

        if (!selectedTags.length) {
            setError('At least one tag is required');
            return;
        }

        const user = JSON.parse(localStorage.getItem('user') || '{}');

        setIsSubmitting(true);
        try {
            const formData = new FormData();
            formData.append('title', title.trim());
            formData.append('code', code);
            formData.append('description', description.trim());
            formData.append('userId', user.id);
            formData.append('tags', JSON.stringify(selectedTags));
            formData.append('image', image);

            const data = {
                title: title.trim(),
                code: code,
                description: description.trim(),
                tags: selectedTags,
                userId: 1,
                image: image,
            };
            console.log('Data', data);
            dispatch(saveComponent(formData));
            onClose();
        } catch (err) {
            console.error(err);
            setError('Failed to submit component. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-2 pt-4 pb-20">
                <div
                    className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
                    onClick={onClose}
                />

                <div className="relative w-full max-w-4xl p-4 sm:p-6 bg-white rounded-lg shadow-xl min-w-[300px]">
                    <div className="flex items-start justify-between mb-6">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Submit Component</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-500 transition-colors"
                        >
                            <X className="h-6 w-6"/>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                        {error && (
                            <div className="p-3 sm:p-4 bg-red-50 text-red-600 rounded-md text-sm">
                                {error}
                            </div>
                        )}

                        <Input
                            label="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            maxLength={60}
                            required
                        />

                        <ImageUploader
                            imagePreview={imagePreview}
                            isDragging={isDragging}
                            setImage={setImage}
                            setImagePreview={setImagePreview}
                            setIsDragging={setIsDragging}
                            setError={setError}
                        />

                        <CodeEditor code={code} setCode={setCode}/>

                        <Input
                            label="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            as="textarea"
                            maxLength="250"
                            rows={3}
                        />

                        <TagSelect
                            title="Tags (max 3)"
                            placeholder={selectedTags.length < 3 ? "Type to find tags..." : ""}
                            limit={3}
                            selectedTags={selectedTags}
                            setSelectedTags={setSelectedTags}
                        />

                        <div className="flex justify-end space-x-4">
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={onClose}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                isLoading={isSubmitting}
                            >
                                Submit Component
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};