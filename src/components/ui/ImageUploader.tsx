import React from 'react';
import {Upload, X} from 'lucide-react';
import {cn} from "../../util/utils.ts";

interface ImageUploaderProps {
    imagePreview: string | null;
    isDragging: boolean;
    setImage: (file: File | undefined) => void;
    setImagePreview: (preview: string | null) => void;
    setIsDragging: (dragging: boolean) => void;
    setError: (error: string | null) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
                                                         imagePreview,
                                                         isDragging,
                                                         setImage,
                                                         setImagePreview,
                                                         setIsDragging,
                                                         setError,
                                                     }) => {

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleImageValidation = (file: File) => {
        if (file.size > 5 * 1024 * 1024) {
            setError('Image size must be less than 5MB');
            return false;
        }

        if (!file.type.startsWith('image/')) {
            setError('Please upload an image file');
            return false;
        }

        return true;
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && handleImageValidation(file)) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
            setError(null);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const file = e.dataTransfer.files?.[0];
        if (file && handleImageValidation(file)) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
            setError(null);
        }
    };

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
                Preview Image
            </label>
            <div
                className={cn(
                    "mt-1 flex justify-center px-4 py-4 border-2 border-dashed rounded-md transition-colors",
                    isDragging
                        ? "border-blue-400 bg-blue-50"
                        : "border-gray-300 hover:border-gray-400",
                )}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <div className="space-y-1 text-center">
                    {imagePreview ? (
                        <div className="relative inline-block">
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="max-h-32 w-auto object-contain rounded-md"
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    setImage(undefined);
                                    setImagePreview(null);
                                }}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 shadow-sm"
                            >
                                <X className="h-4 w-4"/>
                            </button>
                        </div>
                    ) : (
                        <>
                            <Upload className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400"/>
                            <div
                                className="flex flex-col sm:flex-row items-center justify-center text-sm text-gray-600">
                                <label
                                    htmlFor="image-upload"
                                    className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                                >
                                    <span>Upload a file</span>
                                    <input
                                        id="image-upload"
                                        name="image-upload"
                                        type="file"
                                        className="sr-only"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                </label>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                                PNG, JPG, GIF up to 5MB
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ImageUploader;