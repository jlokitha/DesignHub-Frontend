import React, {useEffect, useState} from 'react';
import {X} from 'lucide-react';
import {useDispatch} from "react-redux";
import {AppDispatch} from "../store/store.ts";
import {saveComponent, updateComponent} from "../reducers/Component-slice.ts";
import {findAllTags} from "../reducers/Tag-slice.ts";
import Tag from "../model/Tag.ts";
import {Input} from "./ui/Input.tsx";
import {Button} from "./ui/Button.tsx";
import CodeEditor from './ui/CodeEditor';
import ImageUploader from './ui/ImageUploader';
import {TagSelect} from "./TagSelect.tsx";
import Component from "../model/Component.ts";

interface ComponentSubmissionModalProps {
    onClose: () => void;
    existingComponent?: Component;
    isUpdate?: boolean;
}

export const ComponentSubmissionModal: React.FC<ComponentSubmissionModalProps> = ({
                                                                                      onClose,
                                                                                      existingComponent,
                                                                                      isUpdate = false,
                                                                                  }) => {
    const [title, setTitle] = useState(existingComponent?.title || '');
    const [code, setCode] = useState(existingComponent?.code || '');
    const [description, setDescription] = useState(existingComponent?.description || '');
    const [selectedTags, setSelectedTags] = useState<Tag[]>(existingComponent?.tags || []);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [image, setImage] = useState<File | undefined>(undefined);
    const [imagePreview, setImagePreview] = useState<string | null>(
        existingComponent?.image && typeof existingComponent.image === 'string'
            ? existingComponent.image
            : null
    );
    const [isDragging, setIsDragging] = useState(false);

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(findAllTags());
    }, [dispatch]);

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

            // Only append image if it's a new file upload
            if (image) {
                formData.append('image', image);
            }

            // If updating, include the component ID
            if (isUpdate && existingComponent?.id) {
                formData.append('id', existingComponent.id.toString());
                console.log('FormData', formData)
                dispatch(updateComponent(formData));
            } else {
                dispatch(saveComponent(formData));
            }

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
                    className="fixed inset-0 transition-opacity bg-gray-950/50 bg-opacity-75"
                    onClick={onClose}
                />

                <div className="relative w-full max-w-4xl p-4 sm:p-6 bg-white rounded-lg shadow-xl min-w-[300px]">
                    <div className="flex items-start justify-between mb-6">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                            {isUpdate ? 'Update Component' : 'Submit Component'}
                        </h2>
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
                            maxLength={250}
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
                                className="rounded-md"
                                onClick={onClose}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="rounded-md"
                                isLoading={isSubmitting}
                            >
                                {isUpdate ? 'Update Component' : 'Submit Component'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};